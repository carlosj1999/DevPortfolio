# DevPortfolio Deployment Guide

This repository contains the source code for the full-stack portfolio for Carlos Ibanez. It is composed of a Django backend (API + static file server) and a Vite/React frontend that is compiled into the backend during container builds.

## Project structure

```
backend/               # Django project and API apps
frontend/              # Vite + React single page application
backend/frontend_dist/ # Generated frontend build artifacts that are served by Django
Dockerfile(s)          # Container definitions for development and production
```

## Local development

1. **Copy the environment template**

   ```bash
   cp .env.production .env.local
   ```

   Update `.env.local` for your local secrets (set `DJANGO_DEBUG=True`).

2. **Build frontend assets for Django (optional during development)**

   ```bash
   npm install --prefix frontend
   npm run build --prefix frontend
   ```

3. **Start the dev stack**

   ```bash
   docker compose up --build
   ```

   - Backend: http://localhost:8000
   - Frontend (Vite dev server): http://localhost:3000

## Production containers

- `backend/Dockerfile` now bundles the Vite build as part of the Docker image. The build context must be the repository root so that both `backend/` and `frontend/` are accessible.
- Use `docker-compose.prod.yml` to build and run the production stack locally or on a DigitalOcean Droplet:

  ```bash
  docker compose -f docker-compose.prod.yml --env-file .env.production up --build -d
  ```

  The compose file provisions PostgreSQL, runs database migrations, collects static files and serves the application with Gunicorn.

## DigitalOcean deployment

You can deploy with either the App Platform or Docker on a Droplet.

### 1. App Platform (recommended)

1. Update `deploy/digitalocean-app.yaml` with your GitHub repository URL, contact email, and secret values.
2. Commit the changes and push to GitHub.
3. In the DigitalOcean control panel choose **Apps → Create App**, select your GitHub repository, and import the configuration file when prompted.
4. Provision a Managed PostgreSQL database (or reuse an existing one) and link it to the app. The spec references the database credentials through `${db.DATABASE_URL}`.
5. Assign the `carlosjportfolio.com` domain to the backend service. DigitalOcean will provision TLS automatically.

During deployments DigitalOcean will:
- Build the Docker image using `backend/Dockerfile` (which already compiles the Vite frontend).
- Run database migrations via the `postdeploy` job defined in the spec.
- Launch Gunicorn with secure defaults for production.

### 2. Docker Compose on a Droplet

1. Provision a Droplet running Ubuntu 22.04 (or similar) and install Docker and Docker Compose.
2. Copy this repository to the Droplet (`git clone ...`).
3. Create a `.env.production` file on the server using the provided template and update all secret values (secret key, database credentials, OpenAI key, etc.).
4. Run the production stack:

   ```bash
   docker compose -f docker-compose.prod.yml --env-file .env.production up --build -d
   ```

5. Point the `carlosjportfolio.com` DNS A record to the Droplet's public IP address. If you need HTTPS on the Droplet, place a reverse proxy (e.g., Traefik or Caddy) in front of the backend container or leverage DigitalOcean's Load Balancer with managed certificates.

## Environment variables

Key variables are documented in `.env.production`:

- `DJANGO_ALLOWED_HOSTS`, `DJANGO_CSRF_TRUSTED_ORIGINS` – include `carlosjportfolio.com` and `www.carlosjportfolio.com`.
- `DATABASE_URL` – points to the PostgreSQL instance (DigitalOcean managed DB connection string by default).
- `CORS_ALLOWED_ORIGINS`, `VITE_BACKEND_ORIGIN` – ensure the frontend and backend share the same origin in production.
- `OPENAI_API_KEY` – required for the AI assistant module.

## Health checks

- `/health/` should return HTTP 200 when the backend is healthy. The Dockerfile exposes this route for container health monitoring.

## Updating the frontend

When the React frontend changes, DigitalOcean builds automatically in App Platform. For manual deployments, run `npm install --prefix frontend` followed by `npm run build --prefix frontend` before building the Docker images to ensure Django serves the latest assets.

## Domain configuration

Point `carlosjportfolio.com` (and optionally `www.carlosjportfolio.com`) to DigitalOcean. If you use App Platform, add the domain in the **Domains** tab and follow the DNS instructions provided by DigitalOcean.

Once DNS is in place and the containers are running, the site will be available at `https://carlosjportfolio.com` with HTTPS enforced via the settings provided in this update.