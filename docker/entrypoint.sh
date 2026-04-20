#!/bin/sh
set -e

echo "==> Starting entrypoint..."

cd /var/www/html

if [ ! -f artisan ]; then
  echo "ERROR: artisan file not found in /var/www/html"
  ls -la /var/www/html || true
  exit 1
fi

mkdir -p storage/framework/cache
mkdir -p storage/framework/sessions
mkdir -p storage/framework/views
mkdir -p storage/logs
mkdir -p bootstrap/cache

chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Remove vite hot file if exists
rm -f public/hot || true

echo "==> Running Laravel cache clear..."
php artisan optimize:clear || true

echo "==> Caching config, routes, and views..."
php artisan config:cache || true
php artisan route:cache || true
php artisan view:cache || true

echo "==> Entry point finished."
exec "$@"