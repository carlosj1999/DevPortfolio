# Frontend Dockerfile (frontend/Dockerfile)

# Base stage for dependencies
FROM node:20-alpine as base

# Install dependencies for building native modules
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Development stage
FROM base as development

# Copy package files
COPY package*.json yarn.lock* pnpm-lock.yaml* ./

# Install dependencies based on lockfile
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  else npm install; \
  fi

# Copy application code
COPY . .

# Expose port (Next.js default is 3000, Vite is 5173)
EXPOSE 3000
EXPOSE 5173

# Development server
CMD \
  if [ -f "next.config.js" ] || [ -f "next.config.mjs" ]; then \
    npm run dev; \
  elif [ -f "vite.config.js" ] || [ -f "vite.config.ts" ]; then \
    npm run dev -- --host 0.0.0.0; \
  else \
    npm run dev; \
  fi

# Dependencies stage (for production)
FROM base as deps

# Copy package files
COPY package*.json yarn.lock* pnpm-lock.yaml* ./

# Install production dependencies only
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile --production=false; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  else npm install; \
  fi

# Builder stage (for production)
FROM base as builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments for environment variables
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_WS_URL
ARG NODE_ENV=production

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_WS_URL=$NEXT_PUBLIC_WS_URL \
    NODE_ENV=$NODE_ENV

# Build the application
RUN \
  if [ -f "next.config.js" ] || [ -f "next.config.mjs" ]; then \
    npm run build; \
  elif [ -f "vite.config.js" ] || [ -f "vite.config.ts" ]; then \
    npm run build; \
  else \
    npm run build; \
  fi

# Production stage
FROM base as production

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 nodejs && \
    adduser -u 1001 -G nodejs -s /bin/sh -D nextjs

# For Next.js apps
# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/.next/cache ./.next/cache

# For Vite/React apps (if not using Next.js)
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install serve for static hosting (for Vite builds)
RUN npm install -g serve

USER nextjs

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {if (r.statusCode !== 200) throw new Error()})" || exit 1

# Start the application
CMD \
  if [ -d ".next" ]; then \
    node server.js; \
  elif [ -d "dist" ]; then \
    serve -s dist -l 3000; \
  else \
    npm start; \
  fi

# Nginx stage (for serving static files with nginx)
FROM nginx:alpine as nginx

# Copy custom nginx config if exists
COPY nginx.conf /etc/nginx/nginx.conf* ./
RUN if [ -f nginx.conf ]; then mv nginx.conf /etc/nginx/nginx.conf; fi

# Copy built static files
COPY --from=builder /app/dist /usr/share/nginx/html
# Or for Next.js static export
# COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
