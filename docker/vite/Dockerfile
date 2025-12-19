FROM node:20-bookworm

RUN apt-get update && apt-get install -y \
    php8.2-cli \
    php8.2-common \
    php8.2-mbstring \
    php8.2-xml \
    php8.2-curl \
    php8.2-zip \
    php8.2-bcmath \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
