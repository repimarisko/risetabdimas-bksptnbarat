-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 17, 2026 at 11:39 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_risetabdimas_bksptnbarat`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel-cache-031040cb15352347f7edbca0828e2a1e', 'i:1;', 1776308522),
('laravel-cache-031040cb15352347f7edbca0828e2a1e:timer', 'i:1776308522;', 1776308522),
('laravel-cache-1c7cfba25810bcc7d9104598f633f082', 'i:1;', 1776309271),
('laravel-cache-1c7cfba25810bcc7d9104598f633f082:timer', 'i:1776309271;', 1776309271),
('laravel-cache-580071baad7b227a20e85017933acecb', 'i:1;', 1776309203),
('laravel-cache-580071baad7b227a20e85017933acecb:timer', 'i:1776309203;', 1776309203),
('laravel-cache-5ecd957f8dcedd204bdb484685e0c4c1', 'i:1;', 1776306635),
('laravel-cache-5ecd957f8dcedd204bdb484685e0c4c1:timer', 'i:1776306635;', 1776306635),
('laravel-cache-d22ed38fa830f32dccf00daea7522bba', 'i:1;', 1776139771),
('laravel-cache-d22ed38fa830f32dccf00daea7522bba:timer', 'i:1776139771;', 1776139771);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dosen`
--

CREATE TABLE `dosen` (
  `uuid` varchar(100) NOT NULL,
  `id` varchar(100) DEFAULT NULL,
  `nidn` varchar(50) DEFAULT NULL,
  `id_user` bigint(20) UNSIGNED NOT NULL,
  `id_prodi` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `uuid_pt` varchar(100) NOT NULL,
  `status_aktif` tinyint(1) NOT NULL DEFAULT 1,
  `verified_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `verified_by` bigint(20) UNSIGNED DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `dosen`
--

INSERT INTO `dosen` (`uuid`, `id`, `nidn`, `id_user`, `id_prodi`, `email`, `uuid_pt`, `status_aktif`, `verified_at`, `deleted_at`, `verified_by`, `created_by`, `created_at`) VALUES
('a17b3d15-0cf6-4a75-8529-b93a170b88dc', NULL, '9876543210', 8, NULL, 'siti.rahma@example.com', '0a7f9626-2390-43a9-82fa-3ab87ff9a27b', 1, '2026-03-08 19:22:01', NULL, 8, 8, '2026-03-08 19:22:01'),
('a5d1523b-3099-472f-8d2a-12f831b453b9', NULL, '00000000', 10, NULL, 'swahyuningroem@upnvj.ac.id', '6c3b1a2e-3f06-4ce6-9e3f-5f8b6f4a9a01', 1, '2026-03-08 19:22:03', NULL, 10, 10, '2026-03-08 19:22:03'),
('a61d8da3-7451-47ac-95fb-2e58a7e328e8', NULL, '0123456789', 7, NULL, 'andi.pratama@example.com', '6c3b1a2e-3f06-4ce6-9e3f-5f8b6f4a9a01', 1, '2026-03-08 19:22:00', NULL, 7, 7, '2026-03-08 19:22:00'),
('fec58452-d0a7-41f3-8a71-2bc649eaefc0', NULL, '1122334455', 9, NULL, 'budi.santoso@example.com', '17d65870-9cb3-49c7-a095-0ebe65a0be43', 1, '2026-03-08 19:22:02', NULL, 9, 9, '2026-03-08 19:22:02');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lppm_profiles`
--

CREATE TABLE `lppm_profiles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid_pt` varchar(100) NOT NULL,
  `nomor_sk` varchar(255) DEFAULT NULL,
  `nama_lembaga` varchar(255) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `telepon` varchar(255) DEFAULT NULL,
  `fax` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `nama_jabatan` varchar(255) DEFAULT NULL,
  `nidn_pimpinan` varchar(255) DEFAULT NULL,
  `nama_pimpinan` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `luaran_buku`
--

CREATE TABLE `luaran_buku` (
  `id` int(10) UNSIGNED NOT NULL,
  `luaran_id` int(10) UNSIGNED NOT NULL,
  `judul_buku` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `luaran_file`
--

CREATE TABLE `luaran_file` (
  `id` int(10) UNSIGNED NOT NULL,
  `nama_luaran` varchar(255) DEFAULT NULL,
  `luaran_id` int(10) UNSIGNED NOT NULL,
  `nama_file` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` int(10) UNSIGNED DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `luaran_jurnal`
--

CREATE TABLE `luaran_jurnal` (
  `id` int(10) UNSIGNED NOT NULL,
  `luaran_id` int(10) UNSIGNED NOT NULL,
  `judul` varchar(255) DEFAULT NULL,
  `nama_jurnal` varchar(255) DEFAULT NULL,
  `issn` varchar(255) DEFAULT NULL,
  `lembaga_pengindeks` varchar(255) DEFAULT NULL,
  `urn` varchar(255) DEFAULT NULL,
  `status_artikel` varchar(255) DEFAULT NULL,
  `status_penulis` varchar(255) DEFAULT NULL,
  `file_artikel` varchar(255) DEFAULT NULL,
  `bukti_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `luaran_media_massa`
--

CREATE TABLE `luaran_media_massa` (
  `id` int(10) UNSIGNED NOT NULL,
  `luaran_id` int(10) UNSIGNED NOT NULL,
  `nama_media` varchar(255) DEFAULT NULL,
  `file_upload` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` int(10) UNSIGNED DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `luaran_per_skema`
--

CREATE TABLE `luaran_per_skema` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_ref_luaran` int(10) UNSIGNED DEFAULT NULL,
  `skema_id` varchar(100) DEFAULT NULL,
  `jenis_luaran` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` int(10) UNSIGNED DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `luaran_seminar`
--

CREATE TABLE `luaran_seminar` (
  `id` int(10) UNSIGNED NOT NULL,
  `luaran_id` int(10) UNSIGNED NOT NULL,
  `sptb` varchar(255) DEFAULT NULL,
  `presentase` decimal(8,2) DEFAULT NULL,
  `file_upload` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` int(10) UNSIGNED DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `href` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `sort` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `name`, `slug`, `href`, `icon`, `parent_id`, `sort`, `created_at`, `updated_at`) VALUES
(1, 'Dashboard', 'dashboard', '/dashboard', NULL, NULL, 1, '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
(2, 'Usulan Penelitian', 'pt-penelitian', '/pt-penelitian', NULL, NULL, 2, '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
(3, 'Perbaikan Usulan Penelitian', 'pt-penelitian-perbaikan', '/pt-penelitian/perbaikan', NULL, NULL, 3, '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
(4, 'Usulan Penelitian (Admin PT)', 'admin-pt-penelitian', '/admin/pt-penelitian', NULL, NULL, 4, '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
(5, 'Plotting Reviewer', 'assign-reviewer', '/admin/pt-penelitian/assign-reviewer', NULL, NULL, 5, '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
(6, 'Approve Akun Baru', 'users-approvals', '/users/approvals', NULL, NULL, 6, '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
(7, 'Skema Aktif', 'pt-skema', '/admin/pt-skema', NULL, NULL, 7, '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
(8, 'Role Assignment', 'role-assignment', '/settings/role-assignment', NULL, NULL, 8, '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
(9, 'Menu Settings', 'settings-menus', '/settings/menus', NULL, NULL, 9, '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
(10, 'Review Proposal', 'reviewer-dashboard', '/reviewer/pt-penelitian', NULL, NULL, 10, '2026-03-08 19:21:55', '2026-03-08 19:21:55');

-- --------------------------------------------------------

--
-- Table structure for table `menu_permission`
--

CREATE TABLE `menu_permission` (
  `menu_id` bigint(20) UNSIGNED NOT NULL,
  `permission_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `menu_permission`
--

INSERT INTO `menu_permission` (`menu_id`, `permission_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_08_26_100418_add_two_factor_columns_to_users_table', 1),
(5, '2025_11_02_033510_create_permission_tables', 1),
(6, '2025_11_02_033600_create_penelitian_reference_tables', 1),
(7, '2025_11_02_033605_create_ref_komponen_rab_table', 1),
(8, '2025_11_02_033645_pt_penelitian', 1),
(9, '2025_11_02_033700_create_pt_rab_tables', 1),
(10, '2025_11_02_053206_create_ref_perguruan_tinggi_and_dosen_tables', 1),
(11, '2025_11_02_053300_add_role_to_users_table', 1),
(12, '2025_11_02_060000_add_document_columns_to_pt_penelitian_table', 1),
(13, '2025_11_02_070000_create_pt_penelitian_anggotas_table', 1),
(14, '2025_11_02_070500_add_uuid_pt_to_users_table', 1),
(15, '2025_11_02_070600_add_uuid_pt_to_pt_penelitian_table', 1),
(16, '2025_11_02_080000_create_pt_penelitian_anggota_approvals_table', 1),
(17, '2025_11_05_000000_create_lppm_profiles_table', 1),
(18, '2025_12_10_000000_add_updated_at_to_pt_penelitian_table', 1),
(19, '2025_12_10_010000_create_pt_penelitian_reviews_table', 1),
(20, '2025_12_10_020000_create_pt_penelitian_reviewer_table', 1),
(21, '2025_12_12_134200_create_menus_table', 1),
(22, '2025_12_18_090133_add_deleted_at_to_users_table', 1),
(23, '2025_12_18_090200_ensure_deleted_at_on_pt_penelitian_table', 1),
(24, '2025_12_18_100500_create_user_archives_table', 1),
(25, '2025_12_18_100600_create_pt_penelitian_archives_table', 1),
(26, '2025_12_18_110000_add_deleted_at_to_dosen_table', 1),
(27, '2025_12_18_120000_add_ringkasan_to_pt_penelitian_table', 1),
(28, '2025_12_18_130000_sync_schema_with_diagram', 1),
(29, '2025_12_18_131000_add_id_uuid_alias_columns', 1),
(30, '2025_12_18_140000_update_anggota_approval_status_column', 1),
(31, '2026_02_24_045942_ref_jenis_pertanyaan', 1),
(32, '2026_02_24_050201_ref_pertanyaan_skema', 1),
(33, '2026_02_25_064159_pt_review_administrisi_dan_ref', 1),
(34, '2026_02_25_065714_ref_jenis_penugasan', 1),
(36, '2026_03_06_024756_update_table_rab', 1),
(37, '2026_03_04_033724_pt_review_subtansi_dan_detail', 2);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(2, 'App\\Models\\User', 2),
(2, 'App\\Models\\User', 3),
(2, 'App\\Models\\User', 4),
(3, 'App\\Models\\User', 5),
(3, 'App\\Models\\User', 8),
(4, 'App\\Models\\User', 7),
(4, 'App\\Models\\User', 8),
(4, 'App\\Models\\User', 9),
(4, 'App\\Models\\User', 10),
(5, 'App\\Models\\User', 6),
(5, 'App\\Models\\User', 7),
(5, 'App\\Models\\User', 9);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'menu.dashboard', 'web', '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
(2, 'menu.pt-penelitian', 'web', '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
(3, 'menu.pt-penelitian-perbaikan', 'web', '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
(4, 'menu.admin-pt-penelitian', 'web', '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
(5, 'menu.assign-reviewer', 'web', '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
(6, 'menu.users-approvals', 'web', '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
(7, 'menu.pt-skema', 'web', '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
(8, 'menu.role-assignment', 'web', '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
(9, 'menu.settings-menus', 'web', '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
(10, 'menu.reviewer-dashboard', 'web', '2026-03-08 19:21:55', '2026-03-08 19:21:55');

-- --------------------------------------------------------

--
-- Table structure for table `pt_dokumen`
--

CREATE TABLE `pt_dokumen` (
  `id` varchar(100) NOT NULL,
  `id_penelitian` varchar(100) NOT NULL,
  `jenis_dokumen` varchar(50) DEFAULT NULL,
  `nama_file` varchar(255) DEFAULT NULL,
  `path_file` text DEFAULT NULL,
  `tgl_upload` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pt_penelitian`
--

CREATE TABLE `pt_penelitian` (
  `uuid` varchar(100) NOT NULL,
  `id` varchar(100) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `judul` varchar(500) DEFAULT NULL,
  `abstrak` text DEFAULT NULL,
  `id_skema` varchar(100) DEFAULT NULL,
  `id_tkt` varchar(100) DEFAULT NULL,
  `id_sdg` varchar(100) DEFAULT NULL,
  `id_fokus` varchar(100) DEFAULT NULL,
  `ringkasan` text DEFAULT NULL,
  `biaya_usulan_1` double DEFAULT NULL,
  `biaya_usulan_2` double DEFAULT NULL,
  `biaya_usulan_3` double DEFAULT NULL,
  `biaya_usulan_4` double DEFAULT NULL,
  `biaya_disetujui` double DEFAULT NULL,
  `tahun` int(11) DEFAULT NULL,
  `tahun_anggaran` int(11) DEFAULT NULL,
  `lama_kegiatan` int(11) DEFAULT NULL,
  `tahun_pelaksanaan` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `id_status` int(10) UNSIGNED DEFAULT NULL,
  `uuid_pt` varchar(100) DEFAULT NULL,
  `target_luaran` text DEFAULT NULL,
  `proposal_path` varchar(255) DEFAULT NULL,
  `proposal_filename` varchar(255) DEFAULT NULL,
  `lampiran_path` varchar(255) DEFAULT NULL,
  `lampiran_filename` varchar(255) DEFAULT NULL,
  `email_pengusul` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_by` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pt_penelitian`
--

INSERT INTO `pt_penelitian` (`uuid`, `id`, `title`, `judul`, `abstrak`, `id_skema`, `id_tkt`, `id_sdg`, `id_fokus`, `ringkasan`, `biaya_usulan_1`, `biaya_usulan_2`, `biaya_usulan_3`, `biaya_usulan_4`, `biaya_disetujui`, `tahun`, `tahun_anggaran`, `lama_kegiatan`, `tahun_pelaksanaan`, `status`, `id_status`, `uuid_pt`, `target_luaran`, `proposal_path`, `proposal_filename`, `lampiran_path`, `lampiran_filename`, `email_pengusul`, `created_at`, `updated_at`, `created_by`, `deleted_at`, `deleted_by`) VALUES
('7f05b56a-36fe-4d9d-b9b4-0d47bf978497', NULL, 'Hubungan Penerimaan Diri dengan Kecemasan Menghadapi Dunia Kerja pada Tunadaksa.', NULL, NULL, 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12', 'd1e3a4b1-1bca-4cb3-8c27-1cc11a2b7a01', 'b02ce966-49b1-4e89-944d-2bb3770a3489', 'fbc1b3a7-51e4-42b3-9a6b-d52d0c6b356c', 'Judul skripsi yang baik harus spesifik, relevan dengan bidang studi, dan memecahkan masalah, dengan contoh topik meliputi analisis kebijakan kurikulum, pengembangan game edukasi, strategi pemasaran UMKM, hingga perilaku konsumen digital. Pilih judul berdasarkan minat, data yang tersedia, dan diskusi dengan dosen pembimbing.', 500000, 400000, NULL, NULL, NULL, 2026, NULL, NULL, 2026, 'Disetujui', NULL, '0a7f9626-2390-43a9-82fa-3ab87ff9a27b', 'Judul skripsi yang baik harus spesifik, relevan dengan bidang studi, dan memecahkan masalah, dengan contoh topik meliputi analisis kebijakan kurikulum, pengembangan game edukasi, strategi pemasaran UMKM, hingga perilaku konsumen digital. Pilih judul berdasarkan minat, data yang tersedia, dan diskusi dengan dosen pembimbing.', 'penelitian/proposals/i2CiIV6uc2uxT9kzDDyRGJ9F8qkzAEXh2myc52zj.pdf', 'Soal Latihan.pdf', 'penelitian/lampiran/RL5TEacVJQd0ZMR9YvVkw3XIM37xFM6CUlC4q2CY.pdf', 'Soal Latihan.pdf', 'siti.rahma@example.com', '2026-03-08 20:11:40', '2026-03-08 20:12:31', 8, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `pt_penelitian_anggotas`
--

CREATE TABLE `pt_penelitian_anggotas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `penelitian_uuid` varchar(100) NOT NULL,
  `dosen_uuid` varchar(100) NOT NULL,
  `peran` varchar(100) DEFAULT NULL,
  `tugas` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pt_penelitian_anggotas`
--

INSERT INTO `pt_penelitian_anggotas` (`id`, `penelitian_uuid`, `dosen_uuid`, `peran`, `tugas`, `created_at`, `updated_at`) VALUES
(1, '7f05b56a-36fe-4d9d-b9b4-0d47bf978497', 'a17b3d15-0cf6-4a75-8529-b93a170b88dc', 'Ketua Peneliti', 'ketua peneliti', '2026-03-08 20:11:42', '2026-03-08 20:11:42'),
(2, '7f05b56a-36fe-4d9d-b9b4-0d47bf978497', 'a61d8da3-7451-47ac-95fb-2e58a7e328e8', 'Anggota Peneliti', 'anggota peneliti', '2026-03-08 20:11:42', '2026-03-08 20:11:42');

-- --------------------------------------------------------

--
-- Table structure for table `pt_penelitian_anggota_approvals`
--

CREATE TABLE `pt_penelitian_anggota_approvals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `anggota_id` bigint(20) UNSIGNED NOT NULL,
  `dosen_uuid` varchar(100) NOT NULL,
  `status` varchar(20) DEFAULT 'pending',
  `approved_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pt_penelitian_anggota_approvals`
--

INSERT INTO `pt_penelitian_anggota_approvals` (`id`, `anggota_id`, `dosen_uuid`, `status`, `approved_at`, `created_at`, `updated_at`) VALUES
(1, 1, 'a17b3d15-0cf6-4a75-8529-b93a170b88dc', 'approved', '2026-03-08 20:11:42', '2026-03-08 20:11:42', '2026-03-08 20:11:42'),
(2, 2, 'a61d8da3-7451-47ac-95fb-2e58a7e328e8', 'approved', '2026-03-08 20:12:05', '2026-03-08 20:11:42', '2026-03-08 20:12:05');

-- --------------------------------------------------------

--
-- Table structure for table `pt_penelitian_archives`
--

CREATE TABLE `pt_penelitian_archives` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `source_uuid` varchar(100) NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`payload`)),
  `archived_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pt_penelitian_reviewer`
--

CREATE TABLE `pt_penelitian_reviewer` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `penelitian_uuid` varchar(100) NOT NULL,
  `reviewer_id` bigint(20) UNSIGNED NOT NULL,
  `assigned_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pt_penelitian_reviews`
--

CREATE TABLE `pt_penelitian_reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `penelitian_uuid` varchar(100) NOT NULL,
  `reviewer_id` bigint(20) UNSIGNED NOT NULL,
  `rekomendasi` varchar(50) DEFAULT NULL,
  `skor_kualitas` tinyint(3) UNSIGNED DEFAULT NULL,
  `skor_rab` tinyint(3) UNSIGNED DEFAULT NULL,
  `catatan_umum` text DEFAULT NULL,
  `catatan_rab` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pt_penugasan_review`
--

CREATE TABLE `pt_penugasan_review` (
  `id` char(36) NOT NULL,
  `id_penelitian` varchar(100) NOT NULL,
  `id_jenis_penugasan` varchar(100) NOT NULL,
  `id_reviewer` bigint(20) UNSIGNED NOT NULL,
  `tanggal_penugasan` date DEFAULT NULL,
  `batas_waktu` date DEFAULT NULL,
  `status_review` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pt_penugasan_review`
--

INSERT INTO `pt_penugasan_review` (`id`, `id_penelitian`, `id_jenis_penugasan`, `id_reviewer`, `tanggal_penugasan`, `batas_waktu`, `status_review`, `created_at`, `updated_at`) VALUES
('793f39e8-70c0-4ccf-9325-6090f0c66954', '7f05b56a-36fe-4d9d-b9b4-0d47bf978497', '2', 1, '2026-04-15', '2026-04-30', 'Selesai', '2026-04-15 20:02:31', '2026-04-15 20:07:12'),
('834635f3-2753-470a-b5df-6dbb97194eb1', '7f05b56a-36fe-4d9d-b9b4-0d47bf978497', '1', 1, '2026-04-01', '2026-04-30', 'Selesai', '2026-04-15 20:00:26', '2026-04-15 20:01:49'),
('eacc839b-84fe-4bee-ab48-a3dd050ce536', '7f05b56a-36fe-4d9d-b9b4-0d47bf978497', '2', 4, '2026-04-15', '2026-04-30', 'Selesai', '2026-04-15 20:02:56', '2026-04-15 20:14:40');

-- --------------------------------------------------------

--
-- Table structure for table `pt_rab_tahun_1`
--

CREATE TABLE `pt_rab_tahun_1` (
  `uuid` varchar(36) NOT NULL,
  `id_penelitian` varchar(100) NOT NULL,
  `id_komponen` int(10) UNSIGNED DEFAULT NULL,
  `nama_item` varchar(255) DEFAULT NULL,
  `jumlah_item` double DEFAULT NULL,
  `harga_satuan` double DEFAULT NULL,
  `total_biaya` double DEFAULT NULL,
  `id_satuan` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pt_rab_tahun_1`
--

INSERT INTO `pt_rab_tahun_1` (`uuid`, `id_penelitian`, `id_komponen`, `nama_item`, `jumlah_item`, `harga_satuan`, `total_biaya`, `id_satuan`, `created_at`, `updated_at`, `deleted_at`) VALUES
('de65bef9-7b29-4a48-92b2-745641f11be2', '7f05b56a-36fe-4d9d-b9b4-0d47bf978497', 2, 'pena', 100, 5000, 500000, NULL, '2026-03-08 20:11:42', '2026-03-08 20:11:42', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pt_rab_tahun_2`
--

CREATE TABLE `pt_rab_tahun_2` (
  `uuid` varchar(36) NOT NULL,
  `id_penelitian` varchar(100) NOT NULL,
  `id_komponen` int(10) UNSIGNED DEFAULT NULL,
  `nama_item` varchar(255) DEFAULT NULL,
  `jumlah_item` double DEFAULT NULL,
  `harga_satuan` double DEFAULT NULL,
  `total_biaya` double DEFAULT NULL,
  `id_satuan` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pt_rab_tahun_2`
--

INSERT INTO `pt_rab_tahun_2` (`uuid`, `id_penelitian`, `id_komponen`, `nama_item`, `jumlah_item`, `harga_satuan`, `total_biaya`, `id_satuan`, `created_at`, `updated_at`, `deleted_at`) VALUES
('b0195282-1da7-4969-9cce-12e503271c95', '7f05b56a-36fe-4d9d-b9b4-0d47bf978497', 12, 'pelatihan', 4, 100000, 400000, NULL, '2026-03-08 20:11:42', '2026-03-08 20:11:42', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pt_rab_tahun_3`
--

CREATE TABLE `pt_rab_tahun_3` (
  `uuid` varchar(36) NOT NULL,
  `id_penelitian` varchar(100) NOT NULL,
  `id_komponen` int(10) UNSIGNED DEFAULT NULL,
  `nama_item` varchar(255) DEFAULT NULL,
  `jumlah_item` double DEFAULT NULL,
  `harga_satuan` double DEFAULT NULL,
  `total_biaya` double DEFAULT NULL,
  `id_satuan` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pt_rab_tahun_4`
--

CREATE TABLE `pt_rab_tahun_4` (
  `uuid` varchar(36) NOT NULL,
  `id_penelitian` varchar(100) NOT NULL,
  `id_komponen` int(10) UNSIGNED DEFAULT NULL,
  `nama_item` varchar(255) DEFAULT NULL,
  `jumlah_item` double DEFAULT NULL,
  `harga_satuan` double DEFAULT NULL,
  `total_biaya` double DEFAULT NULL,
  `id_satuan` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pt_review_administrasi`
--

CREATE TABLE `pt_review_administrasi` (
  `id` char(36) NOT NULL,
  `id_penugasan` varchar(36) NOT NULL,
  `hasil` enum('Lolos','Tidak Lolos') DEFAULT NULL,
  `komentar` text DEFAULT NULL,
  `status_review` enum('Draft','Selesai') NOT NULL DEFAULT 'Draft',
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pt_review_administrasi`
--

INSERT INTO `pt_review_administrasi` (`id`, `id_penugasan`, `hasil`, `komentar`, `status_review`, `created_by`, `created_at`, `updated_at`) VALUES
('de424748-2781-4ee2-a5ba-7c1a59302ff9', '834635f3-2753-470a-b5df-6dbb97194eb1', 'Lolos', 'sesuai', 'Selesai', 6, '2026-04-15 20:01:39', '2026-04-15 20:01:49');

-- --------------------------------------------------------

--
-- Table structure for table `pt_review_administrasi_detail`
--

CREATE TABLE `pt_review_administrasi_detail` (
  `id` char(36) NOT NULL,
  `id_review` char(36) NOT NULL,
  `id_pertanyaan` char(36) NOT NULL,
  `jawaban` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pt_review_administrasi_detail`
--

INSERT INTO `pt_review_administrasi_detail` (`id`, `id_review`, `id_pertanyaan`, `jawaban`, `created_at`, `updated_at`) VALUES
('56732558-c361-434e-867d-aaa8af5742be', 'de424748-2781-4ee2-a5ba-7c1a59302ff9', '00dae566-6836-4eb6-8407-c0236802485d', 1, NULL, NULL),
('79c2e58f-85fd-4f92-9975-03a2a5edc9e5', 'de424748-2781-4ee2-a5ba-7c1a59302ff9', '86d661fc-cd8d-4bfb-983b-8410fb79c153', 1, NULL, NULL),
('804e7fff-6657-401b-9d81-0b854bb9308b', 'de424748-2781-4ee2-a5ba-7c1a59302ff9', 'f1b4cb6d-4a9e-44fe-8a33-45b1879e9455', 1, NULL, NULL),
('ab8d5c02-6461-45b9-9e37-87b4d2223b9e', 'de424748-2781-4ee2-a5ba-7c1a59302ff9', '1a369f6a-669b-4409-9940-b2657cd9055a', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pt_review_substansi`
--

CREATE TABLE `pt_review_substansi` (
  `id` char(36) NOT NULL,
  `id_penugasan` char(36) NOT NULL,
  `komentar` text DEFAULT NULL,
  `nilai_akhir` int(11) DEFAULT NULL,
  `status_review` enum('Draft','Selesai') NOT NULL DEFAULT 'Draft',
  `status_penilaian` enum('rekomendasi','tidak_rekomendasi') NOT NULL DEFAULT 'tidak_rekomendasi',
  `created_by` char(36) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pt_review_substansi`
--

INSERT INTO `pt_review_substansi` (`id`, `id_penugasan`, `komentar`, `nilai_akhir`, `status_review`, `status_penilaian`, `created_by`, `created_at`, `updated_at`) VALUES
('208ef94a-9191-41d4-b68e-ea139c2eca66', '793f39e8-70c0-4ccf-9325-6090f0c66954', 'rekomendasi', 625, 'Selesai', 'rekomendasi', '6', '2026-04-15 20:07:05', '2026-04-15 20:07:12'),
('fe43333c-5fff-4bc1-a673-e80297334375', 'eacc839b-84fe-4bee-ab48-a3dd050ce536', 'oke', 315, 'Selesai', 'tidak_rekomendasi', '9', '2026-04-15 20:14:34', '2026-04-15 20:14:40');

-- --------------------------------------------------------

--
-- Table structure for table `pt_review_substansi_detail`
--

CREATE TABLE `pt_review_substansi_detail` (
  `id` char(36) NOT NULL,
  `id_review` char(36) NOT NULL,
  `id_pertanyaan` char(36) NOT NULL,
  `bobot` int(11) DEFAULT NULL,
  `nilai` int(11) DEFAULT NULL,
  `komentar` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pt_review_substansi_detail`
--

INSERT INTO `pt_review_substansi_detail` (`id`, `id_review`, `id_pertanyaan`, `bobot`, `nilai`, `komentar`, `created_at`, `updated_at`) VALUES
('000a9e5d-b9b3-47ab-87b1-0fa0b5a846ee', '208ef94a-9191-41d4-b68e-ea139c2eca66', 'b6a5c098-42b4-4fa2-b40b-83ee5fd3417a', 5, 4, '2', '2026-04-15 20:07:12', '2026-04-15 20:07:12'),
('03dc37b9-48fe-447b-94ca-baff8e38c898', '208ef94a-9191-41d4-b68e-ea139c2eca66', 'e8f0187e-f91b-4535-b601-9e01119d851b', 10, 7, '2', '2026-04-15 20:07:12', '2026-04-15 20:07:12'),
('085dbeeb-58be-458b-b94a-3a8d64b969b5', 'fe43333c-5fff-4bc1-a673-e80297334375', 'a5efe52c-972b-4049-9374-79b3b7d571b3', 5, 4, NULL, '2026-04-15 20:14:40', '2026-04-15 20:14:40'),
('0cb41c73-4a81-4a41-a4d9-47dec20dbfa0', '208ef94a-9191-41d4-b68e-ea139c2eca66', 'badad23b-2836-43ce-a3a4-7075b3392fe3', 10, 6, '2', '2026-04-15 20:07:12', '2026-04-15 20:07:12'),
('0d409f76-d593-4168-8da6-0f55c4dc039c', '208ef94a-9191-41d4-b68e-ea139c2eca66', 'c00b3c8c-2cb7-4cdf-8dbd-6e88181af11f', 10, 7, '2', '2026-04-15 20:07:12', '2026-04-15 20:07:12'),
('10d73057-04b1-4eff-8bd0-fdc2627bbaf2', 'fe43333c-5fff-4bc1-a673-e80297334375', '16e33004-9dbb-4ee2-b661-4dddb2449514', 10, 3, NULL, '2026-04-15 20:14:40', '2026-04-15 20:14:40'),
('128df588-182d-453d-a1a1-fd2d2e914127', 'fe43333c-5fff-4bc1-a673-e80297334375', 'c00b3c8c-2cb7-4cdf-8dbd-6e88181af11f', 10, 4, NULL, '2026-04-15 20:14:40', '2026-04-15 20:14:40'),
('13d33354-6cfb-4991-9fb3-a3bb2864b43f', '208ef94a-9191-41d4-b68e-ea139c2eca66', '7f006329-99a3-4e48-bb2b-c423fb4bcabf', 5, 7, '2', '2026-04-15 20:07:12', '2026-04-15 20:07:12'),
('150f4830-e973-49d5-9fb9-44a0aaefd94c', 'fe43333c-5fff-4bc1-a673-e80297334375', '7f006329-99a3-4e48-bb2b-c423fb4bcabf', 5, 2, NULL, '2026-04-15 20:14:40', '2026-04-15 20:14:40'),
('4717e7fd-96cc-400e-95d7-4dec5de2f570', 'fe43333c-5fff-4bc1-a673-e80297334375', 'd43a28fd-bc63-498b-ae73-6691e8fb821d', 15, 3, NULL, '2026-04-15 20:14:40', '2026-04-15 20:14:40'),
('5a29b349-30ff-4935-b0b5-3d03d724e65e', '208ef94a-9191-41d4-b68e-ea139c2eca66', 'af9655da-efc6-44db-9e8c-7d86dba38ad9', 5, 7, '1', '2026-04-15 20:07:12', '2026-04-15 20:07:12'),
('6a392fc6-a8af-4b85-94de-d4d08511c05e', '208ef94a-9191-41d4-b68e-ea139c2eca66', 'a5efe52c-972b-4049-9374-79b3b7d571b3', 5, 7, '1', '2026-04-15 20:07:12', '2026-04-15 20:07:12'),
('902d6b81-84ef-46f9-adf0-d9bf78d0aa64', '208ef94a-9191-41d4-b68e-ea139c2eca66', 'd43a28fd-bc63-498b-ae73-6691e8fb821d', 15, 7, '2', '2026-04-15 20:07:12', '2026-04-15 20:07:12'),
('a4e3aa0c-2c6c-456d-a8b2-701d9009692b', 'fe43333c-5fff-4bc1-a673-e80297334375', '1419b3fb-24d9-4b73-947c-944899901e30', 5, 4, NULL, '2026-04-15 20:14:40', '2026-04-15 20:14:40'),
('a75e3baf-c4d0-46e4-8524-6e03cde0073e', 'fe43333c-5fff-4bc1-a673-e80297334375', 'badad23b-2836-43ce-a3a4-7075b3392fe3', 10, 3, NULL, '2026-04-15 20:14:40', '2026-04-15 20:14:40'),
('a8a92f4b-96a7-49cc-bbc5-5a137c666488', '208ef94a-9191-41d4-b68e-ea139c2eca66', '99109f41-7260-426b-89e4-5bb6869af3be', 5, 7, '2', '2026-04-15 20:07:12', '2026-04-15 20:07:12'),
('aba285f1-20d1-431a-9334-4697e630915e', '208ef94a-9191-41d4-b68e-ea139c2eca66', '16e33004-9dbb-4ee2-b661-4dddb2449514', 10, 7, '1', '2026-04-15 20:07:12', '2026-04-15 20:07:12'),
('c6a3b8ee-f7d2-4205-918e-e5f6dab13b64', 'fe43333c-5fff-4bc1-a673-e80297334375', 'af9655da-efc6-44db-9e8c-7d86dba38ad9', 5, 4, NULL, '2026-04-15 20:14:40', '2026-04-15 20:14:40'),
('c764d544-9c25-409a-ae74-6c5939a43bf0', '208ef94a-9191-41d4-b68e-ea139c2eca66', '66658335-2604-46f8-826e-65470644eb11', 5, 7, '2', '2026-04-15 20:07:12', '2026-04-15 20:07:12'),
('ccffb9d0-c773-4e7d-817a-1329d1c93ed0', 'fe43333c-5fff-4bc1-a673-e80297334375', '99109f41-7260-426b-89e4-5bb6869af3be', 5, 3, NULL, '2026-04-15 20:14:40', '2026-04-15 20:14:40'),
('cd25be1d-077c-41e8-939c-c037570d0dd0', 'fe43333c-5fff-4bc1-a673-e80297334375', 'e8f0187e-f91b-4535-b601-9e01119d851b', 10, 3, NULL, '2026-04-15 20:14:40', '2026-04-15 20:14:40'),
('d1f834b6-3f95-4b29-902f-4f2316429915', 'fe43333c-5fff-4bc1-a673-e80297334375', 'c51e39aa-0ed9-4b96-9824-3d1bbceabd05', 10, 3, NULL, '2026-04-15 20:14:40', '2026-04-15 20:14:40'),
('f7248360-00ad-4417-b079-20d41318288f', 'fe43333c-5fff-4bc1-a673-e80297334375', 'b6a5c098-42b4-4fa2-b40b-83ee5fd3417a', 5, 2, NULL, '2026-04-15 20:14:40', '2026-04-15 20:14:40'),
('f834f367-9f0c-480b-92fd-006895ea88df', '208ef94a-9191-41d4-b68e-ea139c2eca66', '1419b3fb-24d9-4b73-947c-944899901e30', 5, 7, '1', '2026-04-15 20:07:12', '2026-04-15 20:07:12'),
('fa12740d-3280-49da-b5fb-22036cf59cb3', '208ef94a-9191-41d4-b68e-ea139c2eca66', 'c51e39aa-0ed9-4b96-9824-3d1bbceabd05', 10, 2, '2', '2026-04-15 20:07:12', '2026-04-15 20:07:12'),
('fa7d9797-16d7-4124-8002-1fa40cb99934', 'fe43333c-5fff-4bc1-a673-e80297334375', '66658335-2604-46f8-826e-65470644eb11', 5, 3, NULL, '2026-04-15 20:14:40', '2026-04-15 20:14:40');

-- --------------------------------------------------------

--
-- Table structure for table `ref_fokus`
--

CREATE TABLE `ref_fokus` (
  `uuid` varchar(100) NOT NULL,
  `id` varchar(100) DEFAULT NULL,
  `bidang` varchar(255) DEFAULT NULL,
  `fokus` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ref_fokus`
--

INSERT INTO `ref_fokus` (`uuid`, `id`, `bidang`, `fokus`, `created_at`, `created_by`) VALUES
('0b8c3d45-5d68-48f7-9b54-00c8a4b7f42f', NULL, NULL, 'Kesehatan Obat', '2026-03-08 19:21:55', NULL),
('1e4b9b1c-42db-4d3d-80a2-5118f37a09bc', NULL, NULL, 'Hukum, politik dan civil society', '2026-03-08 19:21:55', NULL),
('2cdb8a1a-2359-4a2c-a7e1-889a1e4b8eab', NULL, NULL, 'Sosial Humaniora', '2026-03-08 19:21:55', NULL),
('38b9c247-ff65-4c98-9b93-49b5efc65d41', NULL, NULL, 'Inovasi Sains', '2026-03-08 19:21:55', NULL),
('40ff1ab6-d364-4eb4-b8ce-82d54d7f06e4', NULL, NULL, 'Inovasi teknologi mitigasi bencana', '2026-03-08 19:21:55', NULL),
('43f0d331-4d3f-4a67-85c4-124d5418bb61', NULL, NULL, 'Transportasi', '2026-03-08 19:21:55', NULL),
('6b582b79-76c1-4d6a-8121-9a1cbf4b0879', NULL, NULL, 'Pengembangan karakter bangsa', '2026-03-08 19:21:55', NULL),
('6d3a7e21-39cb-40a8-b8a5-ff732cf08ab4', NULL, NULL, 'Kemaritiman', '2026-03-08 19:21:55', NULL),
('8ad57e45-1a25-41b9-bc39-259f3b820d8a', NULL, NULL, 'Ekonomi dan Sumber Daya Manusia', '2026-03-08 19:21:55', NULL),
('8f9a2d7b-3569-4b11-8e7f-1f9a8b8e5f6b', NULL, NULL, 'Pertahanan dan Keamanan', '2026-03-08 19:21:55', NULL),
('9721b041-3a54-4975-80df-b796cf38bcdd', NULL, NULL, 'Gizi dan Kesehatan', '2026-03-08 19:21:55', NULL),
('a3d4c273-0162-49b4-b3c5-c2fdbf822d4a', NULL, NULL, 'Produk Rekayasa Keteknikan', '2026-03-08 19:21:55', NULL),
('a7bcd6c4-b6c5-4f51-8ee8-68b978a8b7a5', NULL, NULL, 'Inovasi teknologi dan industri', '2026-03-08 19:21:55', NULL),
('c8a5b679-d0a8-4a7e-b35d-351fd5f726a9', NULL, NULL, 'Obat Berbahan Alam', '2026-03-08 19:21:55', NULL),
('d3173e4a-f07f-45a1-93f1-2db468b19522', NULL, NULL, 'Multidisiplin & Lintas Sektor (Kebencanaan, Biodiversitas, Stunting, Lingkungan, Sumber Daya Air, Iklim)', '2026-03-08 19:21:55', NULL),
('db29f914-cf33-4692-8532-522a0aa96ab6', NULL, NULL, 'Energi', '2026-03-08 19:21:55', NULL),
('f4a3b5f7-8c5d-4a71-9b53-6ef620a43112', NULL, NULL, 'Ketahanan Pangan', '2026-03-08 19:21:55', NULL),
('fbc1b3a7-51e4-42b3-9a6b-d52d0c6b356c', NULL, NULL, 'Bidang Riset lainnya', '2026-03-08 19:21:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ref_global_status`
--

CREATE TABLE `ref_global_status` (
  `id` int(10) UNSIGNED NOT NULL,
  `jenis` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ref_jenis_penugasan`
--

CREATE TABLE `ref_jenis_penugasan` (
  `id` int(10) UNSIGNED NOT NULL,
  `nama` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ref_jenis_penugasan`
--

INSERT INTO `ref_jenis_penugasan` (`id`, `nama`, `created_at`, `updated_at`) VALUES
(1, 'Administrasi', '2026-03-08 19:20:41', '2026-03-08 19:20:41'),
(2, 'Substansi', '2026-03-08 19:20:41', '2026-03-08 19:20:41');

-- --------------------------------------------------------

--
-- Table structure for table `ref_jenis_pertanyaan`
--

CREATE TABLE `ref_jenis_pertanyaan` (
  `id` char(36) NOT NULL,
  `nomor_urut` int(11) NOT NULL DEFAULT 0,
  `jenis` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ref_jenis_pertanyaan`
--

INSERT INTO `ref_jenis_pertanyaan` (`id`, `nomor_urut`, `jenis`, `created_at`, `updated_at`) VALUES
('a88bdbf0-7ff4-439c-a696-113cdf77f8f3', 2, 'Urgensi Penelitian', '2026-02-23 16:31:12', '2026-02-23 16:31:12'),
('be4c4678-a0cf-4e1a-bbce-4f892ff8d90c', 1, 'Rekam jejak yang relevan', '2026-02-23 16:31:00', '2026-02-23 16:31:00'),
('dc442208-36a3-4203-aa70-4ac0c03baa7a', 4, 'Referensi', '2026-02-23 16:31:35', '2026-02-23 16:31:35'),
('f732b5a3-3b70-4b59-bec6-21232bd59ad2', 3, 'Metode', '2026-02-23 16:31:23', '2026-02-23 16:31:23');

-- --------------------------------------------------------

--
-- Table structure for table `ref_komponen_biaya`
--

CREATE TABLE `ref_komponen_biaya` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_komponen_rab` int(11) DEFAULT NULL,
  `kelompok` varchar(100) DEFAULT NULL,
  `jenis` varchar(10) DEFAULT NULL,
  `nama_komponen` varchar(255) DEFAULT NULL,
  `satuan` varchar(50) DEFAULT NULL,
  `harga_satuan_max` double DEFAULT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ref_komponen_biaya`
--

INSERT INTO `ref_komponen_biaya` (`id`, `id_komponen_rab`, `kelompok`, `jenis`, `nama_komponen`, `satuan`, `harga_satuan_max`, `keterangan`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 6, NULL, 'HON', 'Honorarium Peneliti', NULL, NULL, 'Honor untuk ketua dan anggota tim peneliti dalam kegiatan penelitian', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL),
(2, 1, NULL, 'BHN', 'Bahan Penelitian', NULL, NULL, 'Pembelian bahan habis pakai untuk kebutuhan laboratorium dan eksperimen penelitian', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL),
(3, 2, NULL, 'OPS', 'Pengumpulan Data Lapangan', NULL, NULL, 'Biaya transportasi, akomodasi, dan peralatan lapangan dalam proses pengumpulan data penelitian', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL),
(4, 4, NULL, 'ANL', 'Analisis Data', NULL, NULL, 'Biaya untuk pengolahan, analisis, dan interpretasi data hasil penelitian', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL),
(5, 5, NULL, 'LRN', 'Pelaporan dan Luaran Penelitian', NULL, NULL, 'Biaya penyusunan laporan, publikasi jurnal, serta luaran wajib dan tambahan penelitian', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL),
(6, 7, NULL, 'MDK', 'Teknologi dan Inovasi Pengabdian', NULL, NULL, 'Biaya penerapan teknologi dan inovasi untuk kegiatan pengabdian masyarakat', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL),
(7, 8, NULL, 'LNP', 'Biaya Lainnya Pengabdian', NULL, NULL, 'Biaya tidak langsung untuk mendukung kelancaran pelaksanaan kegiatan pengabdian', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL),
(8, 9, NULL, 'JSP', 'Upah dan Jasa Pengabdian', NULL, NULL, 'Biaya upah tenaga kerja atau jasa profesional dalam kegiatan pengabdian masyarakat', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL),
(9, 10, NULL, 'PLT', 'Pelatihan Masyarakat', NULL, NULL, 'Biaya pelatihan, sosialisasi, dan workshop bagi masyarakat dalam kegiatan pengabdian', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL),
(10, 11, NULL, 'PRJ', 'Perjalanan Dinas', NULL, NULL, 'Biaya transportasi, akomodasi, dan konsumsi untuk kegiatan penelitian dan pengabdian di luar kota', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL),
(11, 12, NULL, 'UPJ', 'Upah dan Jasa Penunjang', NULL, NULL, 'Biaya jasa pendukung kegiatan seperti desain, dokumentasi, dan pembuatan media promosi pengabdian', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL),
(12, 13, NULL, 'PLH', 'Pelatihan Tambahan', NULL, NULL, 'Biaya pelatihan tambahan untuk penguatan kapasitas masyarakat atau mitra pengabdian', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ref_komponen_rab`
--

CREATE TABLE `ref_komponen_rab` (
  `id` int(10) UNSIGNED NOT NULL,
  `kategori` varchar(10) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ref_komponen_rab`
--

INSERT INTO `ref_komponen_rab` (`id`, `kategori`, `nama`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'PPkM', 'Bahan', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL),
(2, 'PPkM', 'Pengumpulan Data', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL),
(3, 'PPkM', 'Sewa', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL),
(4, 'P', 'Analisis Data', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL),
(5, 'P', 'Pelaporan, Luaran Wajib, dan Luaran Tambahan', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL),
(6, 'P', 'Honorarium', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL),
(7, 'PkM', 'Teknologi dan Inovasi Pengabdian', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL),
(8, 'PkM', 'Biaya Lainnya Pengabdian', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL),
(9, 'PkM', 'Biaya Updah dan Jasa Pengabdian', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL),
(10, 'PkM', 'Biaya Pelatihan Pengabdian', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL),
(11, 'PkM', 'Biaya Perjalanan', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL),
(12, 'PkM', 'Biaya Upah dan Jasa', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL),
(13, 'PkM', 'Biaya Pelatihan', '2026-03-08 19:21:55', '2026-03-08 19:21:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ref_luaran`
--

CREATE TABLE `ref_luaran` (
  `id` int(10) UNSIGNED NOT NULL,
  `nama_luaran` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` int(10) UNSIGNED DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ref_perguruan_tinggi`
--

CREATE TABLE `ref_perguruan_tinggi` (
  `uuid` varchar(100) NOT NULL,
  `id` varchar(100) DEFAULT NULL,
  `nama` varchar(255) NOT NULL,
  `nama_singkat` varchar(100) NOT NULL,
  `id_pt` varchar(100) NOT NULL,
  `alamat` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ref_perguruan_tinggi`
--

INSERT INTO `ref_perguruan_tinggi` (`uuid`, `id`, `nama`, `nama_singkat`, `id_pt`, `alamat`, `created_at`, `updated_at`) VALUES
('0a7f9626-2390-43a9-82fa-3ab87ff9a27b', NULL, 'Universitas Indonesia', 'UI', 'PT-002', 'Jl. Samudra Raya No. 45, Surabaya', '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
('17d65870-9cb3-49c7-a095-0ebe65a0be43', NULL, 'Institut Teknologi Bandung', 'ITB', 'PT-003', 'Jl. Angkasa No. 7, Bandung', '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
('6c3b1a2e-3f06-4ce6-9e3f-5f8b6f4a9a01', NULL, 'Universitas Pembangunan Nasional Veteran Jakarta', 'UPN', 'PT-001', 'Jl. Ilmiah No. 123, Jakarta', '2026-03-08 19:21:55', '2026-03-08 19:21:55');

-- --------------------------------------------------------

--
-- Table structure for table `ref_pertanyaan_administrasi`
--

CREATE TABLE `ref_pertanyaan_administrasi` (
  `id` char(36) NOT NULL,
  `nomor_urut` int(11) NOT NULL,
  `pertanyaan` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ref_pertanyaan_administrasi`
--

INSERT INTO `ref_pertanyaan_administrasi` (`id`, `nomor_urut`, `pertanyaan`, `is_active`, `created_at`, `updated_at`) VALUES
('00dae566-6836-4eb6-8407-c0236802485d', 4, 'Kelengkapan Proposal (Cover, Identitas, Usulan, Substansi dan Lampiran)', 1, '2026-03-08 19:20:41', '2026-03-08 19:20:41'),
('1a369f6a-669b-4409-9940-b2657cd9055a', 1, 'Kesesuaian isi per bab', 1, '2026-03-08 19:20:41', '2026-03-08 19:20:41'),
('86d661fc-cd8d-4bfb-983b-8410fb79c153', 3, 'Model penulisan sitasi dan penulisan Daftar Pustaka', 1, '2026-03-08 19:20:41', '2026-03-08 19:20:41'),
('f1b4cb6d-4a9e-44fe-8a33-45b1879e9455', 2, 'Jumlah kata per bagian', 1, '2026-03-08 19:20:41', '2026-03-08 19:20:41');

-- --------------------------------------------------------

--
-- Table structure for table `ref_pertanyaan_skema`
--

CREATE TABLE `ref_pertanyaan_skema` (
  `id` char(36) NOT NULL,
  `uuid_skema` char(36) NOT NULL,
  `uuid_jenis` char(36) NOT NULL,
  `pertanyaan` text NOT NULL,
  `bobot` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ref_pertanyaan_skema`
--

INSERT INTO `ref_pertanyaan_skema` (`id`, `uuid_skema`, `uuid_jenis`, `pertanyaan`, `bobot`, `created_at`, `updated_at`) VALUES
('1419b3fb-24d9-4b73-947c-944899901e30', 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12', 'be4c4678-a0cf-4e1a-bbce-4f892ff8d90c', 'Publikasi, kekayaan intelektual, buku ketua pengusul yang disitasi pada proposal', 5, '2026-02-23 16:32:44', '2026-02-23 16:32:44'),
('16e33004-9dbb-4ee2-b661-4dddb2449514', 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12', 'a88bdbf0-7ff4-439c-a696-113cdf77f8f3', 'State of the art dan kebaruan', 10, '2026-02-23 16:39:36', '2026-02-23 16:39:36'),
('66658335-2604-46f8-826e-65470644eb11', 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12', 'f732b5a3-3b70-4b59-bec6-21232bd59ad2', 'Kejelasan pembagian tugas tim peneliti', 5, '2026-02-23 16:40:25', '2026-02-23 16:40:25'),
('7f006329-99a3-4e48-bb2b-c423fb4bcabf', 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12', 'f732b5a3-3b70-4b59-bec6-21232bd59ad2', 'Kredibilitas mitra dan bentuk dukungan', 5, '2026-02-23 16:40:53', '2026-02-23 16:40:53'),
('99109f41-7260-426b-89e4-5bb6869af3be', 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12', 'f732b5a3-3b70-4b59-bec6-21232bd59ad2', 'Kesesuaian metode dengan waktu, luaran dan fasilitas', 5, '2026-02-23 16:40:36', '2026-02-23 16:40:36'),
('a5efe52c-972b-4049-9374-79b3b7d571b3', 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12', 'be4c4678-a0cf-4e1a-bbce-4f892ff8d90c', 'Jumlah kolaborator publikasi jurnal bereputasi internasional', 5, '2026-02-23 16:33:24', '2026-02-23 16:33:24'),
('af9655da-efc6-44db-9e8c-7d86dba38ad9', 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12', 'be4c4678-a0cf-4e1a-bbce-4f892ff8d90c', 'Relevansi kepakaran pengusul dengan tema proposal (kata kunci)', 5, '2026-02-23 16:33:06', '2026-02-23 16:33:06'),
('b6a5c098-42b4-4fa2-b40b-83ee5fd3417a', 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12', 'dc442208-36a3-4203-aa70-4ac0c03baa7a', 'Kebaruan referensi', 5, '2026-02-23 16:41:08', '2026-02-23 16:41:08'),
('badad23b-2836-43ce-a3a4-7075b3392fe3', 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12', 'f732b5a3-3b70-4b59-bec6-21232bd59ad2', 'Akurasi metode penelitian', 10, '2026-02-23 16:40:05', '2026-02-23 16:40:05'),
('c00b3c8c-2cb7-4cdf-8dbd-6e88181af11f', 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12', 'a88bdbf0-7ff4-439c-a696-113cdf77f8f3', 'Akurasi peta jalan (roadmap) penelitian', 10, '2026-02-23 16:39:47', '2026-02-23 16:39:47'),
('c51e39aa-0ed9-4b96-9824-3d1bbceabd05', 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12', 'dc442208-36a3-4203-aa70-4ac0c03baa7a', 'Relevansi dan kualitas referensi', 10, '2026-02-23 16:41:26', '2026-02-23 16:43:32'),
('d43a28fd-bc63-498b-ae73-6691e8fb821d', 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12', 'a88bdbf0-7ff4-439c-a696-113cdf77f8f3', 'Ketajaman perumusan Masalah', 15, '2026-02-23 16:33:56', '2026-02-23 16:33:56'),
('e8f0187e-f91b-4535-b601-9e01119d851b', 'c79e1f30-4b3b-4a09-9a25-3e1fde12bd12', 'a88bdbf0-7ff4-439c-a696-113cdf77f8f3', 'Inovasi pendekatan pemecahan masalah', 10, '2026-02-23 16:39:09', '2026-02-23 16:39:20');

-- --------------------------------------------------------

--
-- Table structure for table `ref_sdg`
--

CREATE TABLE `ref_sdg` (
  `uuid` varchar(100) NOT NULL,
  `id` varchar(100) DEFAULT NULL,
  `sdg` varchar(255) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ref_sdg`
--

INSERT INTO `ref_sdg` (`uuid`, `id`, `sdg`, `level`, `created_at`, `created_by`) VALUES
('09db2a35-d299-4606-b3e8-4127b159b715', NULL, 'Penanganan Perubahan Iklim', 13, '2026-03-08 19:21:55', NULL),
('0a3b9c76-8c82-4f94-9874-0914a65f78c0', NULL, 'Kota dan Pemukiman yang Berkelanjutan', 11, '2026-03-08 19:21:55', NULL),
('0bc0ed8e-03b6-4f35-adab-b1dfdddcbbc6', NULL, 'Pendidikan Berkualitas', 4, '2026-03-08 19:21:55', NULL),
('13d05d1d-f5ce-4b79-8b61-9d1c2d9ed7a3', NULL, 'Industri, Inovasi dan Infrastruktur', 9, '2026-03-08 19:21:55', NULL),
('19d64911-1d9c-48eb-85c4-50dbfad8473c', NULL, 'Energi Bersih dan Terjangkau', 7, '2026-03-08 19:21:55', NULL),
('442d2f16-bf8c-4b9a-9a09-2b157a4f4efb', NULL, 'Berkurangnya Kesenjangan', 10, '2026-03-08 19:21:55', NULL),
('64cfd1eb-f8a2-42cf-b59b-3a0f6f5d109f', NULL, 'Pekerjaan Layak dan Pertumbuhan Ekonomi', 8, '2026-03-08 19:21:55', NULL),
('82d65012-7f3b-4d09-bc72-11580a12553e', NULL, 'Kesetaraan Gender', 5, '2026-03-08 19:21:55', NULL),
('ad70b7b4-ec76-4a81-9e8c-2fce6b09d83f', NULL, 'Kehidupan Sehat dan Sejahtera', 3, '2026-03-08 19:21:55', NULL),
('b02ce966-49b1-4e89-944d-2bb3770a3489', NULL, 'Tanpa Kemiskinan', 1, '2026-03-08 19:21:55', NULL),
('b4d1ab62-1e27-41b2-bf61-f42a63e59162', NULL, 'Air Bersih dan Sanitasi Layak', 6, '2026-03-08 19:21:55', NULL),
('b8b7b344-8a12-46d9-936f-9e1a77a6d46c', NULL, 'Ekosistem Lautan', 14, '2026-03-08 19:21:55', NULL),
('bbbc5e3e-99b4-47f5-b51f-36ce079b06d8', NULL, 'Ekosistem Daratan', 15, '2026-03-08 19:21:55', NULL),
('c7f42799-d930-42f0-b76b-cb1e45250f62', NULL, 'Perdamaian, Keadilan dan Kelembagaan yang Tangguh', 16, '2026-03-08 19:21:55', NULL),
('c9b7a6e1-5374-40e8-a6fc-fc12a81b76db', NULL, 'Tanpa Kelaparan', 2, '2026-03-08 19:21:55', NULL),
('d69bc7d7-523a-4b9d-8e44-8b7d61e7c831', NULL, 'Tidak terkait', NULL, '2026-03-08 19:21:55', NULL),
('e0f7c6a3-bb9c-4c0b-8a3a-d07f2a4d39a4', NULL, 'Kemitraan untuk Mencapai Tujuan', 17, '2026-03-08 19:21:55', NULL),
('e1b7f436-87e5-4e54-84xb3-0e3b1830a82d', NULL, 'Konsumsi dan Produksi yang Bertanggung Jawab', 12, '2026-03-08 19:21:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ref_skema`
--

CREATE TABLE `ref_skema` (
  `uuid` varchar(100) NOT NULL,
  `id` varchar(100) DEFAULT NULL,
  `jenis_skema` varchar(255) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `nama_singkat` varchar(100) DEFAULT NULL,
  `multi_tahun` tinyint(1) DEFAULT NULL,
  `lama_tahun_max` int(11) DEFAULT NULL,
  `biaya_minimal` double DEFAULT NULL,
  `biaya_maksimal` double DEFAULT NULL,
  `sumber_dana` varchar(255) DEFAULT NULL,
  `anggota_min` int(11) DEFAULT NULL,
  `anggota_max` int(11) DEFAULT NULL,
  `kewajiban_luaran` text DEFAULT NULL,
  `status_aktif` tinyint(1) DEFAULT NULL,
  `mulai` date DEFAULT NULL,
  `selesai` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ref_skema`
--

INSERT INTO `ref_skema` (`uuid`, `id`, `jenis_skema`, `nama`, `nama_singkat`, `multi_tahun`, `lama_tahun_max`, `biaya_minimal`, `biaya_maksimal`, `sumber_dana`, `anggota_min`, `anggota_max`, `kewajiban_luaran`, `status_aktif`, `mulai`, `selesai`, `created_at`, `created_by`, `updated_at`, `deleted_at`, `status`) VALUES
('34de00c7-1a1c-4cc9-8d07-98b236c9d399', NULL, 'Pengabdian', 'CS-COLL: KOLABORASI PENGABDIAN KEPADA MASYARAKAT FKLPPM', 'CS-COLL', 0, NULL, 40000000, 60000000, 'DRPM', 2, 4, NULL, NULL, '2025-03-01', '2025-09-30', '2026-03-08 19:21:55', NULL, '2026-03-08 19:21:55', NULL, 'aktif'),
('c79e1f30-4b3b-4a09-9a25-3e1fde12bd12', NULL, 'Penelitian', 'ECOLL: KOLABORASI RISET FKLPPM', 'ECOLL', 1, NULL, 60000000, 80000000, 'BKS-PTN-BARAT', 3, 5, NULL, NULL, '2025-01-01', '2025-12-31', '2026-03-08 19:21:55', NULL, '2026-03-08 19:21:55', NULL, 'aktif');

-- --------------------------------------------------------

--
-- Table structure for table `ref_tkt`
--

CREATE TABLE `ref_tkt` (
  `uuid` varchar(100) NOT NULL,
  `id` varchar(100) DEFAULT NULL,
  `tkt` varchar(255) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ref_tkt`
--

INSERT INTO `ref_tkt` (`uuid`, `id`, `tkt`, `level`, `deskripsi`, `created_at`, `created_by`) VALUES
('0a6f5c39-1d0a-4741-9b39-381f31c31e8e', NULL, 'Validasi kode, komponen (breadboard validation) teknologi / hasil litbang dalam lingkungan laboratorium (terkontrol).', 4, NULL, '2026-03-08 19:21:55', NULL),
('2e17f73b-67a9-4f0b-9487-0459d88a6b11', NULL, 'Formulasi konsep atau aplikasi teknologi / hasil litbang telah dilakukan.', 2, NULL, '2026-03-08 19:21:55', NULL),
('3a13cafb-96f5-4e6a-9c83-2852db66b56f', NULL, 'Model atau prototipe sistem/subsistem telah didemonstrasikan/diuji dalam lingkungan (aplikasi) sebenarnya.', 7, NULL, '2026-03-08 19:21:55', NULL),
('7a8c2e5c-9455-4c9e-996a-1ca5bde42a55', NULL, 'Validasi kode, komponen (breadboard validation) teknologi / hasil litbang dalam lingkungan simulasi.', 5, NULL, '2026-03-08 19:21:55', NULL),
('9fd81a37-3a21-4821-aac6-0b22e2cf3b92', NULL, 'Sistem teknologi / hasil litbang berhasil (teruji dan terbukti) dalam penggunaan yang dituju (aplikasi sebenarnya).', 9, NULL, '2026-03-08 19:21:55', NULL),
('b4a24b37-3b22-4c92-a9f3-f2046f6d1a81', NULL, 'Sistem telah lengkap dan memenuhi syarat (qualified) melalui pengujian dalam lingkungan (aplikasi) sebenarnya.', 8, NULL, '2026-03-08 19:21:55', NULL),
('d1e3a4b1-1bca-4cb3-8c27-1cc11a2b7a01', NULL, 'Prinsip dasar teknologi / hasil litbang telah dipelajari (diteliti dan dilaporkan).', 1, NULL, '2026-03-08 19:21:55', NULL),
('fd3b21a9-0c89-4fe1-85a3-ed3f13d7a2fc', NULL, 'Telah dilakukan pengujian analitis dan eksperimen untuk membuktikan konsep (proof-of-concept) teknologi / hasil litbang.', 3, NULL, '2026-03-08 19:21:55', NULL),
('ff61b2ae-1fcb-4927-b2f8-51a2e27c7e5e', NULL, 'Model atau prototipe sistem/subsistem telah didemonstrasikan/diuji dalam suatu lingkungan yang relevan.', 6, NULL, '2026-03-08 19:21:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `reviewer`
--

CREATE TABLE `reviewer` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_user` bigint(20) UNSIGNED DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reviewer`
--

INSERT INTO `reviewer` (`id`, `id_user`, `email`, `created_at`, `updated_at`) VALUES
(1, 6, 'reviewer@example.com', '2026-03-08 19:22:03', '2026-03-08 19:22:03'),
(2, 7, 'andi.pratama@example.com', '2026-03-08 19:22:03', '2026-03-08 19:22:03'),
(3, 8, 'siti.rahma@example.com', '2026-03-08 19:22:03', '2026-03-08 19:22:03'),
(4, 9, 'budi.santoso@example.com', '2026-03-08 19:22:03', '2026-03-08 19:22:03');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'super-admin', 'web', '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
(2, 'admin-pt', 'web', '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
(3, 'ketua-lppm', 'web', '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
(4, 'dosen', 'web', '2026-03-08 19:21:55', '2026-03-08 19:21:55'),
(5, 'reviewer', 'web', '2026-03-08 19:21:55', '2026-03-08 19:21:55');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(2, 4),
(3, 4),
(4, 1),
(4, 2),
(4, 3),
(5, 1),
(5, 2),
(6, 2),
(7, 1),
(7, 2),
(8, 1),
(9, 1),
(10, 5);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('kAXkTJIddSjIT4L95399To8RvhHXrRq94lhESznx', 3, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiaDY4Um5oWVhJTzl2alRiU3Eza1hRQjZlT09BUzJNeGRRamRvNGJqdCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MTAzOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYWRtaW4vcHQtcGVuZWxpdGlhbi9yZXBvcnQ/c2VhcmNoPSZzdGF0dXM9JnN0YXR1c19hZG1pbmlzdHJhc2k9JnN0YXR1c19zdWJzdGFuc2k9IjtzOjU6InJvdXRlIjtzOjMyOiJhZG1pbi5wdC1wZW5lbGl0aWFuLnJlcG9ydC5pbmRleCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjM7czoxMToiYWN0aXZlX3JvbGUiO3M6ODoiYWRtaW4tcHQiO30=', 1776317711),
('NfpsW4RD77jC3SqbsplCvXgKCKNphlNgTxDvhYDC', 9, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiT2FtVU9ab0p1SEM2ZUw5NkNOUENXZ1pKUFRrS1lDektTWnBJTUc0NSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6OTtzOjExOiJhY3RpdmVfcm9sZSI7czo4OiJyZXZpZXdlciI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9kYXNoYm9hcmQvcmV2aWV3ZXIiO3M6NToicm91dGUiO3M6MTg6ImRhc2hib2FyZC5yZXZpZXdlciI7fX0=', 1776317713);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(30) NOT NULL DEFAULT 'dosen',
  `uuid_pt` varchar(100) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `two_factor_secret` text DEFAULT NULL,
  `two_factor_recovery_codes` text DEFAULT NULL,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `uuid_pt`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `remember_token`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Super Admin', 'superadmin@example.com', 'super-admin', NULL, '2026-03-08 19:21:56', '$2y$12$R4WWzoROt.cCO2fmtehDNumHnfiD0EG4moIKTGHA9JHL417IONEq6', NULL, NULL, NULL, NULL, NULL, '2026-03-08 19:21:56', '2026-03-08 19:21:56'),
(2, 'Admin PT UCN', 'adminpt.ucn@example.com', 'admin-pt', '6c3b1a2e-3f06-4ce6-9e3f-5f8b6f4a9a01', '2026-03-08 19:21:57', '$2y$12$Akw/qGRC5aa/YLoFfKwPPOQY6BH3MUKJ6UQ5hGMEF3ROJOPiU7w3C', NULL, NULL, NULL, NULL, NULL, '2026-03-08 19:21:57', '2026-03-08 19:21:57'),
(3, 'Admin PT ITS', 'adminpt.its@example.com', 'admin-pt', '0a7f9626-2390-43a9-82fa-3ab87ff9a27b', '2026-03-08 19:21:58', '$2y$12$2FmqJRAwFceg3pixV/KPKuAukRx2t60AYZlwGOkKtTQCHVbzL0qgq', NULL, NULL, NULL, NULL, NULL, '2026-03-08 19:21:58', '2026-03-08 19:21:58'),
(4, 'Admin PT POLNA', 'adminpt.polna@example.com', 'admin-pt', '17d65870-9cb3-49c7-a095-0ebe65a0be43', '2026-03-08 19:21:58', '$2y$12$A.6LuWddNbLN5kLaT1OETeeAlUOM11B5o7KGTS8eIY3LxsbkpXvEi', NULL, NULL, NULL, NULL, NULL, '2026-03-08 19:21:58', '2026-03-08 19:21:58'),
(5, 'Ketua LPPM UCN', 'ketua.lppm.ucn@example.com', 'ketua-lppm', '6c3b1a2e-3f06-4ce6-9e3f-5f8b6f4a9a01', '2026-03-08 19:21:59', '$2y$12$7fxlC/YEoDWcS5tfJRXeT.xl2mMwZfWPTsGJ09h.BU61XmMcxvaNm', NULL, NULL, NULL, NULL, NULL, '2026-03-08 19:21:59', '2026-03-08 19:21:59'),
(6, 'Reviewer Demo', 'reviewer@example.com', 'reviewer', NULL, '2026-03-08 19:22:00', '$2y$12$nYqsvaHvAZgLvAZxkviZrutFOpFJjioR6KQqa6d3M9RCiEJUAMUtG', NULL, NULL, NULL, NULL, NULL, '2026-03-08 19:22:00', '2026-03-08 19:22:00'),
(7, 'Dr. Andi Pratama', 'andi.pratama@example.com', 'dosen', '6c3b1a2e-3f06-4ce6-9e3f-5f8b6f4a9a01', '2026-03-08 19:22:00', '$2y$12$OThNwAanL6EPSmsUi3blJ.HC8sBDnrWUHUIU7A.AxGKa6QqvgWD.C', NULL, NULL, NULL, NULL, NULL, '2026-03-08 19:22:00', '2026-03-08 19:22:00'),
(8, 'Prof. Siti Rahma', 'siti.rahma@example.com', 'dosen', '0a7f9626-2390-43a9-82fa-3ab87ff9a27b', '2026-03-08 19:22:01', '$2y$12$k6mBH/X5eZZb1/Rseesa3ughQ59uXgpwoLiydRav.X2QYPFZPctRu', NULL, NULL, NULL, NULL, NULL, '2026-03-08 19:22:01', '2026-03-08 19:22:01'),
(9, 'Ir. Budi Santoso', 'budi.santoso@example.com', 'dosen', '17d65870-9cb3-49c7-a095-0ebe65a0be43', '2026-03-08 19:22:02', '$2y$12$k9jOx7VzshHOCq13HLU/gu/gOF50LLUwmEI373hhPYUqH7W6CZv/e', NULL, NULL, NULL, NULL, NULL, '2026-03-08 19:22:02', '2026-03-08 19:22:02'),
(10, 'Sri Lestari Wahyuningroem', 'swahyuningroem@upnvj.ac.id', 'dosen', '6c3b1a2e-3f06-4ce6-9e3f-5f8b6f4a9a01', '2026-03-08 19:22:03', '$2y$12$DbGmFjHvRRg3fyLJ6OTH1.dzPMpGmsZCxN9w9Iz57O9QjnaZF2AE2', NULL, NULL, NULL, NULL, NULL, '2026-03-08 19:22:03', '2026-03-08 19:22:03');

-- --------------------------------------------------------

--
-- Table structure for table `user_archives`
--

CREATE TABLE `user_archives` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `source_id` bigint(20) UNSIGNED NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`payload`)),
  `archived_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_detail`
--

CREATE TABLE `user_detail` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_user` bigint(20) UNSIGNED NOT NULL,
  `nama_lengkap` varchar(150) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `tempat_lahir` varchar(100) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `nik` char(16) DEFAULT NULL,
  `nip` char(18) DEFAULT NULL,
  `nuptk` char(16) DEFAULT NULL,
  `hp` varchar(20) DEFAULT NULL,
  `status_aktif` tinyint(1) NOT NULL DEFAULT 1,
  `sinta_id` varchar(50) DEFAULT NULL,
  `scopus_id` varchar(50) DEFAULT NULL,
  `sinta_link` varchar(255) DEFAULT NULL,
  `scopus_link` varchar(255) DEFAULT NULL,
  `photo_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_detail`
--

INSERT INTO `user_detail` (`id`, `id_user`, `nama_lengkap`, `tanggal_lahir`, `tempat_lahir`, `alamat`, `nik`, `nip`, `nuptk`, `hp`, `status_aktif`, `sinta_id`, `scopus_id`, `sinta_link`, `scopus_link`, `photo_path`, `created_at`, `updated_at`) VALUES
(1, 8, 'Prof. Siti Rahma', '2026-03-09', 'sangir', 'sangir', '19101152630008', '19101152630008', '19101152630008', '082211779935', 1, '19101152630008', '19101152630008', 'https://dbdiagram.io/', 'https://dbdiagram.io/', NULL, '2026-03-09 02:48:40', '2026-03-08 19:55:52'),
(2, 7, 'Dr. Andi Pratama', '2026-03-09', 'sangir', 'sangir', '082211779935', '082211779935', '082211779935', '082211779935', 1, '082211779935', '082211779935', 'http://127.0.0.1:8000/', 'http://127.0.0.1:8000/', NULL, '2026-03-09 03:07:08', '2026-03-08 20:07:08');

-- --------------------------------------------------------

--
-- Table structure for table `_detail_penelitian`
--

CREATE TABLE `_detail_penelitian` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_penelitian` varchar(100) NOT NULL,
  `file_kontrak` varchar(255) DEFAULT NULL,
  `file_proposal` varchar(255) DEFAULT NULL,
  `file_lampiran` varchar(255) DEFAULT NULL,
  `file_kesanggupan` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `dosen`
--
ALTER TABLE `dosen`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `dosen_email_unique` (`email`),
  ADD KEY `dosen_id_user_foreign` (`id_user`),
  ADD KEY `dosen_verified_by_foreign` (`verified_by`),
  ADD KEY `dosen_created_by_foreign` (`created_by`),
  ADD KEY `dosen_uuid_pt_foreign` (`uuid_pt`),
  ADD KEY `dosen_id_index` (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lppm_profiles`
--
ALTER TABLE `lppm_profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `lppm_profiles_uuid_pt_unique` (`uuid_pt`);

--
-- Indexes for table `luaran_buku`
--
ALTER TABLE `luaran_buku`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `luaran_buku_luaran_id_unique` (`luaran_id`);

--
-- Indexes for table `luaran_file`
--
ALTER TABLE `luaran_file`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `luaran_file_luaran_id_unique` (`luaran_id`);

--
-- Indexes for table `luaran_jurnal`
--
ALTER TABLE `luaran_jurnal`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `luaran_jurnal_luaran_id_unique` (`luaran_id`);

--
-- Indexes for table `luaran_media_massa`
--
ALTER TABLE `luaran_media_massa`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `luaran_media_massa_luaran_id_unique` (`luaran_id`);

--
-- Indexes for table `luaran_per_skema`
--
ALTER TABLE `luaran_per_skema`
  ADD PRIMARY KEY (`id`),
  ADD KEY `luaran_per_skema_id_ref_luaran_foreign` (`id_ref_luaran`),
  ADD KEY `luaran_per_skema_skema_id_foreign` (`skema_id`);

--
-- Indexes for table `luaran_seminar`
--
ALTER TABLE `luaran_seminar`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `luaran_seminar_luaran_id_unique` (`luaran_id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `menus_slug_unique` (`slug`),
  ADD KEY `menus_parent_id_foreign` (`parent_id`);

--
-- Indexes for table `menu_permission`
--
ALTER TABLE `menu_permission`
  ADD PRIMARY KEY (`menu_id`,`permission_id`),
  ADD KEY `menu_permission_permission_id_foreign` (`permission_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `pt_dokumen`
--
ALTER TABLE `pt_dokumen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pt_dokumen_id_penelitian_foreign` (`id_penelitian`);

--
-- Indexes for table `pt_penelitian`
--
ALTER TABLE `pt_penelitian`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `pt_penelitian_created_by_foreign` (`created_by`),
  ADD KEY `pt_penelitian_deleted_by_foreign` (`deleted_by`),
  ADD KEY `pt_penelitian_id_skema_foreign` (`id_skema`),
  ADD KEY `pt_penelitian_id_tkt_foreign` (`id_tkt`),
  ADD KEY `pt_penelitian_id_sdg_foreign` (`id_sdg`),
  ADD KEY `pt_penelitian_id_fokus_foreign` (`id_fokus`),
  ADD KEY `pt_penelitian_uuid_pt_foreign` (`uuid_pt`),
  ADD KEY `pt_penelitian_id_index` (`id`);

--
-- Indexes for table `pt_penelitian_anggotas`
--
ALTER TABLE `pt_penelitian_anggotas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `penelitian_dosen_peran_unique` (`penelitian_uuid`,`dosen_uuid`,`peran`),
  ADD KEY `pt_penelitian_anggotas_dosen_uuid_foreign` (`dosen_uuid`);

--
-- Indexes for table `pt_penelitian_anggota_approvals`
--
ALTER TABLE `pt_penelitian_anggota_approvals`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pt_penelitian_anggota_approvals_anggota_id_dosen_uuid_unique` (`anggota_id`,`dosen_uuid`),
  ADD KEY `pt_penelitian_anggota_approvals_dosen_uuid_foreign` (`dosen_uuid`);

--
-- Indexes for table `pt_penelitian_archives`
--
ALTER TABLE `pt_penelitian_archives`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pt_penelitian_archives_source_uuid_unique` (`source_uuid`);

--
-- Indexes for table `pt_penelitian_reviewer`
--
ALTER TABLE `pt_penelitian_reviewer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pt_penelitian_reviewer_penelitian_uuid_reviewer_id_unique` (`penelitian_uuid`,`reviewer_id`),
  ADD KEY `pt_penelitian_reviewer_reviewer_id_foreign` (`reviewer_id`);

--
-- Indexes for table `pt_penelitian_reviews`
--
ALTER TABLE `pt_penelitian_reviews`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pt_penelitian_reviews_penelitian_uuid_reviewer_id_unique` (`penelitian_uuid`,`reviewer_id`),
  ADD KEY `pt_penelitian_reviews_reviewer_id_foreign` (`reviewer_id`);

--
-- Indexes for table `pt_penugasan_review`
--
ALTER TABLE `pt_penugasan_review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pt_penugasan_review_id_reviewer_foreign` (`id_reviewer`),
  ADD KEY `pt_penugasan_review_id_penelitian_foreign` (`id_penelitian`);

--
-- Indexes for table `pt_rab_tahun_1`
--
ALTER TABLE `pt_rab_tahun_1`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `pt_rab_tahun_1_id_penelitian_foreign` (`id_penelitian`),
  ADD KEY `pt_rab_tahun_1_id_komponen_foreign` (`id_komponen`);

--
-- Indexes for table `pt_rab_tahun_2`
--
ALTER TABLE `pt_rab_tahun_2`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `pt_rab_tahun_2_id_penelitian_foreign` (`id_penelitian`),
  ADD KEY `pt_rab_tahun_2_id_komponen_foreign` (`id_komponen`);

--
-- Indexes for table `pt_rab_tahun_3`
--
ALTER TABLE `pt_rab_tahun_3`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `pt_rab_tahun_3_id_penelitian_foreign` (`id_penelitian`),
  ADD KEY `pt_rab_tahun_3_id_komponen_foreign` (`id_komponen`);

--
-- Indexes for table `pt_rab_tahun_4`
--
ALTER TABLE `pt_rab_tahun_4`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `pt_rab_tahun_4_id_penelitian_foreign` (`id_penelitian`),
  ADD KEY `pt_rab_tahun_4_id_komponen_foreign` (`id_komponen`);

--
-- Indexes for table `pt_review_administrasi`
--
ALTER TABLE `pt_review_administrasi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pt_review_administrasi_id_penugasan_foreign` (`id_penugasan`),
  ADD KEY `pt_review_administrasi_created_by_foreign` (`created_by`);

--
-- Indexes for table `pt_review_administrasi_detail`
--
ALTER TABLE `pt_review_administrasi_detail`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pt_review_administrasi_detail_id_review_id_pertanyaan_unique` (`id_review`,`id_pertanyaan`),
  ADD KEY `pt_review_administrasi_detail_id_pertanyaan_foreign` (`id_pertanyaan`);

--
-- Indexes for table `pt_review_substansi`
--
ALTER TABLE `pt_review_substansi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pt_review_substansi_id_penugasan_foreign` (`id_penugasan`);

--
-- Indexes for table `pt_review_substansi_detail`
--
ALTER TABLE `pt_review_substansi_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pt_review_substansi_detail_id_review_foreign` (`id_review`),
  ADD KEY `pt_review_substansi_detail_id_pertanyaan_foreign` (`id_pertanyaan`);

--
-- Indexes for table `ref_fokus`
--
ALTER TABLE `ref_fokus`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `ref_fokus_created_by_foreign` (`created_by`),
  ADD KEY `ref_fokus_id_index` (`id`);

--
-- Indexes for table `ref_global_status`
--
ALTER TABLE `ref_global_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ref_jenis_penugasan`
--
ALTER TABLE `ref_jenis_penugasan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ref_jenis_pertanyaan`
--
ALTER TABLE `ref_jenis_pertanyaan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ref_komponen_biaya`
--
ALTER TABLE `ref_komponen_biaya`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ref_komponen_rab`
--
ALTER TABLE `ref_komponen_rab`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ref_luaran`
--
ALTER TABLE `ref_luaran`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ref_perguruan_tinggi`
--
ALTER TABLE `ref_perguruan_tinggi`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `ref_perguruan_tinggi_id_index` (`id`);

--
-- Indexes for table `ref_pertanyaan_administrasi`
--
ALTER TABLE `ref_pertanyaan_administrasi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ref_pertanyaan_skema`
--
ALTER TABLE `ref_pertanyaan_skema`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ref_pertanyaan_skema_uuid_skema_foreign` (`uuid_skema`),
  ADD KEY `ref_pertanyaan_skema_uuid_jenis_foreign` (`uuid_jenis`);

--
-- Indexes for table `ref_sdg`
--
ALTER TABLE `ref_sdg`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `ref_sdg_created_by_foreign` (`created_by`),
  ADD KEY `ref_sdg_id_index` (`id`);

--
-- Indexes for table `ref_skema`
--
ALTER TABLE `ref_skema`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `ref_skema_created_by_foreign` (`created_by`),
  ADD KEY `ref_skema_id_index` (`id`);

--
-- Indexes for table `ref_tkt`
--
ALTER TABLE `ref_tkt`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `ref_tkt_created_by_foreign` (`created_by`),
  ADD KEY `ref_tkt_id_index` (`id`);

--
-- Indexes for table `reviewer`
--
ALTER TABLE `reviewer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviewer_id_user_foreign` (`id_user`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_uuid_pt_foreign` (`uuid_pt`);

--
-- Indexes for table `user_archives`
--
ALTER TABLE `user_archives`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_archives_source_id_unique` (`source_id`);

--
-- Indexes for table `user_detail`
--
ALTER TABLE `user_detail`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_detail_id_user_unique` (`id_user`);

--
-- Indexes for table `_detail_penelitian`
--
ALTER TABLE `_detail_penelitian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `_detail_penelitian_id_penelitian_foreign` (`id_penelitian`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lppm_profiles`
--
ALTER TABLE `lppm_profiles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `luaran_buku`
--
ALTER TABLE `luaran_buku`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `luaran_file`
--
ALTER TABLE `luaran_file`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `luaran_jurnal`
--
ALTER TABLE `luaran_jurnal`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `luaran_media_massa`
--
ALTER TABLE `luaran_media_massa`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `luaran_per_skema`
--
ALTER TABLE `luaran_per_skema`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `luaran_seminar`
--
ALTER TABLE `luaran_seminar`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `pt_penelitian_anggotas`
--
ALTER TABLE `pt_penelitian_anggotas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pt_penelitian_anggota_approvals`
--
ALTER TABLE `pt_penelitian_anggota_approvals`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pt_penelitian_archives`
--
ALTER TABLE `pt_penelitian_archives`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pt_penelitian_reviewer`
--
ALTER TABLE `pt_penelitian_reviewer`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pt_penelitian_reviews`
--
ALTER TABLE `pt_penelitian_reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ref_global_status`
--
ALTER TABLE `ref_global_status`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ref_jenis_penugasan`
--
ALTER TABLE `ref_jenis_penugasan`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ref_komponen_biaya`
--
ALTER TABLE `ref_komponen_biaya`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `ref_komponen_rab`
--
ALTER TABLE `ref_komponen_rab`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `ref_luaran`
--
ALTER TABLE `ref_luaran`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviewer`
--
ALTER TABLE `reviewer`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_archives`
--
ALTER TABLE `user_archives`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_detail`
--
ALTER TABLE `user_detail`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `_detail_penelitian`
--
ALTER TABLE `_detail_penelitian`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dosen`
--
ALTER TABLE `dosen`
  ADD CONSTRAINT `dosen_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `dosen_id_user_foreign` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `dosen_uuid_pt_foreign` FOREIGN KEY (`uuid_pt`) REFERENCES `ref_perguruan_tinggi` (`uuid`) ON DELETE CASCADE,
  ADD CONSTRAINT `dosen_verified_by_foreign` FOREIGN KEY (`verified_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `lppm_profiles`
--
ALTER TABLE `lppm_profiles`
  ADD CONSTRAINT `lppm_profiles_uuid_pt_foreign` FOREIGN KEY (`uuid_pt`) REFERENCES `ref_perguruan_tinggi` (`uuid`) ON DELETE CASCADE;

--
-- Constraints for table `luaran_buku`
--
ALTER TABLE `luaran_buku`
  ADD CONSTRAINT `luaran_buku_luaran_id_foreign` FOREIGN KEY (`luaran_id`) REFERENCES `luaran_per_skema` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `luaran_file`
--
ALTER TABLE `luaran_file`
  ADD CONSTRAINT `luaran_file_luaran_id_foreign` FOREIGN KEY (`luaran_id`) REFERENCES `luaran_per_skema` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `luaran_jurnal`
--
ALTER TABLE `luaran_jurnal`
  ADD CONSTRAINT `luaran_jurnal_luaran_id_foreign` FOREIGN KEY (`luaran_id`) REFERENCES `luaran_per_skema` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `luaran_media_massa`
--
ALTER TABLE `luaran_media_massa`
  ADD CONSTRAINT `luaran_media_massa_luaran_id_foreign` FOREIGN KEY (`luaran_id`) REFERENCES `luaran_per_skema` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `luaran_per_skema`
--
ALTER TABLE `luaran_per_skema`
  ADD CONSTRAINT `luaran_per_skema_id_ref_luaran_foreign` FOREIGN KEY (`id_ref_luaran`) REFERENCES `ref_luaran` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `luaran_per_skema_skema_id_foreign` FOREIGN KEY (`skema_id`) REFERENCES `ref_skema` (`uuid`) ON DELETE SET NULL;

--
-- Constraints for table `luaran_seminar`
--
ALTER TABLE `luaran_seminar`
  ADD CONSTRAINT `luaran_seminar_luaran_id_foreign` FOREIGN KEY (`luaran_id`) REFERENCES `luaran_per_skema` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `menus`
--
ALTER TABLE `menus`
  ADD CONSTRAINT `menus_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `menu_permission`
--
ALTER TABLE `menu_permission`
  ADD CONSTRAINT `menu_permission_menu_id_foreign` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `menu_permission_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pt_dokumen`
--
ALTER TABLE `pt_dokumen`
  ADD CONSTRAINT `pt_dokumen_id_penelitian_foreign` FOREIGN KEY (`id_penelitian`) REFERENCES `pt_penelitian` (`uuid`) ON DELETE CASCADE;

--
-- Constraints for table `pt_penelitian`
--
ALTER TABLE `pt_penelitian`
  ADD CONSTRAINT `pt_penelitian_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `pt_penelitian_deleted_by_foreign` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `pt_penelitian_id_fokus_foreign` FOREIGN KEY (`id_fokus`) REFERENCES `ref_fokus` (`uuid`),
  ADD CONSTRAINT `pt_penelitian_id_sdg_foreign` FOREIGN KEY (`id_sdg`) REFERENCES `ref_sdg` (`uuid`),
  ADD CONSTRAINT `pt_penelitian_id_skema_foreign` FOREIGN KEY (`id_skema`) REFERENCES `ref_skema` (`uuid`),
  ADD CONSTRAINT `pt_penelitian_id_tkt_foreign` FOREIGN KEY (`id_tkt`) REFERENCES `ref_tkt` (`uuid`),
  ADD CONSTRAINT `pt_penelitian_uuid_pt_foreign` FOREIGN KEY (`uuid_pt`) REFERENCES `ref_perguruan_tinggi` (`uuid`) ON DELETE SET NULL;

--
-- Constraints for table `pt_penelitian_anggotas`
--
ALTER TABLE `pt_penelitian_anggotas`
  ADD CONSTRAINT `pt_penelitian_anggotas_dosen_uuid_foreign` FOREIGN KEY (`dosen_uuid`) REFERENCES `dosen` (`uuid`) ON DELETE CASCADE,
  ADD CONSTRAINT `pt_penelitian_anggotas_penelitian_uuid_foreign` FOREIGN KEY (`penelitian_uuid`) REFERENCES `pt_penelitian` (`uuid`) ON DELETE CASCADE;

--
-- Constraints for table `pt_penelitian_anggota_approvals`
--
ALTER TABLE `pt_penelitian_anggota_approvals`
  ADD CONSTRAINT `pt_penelitian_anggota_approvals_anggota_id_foreign` FOREIGN KEY (`anggota_id`) REFERENCES `pt_penelitian_anggotas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pt_penelitian_anggota_approvals_dosen_uuid_foreign` FOREIGN KEY (`dosen_uuid`) REFERENCES `dosen` (`uuid`) ON DELETE CASCADE;

--
-- Constraints for table `pt_penelitian_reviewer`
--
ALTER TABLE `pt_penelitian_reviewer`
  ADD CONSTRAINT `pt_penelitian_reviewer_penelitian_uuid_foreign` FOREIGN KEY (`penelitian_uuid`) REFERENCES `pt_penelitian` (`uuid`) ON DELETE CASCADE,
  ADD CONSTRAINT `pt_penelitian_reviewer_reviewer_id_foreign` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pt_penelitian_reviews`
--
ALTER TABLE `pt_penelitian_reviews`
  ADD CONSTRAINT `pt_penelitian_reviews_penelitian_uuid_foreign` FOREIGN KEY (`penelitian_uuid`) REFERENCES `pt_penelitian` (`uuid`) ON DELETE CASCADE,
  ADD CONSTRAINT `pt_penelitian_reviews_reviewer_id_foreign` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pt_penugasan_review`
--
ALTER TABLE `pt_penugasan_review`
  ADD CONSTRAINT `pt_penugasan_review_id_penelitian_foreign` FOREIGN KEY (`id_penelitian`) REFERENCES `pt_penelitian` (`uuid`) ON DELETE CASCADE,
  ADD CONSTRAINT `pt_penugasan_review_id_reviewer_foreign` FOREIGN KEY (`id_reviewer`) REFERENCES `reviewer` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pt_rab_tahun_1`
--
ALTER TABLE `pt_rab_tahun_1`
  ADD CONSTRAINT `pt_rab_tahun_1_id_komponen_foreign` FOREIGN KEY (`id_komponen`) REFERENCES `ref_komponen_biaya` (`id`),
  ADD CONSTRAINT `pt_rab_tahun_1_id_penelitian_foreign` FOREIGN KEY (`id_penelitian`) REFERENCES `pt_penelitian` (`uuid`);

--
-- Constraints for table `pt_rab_tahun_2`
--
ALTER TABLE `pt_rab_tahun_2`
  ADD CONSTRAINT `pt_rab_tahun_2_id_komponen_foreign` FOREIGN KEY (`id_komponen`) REFERENCES `ref_komponen_biaya` (`id`),
  ADD CONSTRAINT `pt_rab_tahun_2_id_penelitian_foreign` FOREIGN KEY (`id_penelitian`) REFERENCES `pt_penelitian` (`uuid`);

--
-- Constraints for table `pt_rab_tahun_3`
--
ALTER TABLE `pt_rab_tahun_3`
  ADD CONSTRAINT `pt_rab_tahun_3_id_komponen_foreign` FOREIGN KEY (`id_komponen`) REFERENCES `ref_komponen_biaya` (`id`),
  ADD CONSTRAINT `pt_rab_tahun_3_id_penelitian_foreign` FOREIGN KEY (`id_penelitian`) REFERENCES `pt_penelitian` (`uuid`);

--
-- Constraints for table `pt_rab_tahun_4`
--
ALTER TABLE `pt_rab_tahun_4`
  ADD CONSTRAINT `pt_rab_tahun_4_id_komponen_foreign` FOREIGN KEY (`id_komponen`) REFERENCES `ref_komponen_biaya` (`id`),
  ADD CONSTRAINT `pt_rab_tahun_4_id_penelitian_foreign` FOREIGN KEY (`id_penelitian`) REFERENCES `pt_penelitian` (`uuid`);

--
-- Constraints for table `pt_review_administrasi`
--
ALTER TABLE `pt_review_administrasi`
  ADD CONSTRAINT `pt_review_administrasi_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `pt_review_administrasi_id_penugasan_foreign` FOREIGN KEY (`id_penugasan`) REFERENCES `pt_penugasan_review` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pt_review_administrasi_detail`
--
ALTER TABLE `pt_review_administrasi_detail`
  ADD CONSTRAINT `pt_review_administrasi_detail_id_pertanyaan_foreign` FOREIGN KEY (`id_pertanyaan`) REFERENCES `ref_pertanyaan_administrasi` (`id`),
  ADD CONSTRAINT `pt_review_administrasi_detail_id_review_foreign` FOREIGN KEY (`id_review`) REFERENCES `pt_review_administrasi` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pt_review_substansi`
--
ALTER TABLE `pt_review_substansi`
  ADD CONSTRAINT `pt_review_substansi_id_penugasan_foreign` FOREIGN KEY (`id_penugasan`) REFERENCES `pt_penugasan_review` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pt_review_substansi_detail`
--
ALTER TABLE `pt_review_substansi_detail`
  ADD CONSTRAINT `pt_review_substansi_detail_id_pertanyaan_foreign` FOREIGN KEY (`id_pertanyaan`) REFERENCES `ref_pertanyaan_skema` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pt_review_substansi_detail_id_review_foreign` FOREIGN KEY (`id_review`) REFERENCES `pt_review_substansi` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ref_fokus`
--
ALTER TABLE `ref_fokus`
  ADD CONSTRAINT `ref_fokus_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `ref_pertanyaan_skema`
--
ALTER TABLE `ref_pertanyaan_skema`
  ADD CONSTRAINT `ref_pertanyaan_skema_uuid_jenis_foreign` FOREIGN KEY (`uuid_jenis`) REFERENCES `ref_jenis_pertanyaan` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ref_pertanyaan_skema_uuid_skema_foreign` FOREIGN KEY (`uuid_skema`) REFERENCES `ref_skema` (`uuid`) ON DELETE CASCADE;

--
-- Constraints for table `ref_sdg`
--
ALTER TABLE `ref_sdg`
  ADD CONSTRAINT `ref_sdg_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `ref_skema`
--
ALTER TABLE `ref_skema`
  ADD CONSTRAINT `ref_skema_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `ref_tkt`
--
ALTER TABLE `ref_tkt`
  ADD CONSTRAINT `ref_tkt_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `reviewer`
--
ALTER TABLE `reviewer`
  ADD CONSTRAINT `reviewer_id_user_foreign` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_uuid_pt_foreign` FOREIGN KEY (`uuid_pt`) REFERENCES `ref_perguruan_tinggi` (`uuid`) ON DELETE SET NULL;

--
-- Constraints for table `user_detail`
--
ALTER TABLE `user_detail`
  ADD CONSTRAINT `user_detail_id_user_foreign` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `_detail_penelitian`
--
ALTER TABLE `_detail_penelitian`
  ADD CONSTRAINT `_detail_penelitian_id_penelitian_foreign` FOREIGN KEY (`id_penelitian`) REFERENCES `pt_penelitian` (`uuid`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
