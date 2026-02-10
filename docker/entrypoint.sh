#!/usr/bin/env sh
set -e

REPO_DIR="/var/www/html"
COMPOSER_HOME="/tmp/composer"

if command -v git >/dev/null 2>&1; then
  git config --global --add safe.directory "$REPO_DIR" || true
  if command -v su >/dev/null 2>&1; then
    su -s /bin/sh -c "HOME=/tmp git config --global --add safe.directory $REPO_DIR || true" www-data || true
  fi
fi

mkdir -p "$REPO_DIR/storage/logs" "$REPO_DIR/bootstrap/cache" "$COMPOSER_HOME"
chown -R www-data:www-data "$REPO_DIR/storage" "$REPO_DIR/bootstrap/cache" "$COMPOSER_HOME" 2>/dev/null || true
chmod -R ug+rwX "$REPO_DIR/storage" "$REPO_DIR/bootstrap/cache" 2>/dev/null || true

if [ ! -f "$REPO_DIR/vendor/autoload.php" ]; then
  echo "vendor/ belum ada, menjalankan composer install..."
  mkdir -p "$REPO_DIR/vendor"
  chown -R www-data:www-data "$REPO_DIR/vendor" 2>/dev/null || true
  if command -v su >/dev/null 2>&1; then
    su -s /bin/sh -c "HOME=/tmp COMPOSER_HOME=$COMPOSER_HOME composer install --no-interaction --prefer-dist" www-data
  else
    HOME=/tmp COMPOSER_HOME=$COMPOSER_HOME COMPOSER_ALLOW_SUPERUSER=1 \
      composer install --no-interaction --prefer-dist
  fi
fi

exec "$@"
