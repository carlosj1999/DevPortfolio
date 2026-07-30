#!/usr/bin/env bash
#
# Deploy DevPortfolio.
#
# Order matters. `git pull` alone is NOT a deploy: nginx serves /static/ from
# backend/staticfiles/, which is only refreshed by collectstatic. Skipping it
# leaves the new index.html pointing at asset filenames that 404, which renders
# a blank page while the site still returns HTTP 200.
#
# The frontend is NOT built here. backend/frontend_dist/ is built locally and
# committed, so this box never needs npm. Building on the server used to dirty
# the working tree and break the next fast-forward pull.
#
# Usage:
#   ./deploy.sh            deploy origin/main
#   ./deploy.sh --dry-run  show what would happen, change nothing
#
set -Eeuo pipefail

# This script pulls the repo it lives in, so a deploy that updates deploy.sh
# rewrites the file bash is still reading -- bash reads scripts incrementally
# and will execute a mix of the old and new versions. Re-exec from a private
# copy so the running script is immutable for the whole deploy. Changes to
# deploy.sh therefore take effect on the NEXT run, which is predictable.
if [[ -z "${DEPLOY_PINNED:-}" ]]; then
  _pinned=$(mktemp "${TMPDIR:-/tmp}/deploy.XXXXXX") || exit 1
  cat "$0" > "$_pinned"
  chmod +x "$_pinned"
  DEPLOY_PINNED="$_pinned" exec "$_pinned" "$@"
fi
trap 'rm -f "$DEPLOY_PINNED"' EXIT

PROJECT_ROOT="${PROJECT_ROOT:-/var/www/DevPortfolio}"
BACKUP_DIR="${BACKUP_DIR:-/root/backups}"
CONTAINER="${CONTAINER:-portfolio-backend}"
BRANCH="${BRANCH:-main}"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:8000/}"
HEALTH_RETRIES="${HEALTH_RETRIES:-12}"
HEALTH_DELAY="${HEALTH_DELAY:-5}"
MIN_FREE_MB="${MIN_FREE_MB:-500}"
KEEP_BACKUPS="${KEEP_BACKUPS:-10}"

DRY_RUN=0
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=1

log()  { printf '\n\033[1;34m==>\033[0m %s\n' "$*"; }
ok()   { printf '    \033[0;32m*\033[0m %s\n' "$*"; }
warn() { printf '    \033[0;33m!\033[0m %s\n' "$*"; }
die()  { printf '\n\033[0;31mERROR:\033[0m %s\n' "$*" >&2; exit 1; }
run()  { if (( DRY_RUN )); then printf '    [dry-run] %s\n' "$*"; else eval "$@"; fi; }

ROLLBACK_SHA=""
DB_BACKUP=""

on_error() {
  local line=$1
  printf '\n\033[0;31m!! Deploy failed at line %s\033[0m\n' "$line" >&2
  if [[ -n "$ROLLBACK_SHA" ]]; then
    printf 'To roll back:\n  cd %s && git reset --hard %s\n' "$PROJECT_ROOT" "$ROLLBACK_SHA" >&2
    [[ -n "$DB_BACKUP" ]] && printf '  tar xzf %s -C %s\n' "$DB_BACKUP" "$PROJECT_ROOT" >&2
    printf '  docker compose up -d --no-deps %s\n' "${SERVICE:-$CONTAINER}" >&2
  fi
}
trap 'on_error $LINENO' ERR

cd "$PROJECT_ROOT" 2>/dev/null || die "Project root not found: $PROJECT_ROOT"
(( DRY_RUN )) && warn "DRY RUN - no changes will be made"

# ---------------------------------------------------------------- preflight
log "Preflight checks"

command -v docker >/dev/null || die "docker not found"
docker compose version >/dev/null 2>&1 || die "docker compose plugin not available"
docker inspect "$CONTAINER" >/dev/null 2>&1 || die "Container '$CONTAINER' does not exist"

# `docker compose up` takes the SERVICE name, which is not the container_name.
# Read it off the container's own compose label so the two can never drift.
SERVICE="${SERVICE:-$(docker inspect "$CONTAINER" \
  --format '{{index .Config.Labels "com.docker.compose.service"}}' 2>/dev/null)}"
[[ -z "$SERVICE" ]] && die "Could not determine the compose service for '$CONTAINER'. Set SERVICE=<name>."
ok "container '$CONTAINER' present (compose service: $SERVICE)"

# A full disk is how this deploy fails most destructively: collectstatic writes
# partial files and the site breaks with no obvious cause.
FREE_MB=$(df -Pm "$PROJECT_ROOT" | awk 'NR==2 {print $4}')
(( FREE_MB < MIN_FREE_MB )) && die "Only ${FREE_MB}MB free (need ${MIN_FREE_MB}MB). Run: docker image prune -af"
ok "disk: ${FREE_MB}MB free"

[[ -f .env ]] || warn ".env not found - container will fall back to compose defaults"
grep -qE '^DJANGO_SECRET_KEY=.+' .env 2>/dev/null \
  || warn "DJANGO_SECRET_KEY not set in .env - Django will refuse to boot with DEBUG=False"

# ------------------------------------------------------------------- backup
# db.sqlite3 is intentionally untracked, so it exists ONLY here. A `git pull`
# that removes it from the index will delete it from the working tree, which
# takes the site down with "unable to open database file". Always back up first.
log "Backing up database and environment"
mkdir -p "$BACKUP_DIR"
TS=$(date +%Y%m%d-%H%M%S)
DB_BACKUP="$BACKUP_DIR/predeploy-$TS.tgz"
BACKUP_ITEMS=()
[[ -f backend/db.sqlite3 ]] && BACKUP_ITEMS+=("backend/db.sqlite3")
[[ -f .env ]] && BACKUP_ITEMS+=(".env")

if (( ${#BACKUP_ITEMS[@]} )); then
  run "tar czf '$DB_BACKUP' ${BACKUP_ITEMS[*]} 2>/dev/null"
  (( DRY_RUN )) || ok "saved $DB_BACKUP ($(du -h "$DB_BACKUP" | cut -f1))"
else
  warn "nothing to back up (no db.sqlite3 or .env)"
  DB_BACKUP=""
fi

# --------------------------------------------------------------------- pull
log "Fetching origin/$BRANCH"
ROLLBACK_SHA=$(git rev-parse HEAD)
ok "current: $(git log --oneline -1)"

run "git fetch origin '$BRANCH' --quiet"

if (( ! DRY_RUN )); then
  BEHIND=$(git rev-list --count "HEAD..origin/$BRANCH")
  if (( BEHIND == 0 )); then
    ok "already up to date - nothing to deploy"
    exit 0
  fi
  ok "$BEHIND commit(s) to apply"

  # Refuse to clobber uncommitted work; a dirty tree here means someone edited
  # or built directly on the server and those changes need a human decision.
  if [[ -n "$(git status --porcelain --untracked-files=no)" ]]; then
    git status --short
    die "Working tree is dirty. Commit, stash, or 'git checkout -- <path>' first."
  fi
fi

run "git merge --ff-only 'origin/$BRANCH'"
(( DRY_RUN )) || ok "now at: $(git log --oneline -1)"

# The pull can delete db.sqlite3 (see backup note above). Restore it silently.
if [[ ! -f backend/db.sqlite3 && -n "$DB_BACKUP" && -f "$DB_BACKUP" ]]; then
  warn "db.sqlite3 was removed by the pull - restoring from backup"
  run "tar xzf '$DB_BACKUP' backend/db.sqlite3 -C '$PROJECT_ROOT'"
  ok "database restored"
fi

# ------------------------------------------------------- migrate + static
log "Applying migrations"
run "docker exec '$CONTAINER' python manage.py migrate --noinput"

# THE step the old deploy script was missing.
log "Collecting static files"
run "docker exec '$CONTAINER' python manage.py collectstatic --noinput"

# ------------------------------------------------------------------ restart
# --force-recreate is required, not optional. With DEBUG=False Django enables
# the cached template loader, so each gunicorn worker holds frontend_dist/
# index.html in memory. A plain `compose up` no-ops when the config is
# unchanged, leaving workers serving the PREVIOUS index.html -- which points at
# asset filenames from the last build. The result is a fraction of visitors
# getting a stale (or blank) page, varying request to request by worker.
log "Restarting $CONTAINER (forced, to clear cached templates)"
run "docker compose up -d --no-deps --force-recreate '$SERVICE'"

# ------------------------------------------------------------ health check
log "Health check"
if (( DRY_RUN )); then
  warn "skipped in dry-run"
else
  HEALTHY=0
  for ((i = 1; i <= HEALTH_RETRIES; i++)); do
    CODE=$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "$HEALTH_URL" || echo 000)
    if [[ "$CODE" == "200" ]]; then
      ok "backend healthy (HTTP 200 after ${i} attempt(s))"
      HEALTHY=1
      break
    fi
    printf '    waiting... (attempt %s/%s, got %s)\n' "$i" "$HEALTH_RETRIES" "$CODE"
    sleep "$HEALTH_DELAY"
  done

  if (( ! HEALTHY )); then
    printf '\n--- container logs ---\n'
    docker logs --tail 30 "$CONTAINER" 2>&1 || true
    die "Backend did not return 200. See rollback instructions above."
  fi

  # Verify the assets the freshly deployed HTML actually references are being
  # served. This is what catches a stale/failed collectstatic before users do.
  log "Verifying referenced assets resolve"
  MISSING=0
  while read -r asset; do
    [[ -z "$asset" ]] && continue
    ACODE=$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "http://127.0.0.1:8000${asset}" || echo 000)
    if [[ "$ACODE" == "200" ]]; then
      ok "${asset} -> 200"
    else
      warn "${asset} -> ${ACODE}"
      MISSING=1
    fi
  done < <(curl -s --max-time 10 "$HEALTH_URL" | grep -oE '(src|href)="/static/[^"]+"' | grep -oE '/static/[^"]+' | head -10)

  (( MISSING )) && die "Referenced assets are not being served - collectstatic likely failed."
  ok "all referenced assets resolve"

  # Asset checks alone are not enough: collectstatic never deletes old files, so
  # a worker serving a stale template still references a bundle that resolves.
  # Compare what is actually served against index.html on disk, sampling enough
  # times to hit every gunicorn worker.
  log "Verifying served HTML matches the deployed build"
  EXPECTED=$(grep -oE 'assets/index-[A-Za-z0-9_-]+\.js' backend/frontend_dist/index.html | head -1)
  if [[ -z "$EXPECTED" ]]; then
    warn "could not determine expected bundle from index.html - skipping"
  else
    STALE=0
    for _ in $(seq 1 10); do
      SERVED=$(curl -s --max-time 10 "$HEALTH_URL" | grep -oE 'assets/index-[A-Za-z0-9_-]+\.js' | head -1)
      [[ "$SERVED" != "$EXPECTED" ]] && STALE=1 && warn "served $SERVED, expected $EXPECTED"
    done
    (( STALE )) && die "Workers are serving a stale template. Run: docker restart $CONTAINER"
    ok "all workers serve $EXPECTED"
  fi
fi

# ------------------------------------------------------------------ cleanup
log "Pruning old backups (keeping $KEEP_BACKUPS)"
if (( ! DRY_RUN )); then
  ls -t "$BACKUP_DIR"/predeploy-*.tgz 2>/dev/null | tail -n +$((KEEP_BACKUPS + 1)) | xargs -r rm -f
  ok "$(ls -1 "$BACKUP_DIR"/predeploy-*.tgz 2>/dev/null | wc -l) backup(s) retained"
fi

log "Deploy complete"
(( DRY_RUN )) || {
  printf '    commit:  %s\n' "$(git log --oneline -1)"
  printf '    server:  %s\n' "$(docker inspect "$CONTAINER" --format '{{index .Config.Cmd 0}}')"
  printf '\n    Note: if the site is behind Cloudflare, purge the cache so\n'
  printf '    visitors are not served stale or cached-404 assets.\n'
}
