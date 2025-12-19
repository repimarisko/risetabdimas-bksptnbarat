# Riset Abdimas BKS PTN Barat

Setup cepat untuk menjalankan aplikasi Laravel + Vite di Docker.

## Prasyarat
- Docker dan Docker Compose (plugin bawaan Docker Desktop sudah cukup).

## Langkah awal
1. Review dan sesuaikan nilai di `.env.docker` (APP_URL, DB_*, dsb). APP_KEY dibiarkan kosong dulu.
2. Build image:  
   ```bash
   docker compose build
   ```
3. Install dependency PHP:  
   ```bash
   docker compose run --rm app composer install
   ```
4. (Opsional, hanya pertama kali) siapkan dependency JS agar volume `node_modules` terisi:  
   ```bash
   docker compose run --rm vite npm install
   ```
5. Buat APP_KEY dan tempel ke `.env.docker`:  
   ```bash
   docker compose run --rm app php artisan key:generate --ansi --show
   ```
6. Jalankan seluruh stack (PHP-FPM, Nginx, MySQL, Vite dev server):  
   ```bash
   docker compose up -d
   ```
7. Migrasi database:  
   ```bash
   docker compose exec app php artisan migrate --force
   ```

Backend dapat diakses di http://localhost:8000 dan Vite HMR di http://localhost:5173.

## Perintah tambahan
- Hentikan kontainer: `docker compose down`
- Lihat log: `docker compose logs -f app` atau `docker compose logs -f vite`
- Build aset produksi: `docker compose run --rm vite npm run build`

> Catatan: kontainer menggunakan env dari `.env.docker`, jadi `.env` pribadi Anda tidak disentuh.
