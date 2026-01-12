#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="/var/www/DevPortfolio"

echo "==> Changing to project directory: $PROJECT_ROOT"
cd "$PROJECT_ROOT"

echo "==> Pulling latest code from Git"
git fetch 
git pull 

echo "==> Building frontend with Vite"
cd frontend

# Install deps if needed (uses package-lock.json if present)
if [ -f package-lock.json ]; then
  echo "   - Using npm ci"
  npm ci
else
  echo "   - Using npm install"
  npm install
fi

npm run build

# Vite writes into ../backend/frontend_dist because of your vite.config.ts
cd "$PROJECT_ROOT"

echo "==> Rebuilding and restarting backend container"
docker compose up -d --build backend

echo "==> Reloading Nginx"
systemctl reload nginx

echo "✅ Deploy complete!"
