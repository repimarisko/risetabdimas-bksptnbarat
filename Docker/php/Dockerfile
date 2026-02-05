FROM php:8.2-fpm AS base

RUN apt-get update && apt-get install -y \
    build-essential \
    ca-certificates \
    curl \
    git \
    gnupg \
    libfreetype6-dev \
    libjpeg-dev \
    libonig-dev \
    libpng-dev \
    libxml2-dev \
    libzip-dev \
    locales \
    nginx \
    supervisor \
    unzip \
    zip \
  && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install composer (avoid pulling composer image)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/html

COPY Docker/php/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

COPY Docker/php/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY Docker/nginx/default.conf /etc/nginx/conf.d/default.conf

RUN rm -f /etc/nginx/sites-enabled/default || true \
  && ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log

# Ensure php-fpm listens on all interfaces (nginx connects to 127.0.0.1:9000 in the same container).
RUN if [ -f /usr/local/etc/php-fpm.d/www.conf ]; then \
      sed -i "s|listen = 127.0.0.1:9000|listen = 9000|" /usr/local/etc/php-fpm.d/www.conf || true; \
    fi

# Create writable directories (useful for production images without bind mounts)
RUN mkdir -p \
      storage/app \
      storage/framework/cache \
      storage/framework/sessions \
      storage/framework/views \
      storage/logs \
      bootstrap/cache \
  && chown -R www-data:www-data storage bootstrap/cache \
  && chmod -R ug+rwX storage bootstrap/cache

EXPOSE 80

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["supervisord", "-n", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

FROM base AS prod_builder

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
  && apt-get update \
  && apt-get install -y nodejs \
  && rm -rf /var/lib/apt/lists/*

COPY . /var/www/html

RUN composer install --prefer-dist --no-interaction --no-progress --no-dev --optimize-autoloader
RUN npm ci
RUN npm run build

FROM base AS prod

COPY . /var/www/html
COPY --from=prod_builder /var/www/html/vendor /var/www/html/vendor
COPY --from=prod_builder /var/www/html/public/build /var/www/html/public/build

FROM base AS dev

COPY . /var/www/html
