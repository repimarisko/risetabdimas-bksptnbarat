#!/bin/sh
set -e

# Write KEY='VALUE' for safe .env format (quotes are removed by dotenv parser).
write_env_line() {
  key="$1"
  value="$2"

  escaped=$(printf "%s" "$value" | sed "s/'/'\"'\"'/g")
  printf "%s='%s'\n" "$key" "$escaped"
}

# Ensure basic writable directories exist (useful for production images without bind mounts)
for dir in \
  storage \
  storage/app \
  storage/app/public \
  storage/app/private \
  storage/framework \
  storage/framework/cache \
  storage/framework/sessions \
  storage/framework/views \
  storage/logs \
  bootstrap/cache; do
  mkdir -p "/var/www/html/$dir" || true
done

# Ensure .env exists (some Laravel commands assume the file is present).
# The production image relies on container env vars, but creating a file avoids failures
# like `file_get_contents(/var/www/html/.env)` when running artisan commands.
if [ ! -f "/var/www/html/.env" ]; then
  {
    write_env_line APP_NAME "${APP_NAME:-Laravel}"
    write_env_line APP_ENV "${APP_ENV:-local}"
    write_env_line APP_KEY "${APP_KEY:-}"
    write_env_line APP_DEBUG "${APP_DEBUG:-false}"
    write_env_line APP_URL "${APP_URL:-http://localhost:9090}"
    printf "\n"
    write_env_line LOG_CHANNEL "${LOG_CHANNEL:-stack}"
    printf "\n"
    write_env_line DB_CONNECTION "${DB_CONNECTION:-mysql}"
    write_env_line DB_HOST "${DB_HOST:-127.0.0.1}"
    write_env_line DB_PORT "${DB_PORT:-3306}"
    write_env_line DB_DATABASE "${DB_DATABASE:-}"
    write_env_line DB_USERNAME "${DB_USERNAME:-}"
    write_env_line DB_PASSWORD "${DB_PASSWORD:-}"
  } >"/var/www/html/.env" || true
fi

# Ensure writable paths exist with correct permissions
# Avoid chown-ing the whole repo (host volumes may prevent chown on many files)
for dir in storage bootstrap/cache; do
  if [ -d "/var/www/html/$dir" ]; then
    chown -R www-data:www-data "/var/www/html/$dir" || true
    chmod -R ug+rwX "/var/www/html/$dir" || true
  fi
done

# Ensure log directory and file are writable
if [ -d "/var/www/html/storage" ]; then
  mkdir -p "/var/www/html/storage/logs" || true
  touch "/var/www/html/storage/logs/laravel.log" || true
  chown -R www-data:www-data "/var/www/html/storage/logs" || true
  chmod -R ug+rwX "/var/www/html/storage/logs" || true
fi

# Ensure .env is writable so key:generate can update it
if [ -f "/var/www/html/.env" ]; then
  chown www-data:www-data "/var/www/html/.env" || true
  chmod ug+rw "/var/www/html/.env" || true
fi

# If vendor/autoload.php missing, run composer install (covers empty/mounted vendor dir)
if [ ! -f "/var/www/html/vendor/autoload.php" ]; then
  if command -v composer >/dev/null 2>&1; then
    composer install --prefer-dist --no-progress --no-suggest --no-interaction || true
  else
    echo "composer not found; skipping composer install" >&2
  fi
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

# If the container is started with arguments, run them instead.
if [ "$#" -gt 0 ]; then
  exec "$@"
fi

# Start nginx + php-fpm under supervisord
exec supervisord -n -c /etc/supervisor/conf.d/supervisord.conf
