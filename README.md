# Riset Abdimas BKS PTN Barat

Setup Docker produksi dengan ketentuan:
- MySQL berjalan internal Docker (service `mysql`).
- Import database otomatis dari file `sql.sql` saat inisialisasi pertama.
- Aplikasi berjalan pada service `app` (App + Web Server).
- Aplikasi diakses lewat port `9090`.

## Prasyarat
- Docker dan Docker Compose (plugin bawaan Docker Desktop sudah cukup).
- File dump database tersedia di root project dengan nama `sql.sql`.

## Konfigurasi `.env.docker`
Pastikan nilai DB mengarah ke service MySQL internal:

```env
DB_CONNECTION=mysql
DB_HOST=mysql
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

Import `sql.sql` dijalankan otomatis oleh container MySQL saat volume database masih kosong (first run).

## Verifikasi Menyeluruh
Pastikan service `app` dan `mysql` aktif:

```bash
docker compose ps
```

Lihat log aplikasi:

```bash
docker compose logs -f app
```

Lihat log import MySQL:

```bash
docker compose logs -f mysql
```

Akses aplikasi:

```text
http://localhost:9090
```

## Perintah Tambahan
- Jalankan migrasi: `docker compose exec app php artisan migrate --force`
- Stop container: `docker compose down`
- Reset DB + import ulang `sql.sql`: `docker compose down -v && docker compose up -d --build`
