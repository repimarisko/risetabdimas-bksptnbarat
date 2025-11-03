CREATE TABLE `users` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `email` varchar(255),
  `role` varchar(30),
  `email_verified_at` timestamp,
  `password` varchar(255),
  `two_factor_secret` text,
  `two_factor_recovery_codes` text,
  `two_factor_confirmed_at` timestamp,
  `remember_token` varchar(100),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `dosen` (
  `uuid` varchar(100) PRIMARY KEY,
  `nidn` varchar(50),
  `id_user` int,
  `email` varchar(255),
  `uuid_pt` varchar(100),
  `verified_at` timestamp,
  `verified_by` bigint,
  `created_by` bigint,
  `created_at` timestamp
);

CREATE TABLE `ref_perguruan_tinggi` (
  `uuid` varchar(100) PRIMARY KEY,
  `nama` varchar(255),
  `nama_singkat` varchar(100),
  `id_pt` varchar(100),
  `alamat` text
);

CREATE TABLE `ref_skema` (
  `uuid` varchar(100) PRIMARY KEY,
  `jenis_skema` varchar(255),
  `nama` varchar(255),
  `nama_singkat` varchar(100),
  `multi_tahun` boolean,
  `biaya_minimal` double,
  `biaya_maksimal` double,
  `sumber_dana` varchar(255),
  `anggota_min` int,
  `anggota_max` int,
  `mulai` date,
  `selesai` date,
  `created_at` timestamp,
  `created_by` bigint,
  `updated_at` timestamp,
  `deleted_at` timestamp,
  `status` varchar(50)
);

CREATE TABLE `ref_fokus` (
  `uuid` varchar(100) PRIMARY KEY,
  `fokus` varchar(255),
  `created_at` timestamp,
  `created_by` bigint
);

CREATE TABLE `ref_sdg` (
  `uuid` varchar(100) PRIMARY KEY,
  `sdg` varchar(255),
  `level` int,
  `created_at` timestamp,
  `created_by` bigint
);

CREATE TABLE `ref_tkt` (
  `uuid` varchar(100) PRIMARY KEY,
  `tkt` varchar(255),
  `level` int,
  `created_at` timestamp,
  `created_by` bigint
);

CREATE TABLE `ref_komponen_biaya` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_komponen_rab` int,
  `jenis` varchar(10),
  `nama_komponen` varchar(255),
  `keterangan` text,
  `created_at` timestamp,
  `updated_at` timestamp,
  `deleted_at` timestamp
);

CREATE TABLE `pt_penelitian` (
  `uuid` varchar(100) PRIMARY KEY,
  `title` varchar(255),
  `id_skema` varchar(100),
  `id_tkt` varchar(100),
  `id_sdg` varchar(100),
  `id_fokus` varchar(100),
  `biaya_usulan_1` double,
  `biaya_usulan_2` double,
  `biaya_usulan_3` double,
  `biaya_usulan_4` double,
  `biaya_disetujui` double,
  `tahun` int,
  `tahun_pelaksanaan` int,
  `status` varchar(50),
  `email_pengusul` varchar(255),
  `created_at` timestamp,
  `created_by` bigint,
  `deleted_at` timestamp,
  `deleted_by` bigint
);

CREATE TABLE `pt_rab_tahun_1` (
  `uuid` int PRIMARY KEY AUTO_INCREMENT,
  `id_penelitian` varchar(100),
  `id_komponen` int,
  `nama_item` varchar(255),
  `jumlah_item` double,
  `harga_satuan` double,
  `total_biaya` double,
  `id_satuan` int,
  `created_at` timestamp,
  `updated_at` timestamp,
  `deleted_at` timestamp
);

CREATE TABLE `pt_rab_tahun_2` (
  `uuid` int PRIMARY KEY AUTO_INCREMENT,
  `id_penelitian` varchar(100),
  `id_komponen` int,
  `nama_item` varchar(255),
  `jumlah_item` double,
  `harga_satuan` double,
  `total_biaya` double,
  `id_satuan` int,
  `created_at` timestamp,
  `updated_at` timestamp,
  `deleted_at` timestamp
);

CREATE TABLE `pt_rab_tahun_3` (
  `uuid` int PRIMARY KEY AUTO_INCREMENT,
  `id_penelitian` varchar(100),
  `id_komponen` int,
  `nama_item` varchar(255),
  `jumlah_item` double,
  `harga_satuan` double,
  `total_biaya` double,
  `id_satuan` int,
  `created_at` timestamp,
  `updated_at` timestamp,
  `deleted_at` timestamp
);

CREATE TABLE `pt_rab_tahun_4` (
  `uuid` int PRIMARY KEY AUTO_INCREMENT,
  `id_penelitian` varchar(100),
  `id_komponen` int,
  `nama_item` varchar(255),
  `jumlah_item` double,
  `harga_satuan` double,
  `total_biaya` double,
  `id_satuan` int,
  `created_at` timestamp,
  `updated_at` timestamp,
  `deleted_at` timestamp
);

ALTER TABLE `dosen` ADD FOREIGN KEY (`verified_by`) REFERENCES `users` (`id`);

ALTER TABLE `dosen` ADD FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

ALTER TABLE `dosen` ADD FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

ALTER TABLE `dosen` ADD FOREIGN KEY (`uuid_pt`) REFERENCES `ref_perguruan_tinggi` (`uuid`);

ALTER TABLE `ref_skema` ADD FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

ALTER TABLE `ref_fokus` ADD FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

ALTER TABLE `ref_sdg` ADD FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

ALTER TABLE `ref_tkt` ADD FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

ALTER TABLE `pt_penelitian` ADD FOREIGN KEY (`id_skema`) REFERENCES `ref_skema` (`uuid`);

ALTER TABLE `pt_penelitian` ADD FOREIGN KEY (`id_tkt`) REFERENCES `ref_tkt` (`uuid`);

ALTER TABLE `pt_penelitian` ADD FOREIGN KEY (`id_sdg`) REFERENCES `ref_sdg` (`uuid`);

ALTER TABLE `pt_penelitian` ADD FOREIGN KEY (`id_fokus`) REFERENCES `ref_fokus` (`uuid`);

ALTER TABLE `pt_penelitian` ADD FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

ALTER TABLE `pt_penelitian` ADD FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`);

ALTER TABLE `pt_rab_tahun_1` ADD FOREIGN KEY (`id_penelitian`) REFERENCES `pt_penelitian` (`uuid`);

ALTER TABLE `pt_rab_tahun_2` ADD FOREIGN KEY (`id_penelitian`) REFERENCES `pt_penelitian` (`uuid`);

ALTER TABLE `pt_rab_tahun_3` ADD FOREIGN KEY (`id_penelitian`) REFERENCES `pt_penelitian` (`uuid`);

ALTER TABLE `pt_rab_tahun_4` ADD FOREIGN KEY (`id_penelitian`) REFERENCES `pt_penelitian` (`uuid`);

ALTER TABLE `pt_rab_tahun_1` ADD FOREIGN KEY (`id_komponen`) REFERENCES `ref_komponen_biaya` (`id`);

ALTER TABLE `pt_rab_tahun_2` ADD FOREIGN KEY (`id_komponen`) REFERENCES `ref_komponen_biaya` (`id`);

ALTER TABLE `pt_rab_tahun_3` ADD FOREIGN KEY (`id_komponen`) REFERENCES `ref_komponen_biaya` (`id`);

ALTER TABLE `pt_rab_tahun_4` ADD FOREIGN KEY (`id_komponen`) REFERENCES `ref_komponen_biaya` (`id`);
