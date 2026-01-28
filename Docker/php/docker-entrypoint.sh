#!/bin/sh
set -e

# Only set ownership on directories that need write access
# Avoid chown-ing the whole repo (macOS host volumes often prevent chown on many files)
for dir in storage bootstrap/cache; do
  if [ -d "/var/www/html/$dir" ]; then
    chown -R www-data:www-data "/var/www/html/$dir" || true
  fi
done

# If vendor missing, run composer install (works because project is mounted)
if [ ! -d "/var/www/html/vendor" ]; then
  composer install --prefer-dist --no-progress --no-suggest --no-interaction || true
fi

# Generate APP_KEY if missing. Prefer reading .env; fall back to $APP_KEY env var.
if [ -f "/var/www/html/artisan" ]; then
  APP_KEY_VALUE=""
  if [ -f "/var/www/html/.env" ]; then
    APP_KEY_VALUE=$(grep '^APP_KEY=' /var/www/html/.env | cut -d'=' -f2-)
  else
    APP_KEY_VALUE="$APP_KEY"
  fi

  if [ -z "$APP_KEY_VALUE" ]; then
    cd /var/www/html && php artisan key:generate --ansi || true
  fi
fi

# Start php-fpm (foreground)
php-fpm
