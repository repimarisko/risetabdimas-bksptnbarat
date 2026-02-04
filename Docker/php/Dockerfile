FROM php:8.2-fpm

ARG INSTALL_NODE=true

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libonig-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libxml2-dev \
    zip \
    curl \
    ca-certificates \
    build-essential \
    locales \
  && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
 && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install composer (avoid pulling composer image)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Optional: install node (used to build assets) when ARG enabled
RUN if [ "${INSTALL_NODE}" = "true" ]; then \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs && npm install -g pnpm@8; \
  fi

WORKDIR /var/www/html

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Ensure php-fpm listens on all interfaces so other containers (nginx) can reach it.
# Some base images default to 127.0.0.1:9000 in www.conf; override it here.
RUN if [ -f /usr/local/etc/php-fpm.d/www.conf ]; then \
      sed -i "s/listen = 127.0.0.1:9000/listen = 9000/" /usr/local/etc/php-fpm.d/www.conf || true; \
    fi

EXPOSE 9000

# Use absolute path to ensure the base entrypoint can exec it reliably
CMD ["/usr/local/bin/docker-entrypoint.sh"]
