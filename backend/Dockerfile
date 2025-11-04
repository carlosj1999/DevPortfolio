# Backend Dockerfile (backend/Dockerfile)

# Base stage for shared dependencies
FROM python:3.12-slim as base

ARG BACKEND_DIR=backend

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONHASHSEED=random \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_DEFAULT_TIMEOUT=100

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Development stage
FROM base as development
ARG BACKEND_DIR=backend
# Install development dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    vim \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
COPY ${BACKEND_DIR}/requirements.txt ./requirements.txt
RUN pip install --upgrade pip && \
    pip install -r requirements.txt && \
    if [ -f requirements-dev.txt ]; then pip install -r requirements-dev.txt; fi

# Copy application code
COPY ${BACKEND_DIR}/ ./

# Create necessary directories
RUN mkdir -p staticfiles media logs

# Create non-root user
RUN useradd -m -u 1000 django && \
    chown -R django:django /app

USER django

EXPOSE 8000

# Development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# Production builder stage
FROM base as builder
ARG BACKEND_DIR=backend
# Install Python dependencies
COPY ${BACKEND_DIR}/requirements.txt ./requirements.txt
RUN pip install --upgrade pip && \
    pip wheel --no-cache-dir --no-deps --wheel-dir /app/wheels -r requirements.txt

    # Frontend build stage (used to bundle the Vite build artifacts into the backend image)
FROM node:20-alpine as frontend-builder

ARG FRONTEND_DIR=frontend
ARG BACKEND_DIR=backend
ARG VITE_BACKEND_ORIGIN=http://localhost:8000

WORKDIR /workspace

COPY ${FRONTEND_DIR}/ ./frontend
COPY ${BACKEND_DIR}/ ./backend

WORKDIR /workspace/frontend

ENV VITE_BACKEND_ORIGIN=${VITE_BACKEND_ORIGIN}

RUN apk add --no-cache libc6-compat && \
    corepack enable && \
    if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; \
    else npm install; \
    fi && \
    npm run build


# Production stage
FROM python:3.12-slim as production
ARG BACKEND_DIR=backend
# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONHASHSEED=random \
    DJANGO_SETTINGS_MODULE=backend_config.settings

# Install runtime dependencies only
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN useradd -m -u 1000 django

WORKDIR /app

# Copy wheels and install
COPY --from=builder /app/wheels /wheels
RUN pip install --upgrade pip && \
    pip install --no-cache /wheels/*

# Copy application code
COPY --chown=django:django ${BACKEND_DIR}/ ./

# Copy pre-built frontend assets into the backend image
COPY --from=frontend-builder --chown=django:django /workspace/backend/frontend_dist ./frontend_dist
# Create necessary directories
RUN mkdir -p staticfiles media logs && \
    chown -R django:django /app

USER django


EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health/ || exit 1

# Production server using gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "4", "--threads", "2", "--worker-class", "gthread", "--worker-tmp-dir", "/dev/shm", "--access-logfile", "-", "--error-logfile", "-", "backend_config.wsgi:application"]
