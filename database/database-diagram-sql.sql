CREATE TABLE `users` (
  `id` uuid,
  `name` varchar(255),
  `email` varchar(255),
  `role` varchar(30) COMMENT 'Admin, Dosen, Reviewer, LPPM',
  `email_verified_at` timestamp,
  `password` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `user_detail` (
  `id_user` uuid,
  `nama_lengkap` VARCHAR(150),
  `tanggal_lahir` DATE,
  `tempat_lahir` VARCHAR(100),
  `alamat` TEXT,
  `nik` CHAR(16),
  `nip` CHAR(18),
  `nuptk` CHAR(16),
  `hp` VARCHAR(20),
  `status_aktif` TINYINT(1),
  `sinta_id` VARCHAR(50),
  `scopus_id` VARCHAR(50),
  `sinta_link` VARCHAR(255),
  `scopus_link` VARCHAR(255),
  `photo_path` VARCHAR(255),
  `created_at` DATETIME,
  `updated_at` DATETIME
);

CREATE TABLE `reviewer` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `id_user` int,
  `email` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `dosen` (
  `id` uuid,
  `nidn` varchar(50),
  `id_user` bigint,
  `id_prodi` varchar(100),
  `uuid_pt` varchar(100),
  `status_aktif` boolean,
  `created_at` timestamp
);

CREATE TABLE `ref_perguruan_tinggi` (
  `id` uuid,
  `nama` varchar(255),
  `id_pt` varchar(100),
  `alamat` text
);

CREATE TABLE `ref_skema` (
  `id` uuid,
  `nama` varchar(255),
  `nama_singkat` varchar(100),
  `multi_tahun` boolean,
  `lama_tahun_max` int COMMENT 'Misal: 3 tahun',
  `biaya_minimal` double,
  `biaya_maksimal` double,
  `sumber_dana` varchar(255),
  `anggota_min` int,
  `anggota_max` int,
  `kewajiban_luaran` text,
  `status_aktif` boolean
);

CREATE TABLE `ref_fokus` (
  `id` uuid,
  `bidang` varchar(255),
  `fokus` varchar(255)
);

CREATE TABLE `ref_sdg` (
  `id` uuid,
  `sdg` varchar(255),
  `level` int
);

CREATE TABLE `ref_tkt` (
  `id` uuid,
  `level` int,
  `deskripsi` text
);

CREATE TABLE `ref_komponen_biaya` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `kelompok` varchar(100) COMMENT 'Honor, Bahan, Perjalanan, Sewa',
  `nama_komponen` varchar(255),
  `satuan` varchar(50),
  `harga_satuan_max` double
);

CREATE TABLE `pt_penelitian` (
  `id` uuid,
  `judul` varchar(500),
  `abstrak` text,
  `id_skema` varchar(100),
  `id_tkt` varchar(100),
  `id_sdg` varchar(100),
  `id_fokus` varchar(100),
  `tahun_anggaran` int,
  `lama_kegiatan` int COMMENT 'Durasi dalam tahun',
  `id_status` int,
  `created_at` timestamp,
  `created_by` uuid,
  `updated_at` timestamp
);

CREATE TABLE `_detail_penelitian` (
  `id` int,
  `id_penelitian` uuid,
  `file_kontrak` varchar(255),
  `file_proposal` varchar(255),
  `file_lampiran` varchar(255),
  `file_kesanggupan` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `pt_anggota_dosen` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `id_penelitian` varchar(100),
  `id_user` bigint COMMENT 'Dosen ',
  `peran` varchar(50) COMMENT 'Ketua, Anggota Peneliti',
  `status_aktif` boolean,
  `persetujuan` boolean,
  `tugas` text
);

CREATE TABLE `pt_anggota_mahasiswa` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `id_user` bigint,
  `id_penelitian` varchar(100),
  `nama` varchar(255) COMMENT 'Mahasiswa ',
  `peran` varchar(50) COMMENT 'Anggota Peneliti Mahasiswa',
  `status_aktif` boolean,
  `persetujuan` boolean,
  `tugas` text
);

CREATE TABLE `pt_rab_detail` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `id_penelitian` varchar(100),
  `id_komponen_biaya` int,
  `tahun_ke` int,
  `uraian_item` varchar(255),
  `volume` double,
  `satuan` varchar(50),
  `harga_satuan` double,
  `total_harga` double,
  `keterangan` text,
  `created_at` timestamp
);

CREATE TABLE `pt_penugasan_review` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `id_penelitian` varchar(100),
  `id_reviewer` bigint,
  `tanggal_penugasan` date,
  `batas_waktu` date,
  `status_review` varchar(50) COMMENT 'Pending, Selesai'
);

CREATE TABLE `pt_nilai_review` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `id_penugasan` bigint,
  `kriteria` varchar(255),
  `bobot` float,
  `skor` float,
  `nilai_akhir` float,
  `catatan` text
);

CREATE TABLE `pt_dokumen` (
  `id` uuid,
  `id_penelitian` uuid,
  `jenis_dokumen` varchar(50) COMMENT 'Proposal, Laporan Kemajuan, Laporan Akhir, SPTB',
  `nama_file` varchar(255),
  `path_file` text,
  `tgl_upload` timestamp
);

CREATE TABLE `luaran_per_skema` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_ref_luaran` int,
  `skema_id` uuid,
  `jenis_luaran` varchar(255),
  `created_at` datetime,
  `created_by` int
);

CREATE TABLE `ref_luaran` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nama_luaran` varchar(255),
  `created_at` datetime,
  `created_by` int
);

CREATE TABLE `luaran_file` (
  `id` int,
  `nama_luaran` varchar(255),
  `luaran_id` int PRIMARY KEY,
  `nama_file` varchar(255),
  `file_path` varchar(255),
  `created_at` datetime,
  `created_by` int
);

CREATE TABLE `luaran_buku` (
  `luaran_id` int PRIMARY KEY,
  `judul_buku` varchar(255)
);

CREATE TABLE `luaran_jurnal` (
  `luaran_id` int PRIMARY KEY,
  `judul` varchar(255),
  `nama_jurnal` varchar(255),
  `issn` varchar(255),
  `lembaga_pengindeks` varchar(255),
  `urn` varchar(255),
  `status_artikel` varchar(255),
  `status_penulis` varchar(255),
  `file_artikel` varchar(255),
  `bukti_status` varchar(255)
);

CREATE TABLE `luaran_media_massa` (
  `luaran_id` int PRIMARY KEY,
  `nama_media` varchar(255),
  `file_upload` varchar(255),
  `created_at` datetime,
  `created_by` int
);

CREATE TABLE `luaran_seminar` (
  `luaran_id` int PRIMARY KEY,
  `sptb` varchar(255),
  `presentase` decimal,
  `file_upload` varchar(255),
  `created_at` datetime,
  `created_by` int
);

CREATE TABLE `ref_global_status` (
  `id` int,
  `jenis` varchar(255),
  `status` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp
);

ALTER TABLE `user_detail` ADD FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

ALTER TABLE `reviewer` ADD FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

ALTER TABLE `dosen` ADD FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

ALTER TABLE `dosen` ADD FOREIGN KEY (`uuid_pt`) REFERENCES `ref_perguruan_tinggi` (`id`);

ALTER TABLE `pt_penelitian` ADD FOREIGN KEY (`id_status`) REFERENCES `ref_global_status` (`id`);

ALTER TABLE `pt_penelitian` ADD FOREIGN KEY (`id`) REFERENCES `_detail_penelitian` (`id_penelitian`);

ALTER TABLE `pt_penelitian` ADD FOREIGN KEY (`id_skema`) REFERENCES `ref_skema` (`id`);

ALTER TABLE `pt_penelitian` ADD FOREIGN KEY (`id_tkt`) REFERENCES `ref_tkt` (`id`);

ALTER TABLE `pt_penelitian` ADD FOREIGN KEY (`id_sdg`) REFERENCES `ref_sdg` (`id`);

ALTER TABLE `pt_penelitian` ADD FOREIGN KEY (`id_fokus`) REFERENCES `ref_fokus` (`id`);

ALTER TABLE `pt_penelitian` ADD FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

ALTER TABLE `pt_anggota_dosen` ADD FOREIGN KEY (`id_penelitian`) REFERENCES `pt_penelitian` (`id`);

ALTER TABLE `pt_anggota_dosen` ADD FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

ALTER TABLE `pt_anggota_mahasiswa` ADD FOREIGN KEY (`id_penelitian`) REFERENCES `pt_penelitian` (`id`);

ALTER TABLE `pt_anggota_mahasiswa` ADD FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

ALTER TABLE `pt_rab_detail` ADD FOREIGN KEY (`id_penelitian`) REFERENCES `pt_penelitian` (`id`);

ALTER TABLE `pt_rab_detail` ADD FOREIGN KEY (`id_komponen_biaya`) REFERENCES `ref_komponen_biaya` (`id`);

ALTER TABLE `pt_penugasan_review` ADD FOREIGN KEY (`id_penelitian`) REFERENCES `pt_penelitian` (`id`);

ALTER TABLE `pt_penugasan_review` ADD FOREIGN KEY (`id_reviewer`) REFERENCES `reviewer` (`id`);

ALTER TABLE `pt_nilai_review` ADD FOREIGN KEY (`id_penugasan`) REFERENCES `pt_penugasan_review` (`id`);

ALTER TABLE `ref_luaran` ADD FOREIGN KEY (`id`) REFERENCES `luaran_per_skema` (`id_ref_luaran`);

ALTER TABLE `luaran_per_skema` ADD FOREIGN KEY (`skema_id`) REFERENCES `ref_skema` (`id`);

ALTER TABLE `luaran_file` ADD FOREIGN KEY (`luaran_id`) REFERENCES `luaran_per_skema` (`id`);

ALTER TABLE `luaran_buku` ADD FOREIGN KEY (`luaran_id`) REFERENCES `luaran_per_skema` (`id`);

ALTER TABLE `luaran_jurnal` ADD FOREIGN KEY (`luaran_id`) REFERENCES `luaran_per_skema` (`id`);

ALTER TABLE `luaran_media_massa` ADD FOREIGN KEY (`luaran_id`) REFERENCES `luaran_per_skema` (`id`);

ALTER TABLE `luaran_seminar` ADD FOREIGN KEY (`luaran_id`) REFERENCES `luaran_per_skema` (`id`);

ALTER TABLE `pt_dokumen` ADD FOREIGN KEY (`id_penelitian`) REFERENCES `pt_penelitian` (`id`);
