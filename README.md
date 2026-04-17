# Riset Abdimas BKS PTN Barat

Setup Docker produksi dengan ketentuan:
- MySQL berada di VM terpisah.
- Aplikasi berjalan dalam 1 container (App + Web Server).
- Aplikasi diakses lewat port `9090`.

## Prasyarat
- Docker dan Docker Compose (plugin bawaan Docker Desktop sudah cukup).

## Konfigurasi `.env.docker`
Pastikan nilai DB mengarah ke VM MySQL:

```env
DB_CONNECTION=mysql
DB_HOST=10.250.30.19
DB_PORT=3306
DB_DATABASE=db_risetabdimas_bksptnbarat
DB_USERNAME=docker
DB_PASSWORD=us3R@dev.2025
```

`APP_URL` juga harus mengarah ke:

```env
APP_URL=http://localhost:9090
```

## Jalankan
Build dan jalankan container:

```bash
docker compose up -d --build
```

## Verifikasi Menyeluruh
Pastikan hanya 1 container/service yang aktif:

```bash
docker compose ps
```

Lihat log aplikasi:

```bash
docker compose logs -f app
```

Akses aplikasi:

```text
http://localhost:9090
```

## Perintah Tambahan
- Jalankan migrasi: `docker compose exec app php artisan migrate --force`
- Stop container: `docker compose down`
