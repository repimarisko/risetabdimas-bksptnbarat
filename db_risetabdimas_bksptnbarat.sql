-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 10, 2026 at 08:26 AM
-- Server version: 9.4.0
-- PHP Version: 8.4.13

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
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dosen`
--

CREATE TABLE `dosen` (
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nidn` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_user` bigint UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid_pt` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `verified_at` timestamp NULL DEFAULT NULL,
  `verified_by` bigint UNSIGNED DEFAULT NULL,
  `created_by` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `dosen`
--

INSERT INTO `dosen` (`uuid`, `nidn`, `id_user`, `email`, `uuid_pt`, `verified_at`, `verified_by`, `created_by`, `created_at`) VALUES
('54788c79-2e21-4c39-b4cd-4a5b7263bb38', '0123456789', 7, 'andi.pratama@example.com', '6c3b1a2e-3f06-4ce6-9e3f-5f8b6f4a9a01', '2026-02-09 20:05:48', 7, 7, '2026-02-09 20:05:48'),
('62b7d46b-8511-427b-b77d-0fecccffacce', '1122334455', 9, 'budi.santoso@example.com', '17d65870-9cb3-49c7-a095-0ebe65a0be43', '2026-02-09 20:05:48', 9, 9, '2026-02-09 20:05:48'),
('da0cdd87-e4d7-4447-8173-8b76eb790b95', '9876543210', 8, 'siti.rahma@example.com', '0a7f9626-2390-43a9-82fa-3ab87ff9a27b', '2026-02-09 20:05:48', 8, 8, '2026-02-09 20:05:48'),
('f85fde93-d4b9-425b-98ea-2def5069dcd4', '00000000', 10, 'swahyuningroem@upnvj.ac.id', '6c3b1a2e-3f06-4ce6-9e3f-5f8b6f4a9a01', '2026-02-09 20:05:49', 10, 10, '2026-02-09 20:05:49');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lppm_profiles`
--

CREATE TABLE `lppm_profiles` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid_pt` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomor_sk` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama_lembaga` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci,
  `telepon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fax` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama_jabatan` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nidn_pimpinan` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama_pimpinan` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `href` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` bigint UNSIGNED DEFAULT NULL,
  `sort` int UNSIGNED NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `name`, `slug`, `href`, `icon`, `parent_id`, `sort`, `created_at`, `updated_at`) VALUES
(1, 'Dashboard', 'dashboard', '/dashboard', NULL, NULL, 1, '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
(2, 'Usulan Penelitian', 'pt-penelitian', '/pt-penelitian', NULL, NULL, 2, '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
(3, 'Perbaikan Usulan Penelitian', 'pt-penelitian-perbaikan', '/pt-penelitian/perbaikan', NULL, NULL, 3, '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
(4, 'Usulan Penelitian (Admin PT)', 'admin-pt-penelitian', '/admin/pt-penelitian', NULL, NULL, 4, '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
(5, 'Plotting Reviewer', 'assign-reviewer', '/admin/pt-penelitian/assign-reviewer', NULL, NULL, 5, '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
(6, 'Approve Akun Baru', 'users-approvals', '/users/approvals', NULL, NULL, 6, '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
(7, 'Skema Aktif', 'pt-skema', '/admin/pt-skema', NULL, NULL, 7, '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
(8, 'Role Assignment', 'role-assignment', '/settings/role-assignment', NULL, NULL, 8, '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
(9, 'Menu Settings', 'settings-menus', '/settings/menus', NULL, NULL, 9, '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
(10, 'Review Proposal', 'reviewer-dashboard', '/reviewer/pt-penelitian', NULL, NULL, 10, '2026-02-09 20:05:46', '2026-02-09 20:05:46');

-- --------------------------------------------------------

--
-- Table structure for table `menu_permission`
--

CREATE TABLE `menu_permission` (
  `menu_id` bigint UNSIGNED NOT NULL,
  `permission_id` bigint UNSIGNED NOT NULL
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
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
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
(7, '2025_11_02_033645_pt_penelitian', 1),
(8, '2025_11_02_033700_create_pt_rab_tables', 1),
(9, '2025_11_02_053206_create_ref_perguruan_tinggi_and_dosen_tables', 1),
(10, '2025_11_02_053300_add_role_to_users_table', 1),
(11, '2025_11_02_060000_add_document_columns_to_pt_penelitian_table', 1),
(12, '2025_11_02_070000_create_pt_penelitian_anggotas_table', 1),
(13, '2025_11_02_070500_add_uuid_pt_to_users_table', 1),
(14, '2025_11_02_070600_add_uuid_pt_to_pt_penelitian_table', 1),
(15, '2025_11_02_080000_create_pt_penelitian_anggota_approvals_table', 1),
(16, '2025_11_05_000000_create_lppm_profiles_table', 1),
(17, '2025_12_10_000000_add_updated_at_to_pt_penelitian_table', 1),
(18, '2025_12_10_010000_create_pt_penelitian_reviews_table', 1),
(19, '2025_12_10_020000_create_pt_penelitian_reviewer_table', 1),
(20, '2025_12_12_134200_create_menus_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
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
(5, 'App\\Models\\User', 6),
(4, 'App\\Models\\User', 7),
(4, 'App\\Models\\User', 8),
(4, 'App\\Models\\User', 9),
(4, 'App\\Models\\User', 10);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'menu.dashboard', 'web', '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
(2, 'menu.pt-penelitian', 'web', '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
(3, 'menu.pt-penelitian-perbaikan', 'web', '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
(4, 'menu.admin-pt-penelitian', 'web', '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
(5, 'menu.assign-reviewer', 'web', '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
(6, 'menu.users-approvals', 'web', '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
(7, 'menu.pt-skema', 'web', '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
(8, 'menu.role-assignment', 'web', '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
(9, 'menu.settings-menus', 'web', '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
(10, 'menu.reviewer-dashboard', 'web', '2026-02-09 20:05:46', '2026-02-09 20:05:46');

-- --------------------------------------------------------

--
-- Table structure for table `pt_penelitian`
--

CREATE TABLE `pt_penelitian` (
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_skema` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_tkt` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_sdg` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_fokus` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `biaya_usulan_1` double DEFAULT NULL,
  `biaya_usulan_2` double DEFAULT NULL,
  `biaya_usulan_3` double DEFAULT NULL,
  `biaya_usulan_4` double DEFAULT NULL,
  `biaya_disetujui` double DEFAULT NULL,
  `tahun` int DEFAULT NULL,
  `tahun_pelaksanaan` int DEFAULT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uuid_pt` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `target_luaran` text COLLATE utf8mb4_unicode_ci,
  `proposal_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `proposal_filename` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lampiran_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lampiran_filename` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_pengusul` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint UNSIGNED DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_by` bigint UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pt_penelitian_anggotas`
--

CREATE TABLE `pt_penelitian_anggotas` (
  `id` bigint UNSIGNED NOT NULL,
  `penelitian_uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dosen_uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `peran` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tugas` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pt_penelitian_anggota_approvals`
--

CREATE TABLE `pt_penelitian_anggota_approvals` (
  `id` bigint UNSIGNED NOT NULL,
  `anggota_id` bigint UNSIGNED NOT NULL,
  `dosen_uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','approved') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `approved_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pt_penelitian_reviewer`
--

CREATE TABLE `pt_penelitian_reviewer` (
  `id` bigint UNSIGNED NOT NULL,
  `penelitian_uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reviewer_id` bigint UNSIGNED NOT NULL,
  `assigned_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pt_penelitian_reviews`
--

CREATE TABLE `pt_penelitian_reviews` (
  `id` bigint UNSIGNED NOT NULL,
  `penelitian_uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reviewer_id` bigint UNSIGNED NOT NULL,
  `rekomendasi` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skor_kualitas` tinyint UNSIGNED DEFAULT NULL,
  `skor_rab` tinyint UNSIGNED DEFAULT NULL,
  `catatan_umum` text COLLATE utf8mb4_unicode_ci,
  `catatan_rab` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pt_rab_tahun_1`
--

CREATE TABLE `pt_rab_tahun_1` (
  `uuid` int UNSIGNED NOT NULL,
  `id_penelitian` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_komponen` int UNSIGNED DEFAULT NULL,
  `nama_item` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jumlah_item` double DEFAULT NULL,
  `harga_satuan` double DEFAULT NULL,
  `total_biaya` double DEFAULT NULL,
  `id_satuan` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pt_rab_tahun_2`
--

CREATE TABLE `pt_rab_tahun_2` (
  `uuid` int UNSIGNED NOT NULL,
  `id_penelitian` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_komponen` int UNSIGNED DEFAULT NULL,
  `nama_item` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jumlah_item` double DEFAULT NULL,
  `harga_satuan` double DEFAULT NULL,
  `total_biaya` double DEFAULT NULL,
  `id_satuan` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pt_rab_tahun_3`
--

CREATE TABLE `pt_rab_tahun_3` (
  `uuid` int UNSIGNED NOT NULL,
  `id_penelitian` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_komponen` int UNSIGNED DEFAULT NULL,
  `nama_item` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jumlah_item` double DEFAULT NULL,
  `harga_satuan` double DEFAULT NULL,
  `total_biaya` double DEFAULT NULL,
  `id_satuan` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pt_rab_tahun_4`
--

CREATE TABLE `pt_rab_tahun_4` (
  `uuid` int UNSIGNED NOT NULL,
  `id_penelitian` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_komponen` int UNSIGNED DEFAULT NULL,
  `nama_item` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jumlah_item` double DEFAULT NULL,
  `harga_satuan` double DEFAULT NULL,
  `total_biaya` double DEFAULT NULL,
  `id_satuan` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ref_fokus`
--

CREATE TABLE `ref_fokus` (
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fokus` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ref_fokus`
--

INSERT INTO `ref_fokus` (`uuid`, `fokus`, `created_at`, `created_by`) VALUES
('0b8c3d45-5d68-48f7-9b54-00c8a4b7f42f', 'Kesehatan Obat', '2026-02-09 20:05:46', NULL),
('1e4b9b1c-42db-4d3d-80a2-5118f37a09bc', 'Hukum, politik dan civil society', '2026-02-09 20:05:46', NULL),
('2cdb8a1a-2359-4a2c-a7e1-889a1e4b8eab', 'Sosial Humaniora', '2026-02-09 20:05:46', NULL),
('38b9c247-ff65-4c98-9b93-49b5efc65d41', 'Inovasi Sains', '2026-02-09 20:05:46', NULL),
('40ff1ab6-d364-4eb4-b8ce-82d54d7f06e4', 'Inovasi teknologi mitigasi bencana', '2026-02-09 20:05:46', NULL),
('43f0d331-4d3f-4a67-85c4-124d5418bb61', 'Transportasi', '2026-02-09 20:05:46', NULL),
('6b582b79-76c1-4d6a-8121-9a1cbf4b0879', 'Pengembangan karakter bangsa', '2026-02-09 20:05:46', NULL),
('6d3a7e21-39cb-40a8-b8a5-ff732cf08ab4', 'Kemaritiman', '2026-02-09 20:05:46', NULL),
('8ad57e45-1a25-41b9-bc39-259f3b820d8a', 'Ekonomi dan Sumber Daya Manusia', '2026-02-09 20:05:46', NULL),
('8f9a2d7b-3569-4b11-8e7f-1f9a8b8e5f6b', 'Pertahanan dan Keamanan', '2026-02-09 20:05:46', NULL),
('9721b041-3a54-4975-80df-b796cf38bcdd', 'Gizi dan Kesehatan', '2026-02-09 20:05:46', NULL),
('a3d4c273-0162-49b4-b3c5-c2fdbf822d4a', 'Produk Rekayasa Keteknikan', '2026-02-09 20:05:46', NULL),
('a7bcd6c4-b6c5-4f51-8ee8-68b978a8b7a5', 'Inovasi teknologi dan industri', '2026-02-09 20:05:46', NULL),
('c8a5b679-d0a8-4a7e-b35d-351fd5f726a9', 'Obat Berbahan Alam', '2026-02-09 20:05:46', NULL),
('d3173e4a-f07f-45a1-93f1-2db468b19522', 'Multidisiplin & Lintas Sektor (Kebencanaan, Biodiversitas, Stunting, Lingkungan, Sumber Daya Air, Iklim)', '2026-02-09 20:05:46', NULL),
('db29f914-cf33-4692-8532-522a0aa96ab6', 'Energi', '2026-02-09 20:05:46', NULL),
('f4a3b5f7-8c5d-4a71-9b53-6ef620a43112', 'Ketahanan Pangan', '2026-02-09 20:05:46', NULL),
('fbc1b3a7-51e4-42b3-9a6b-d52d0c6b356c', 'Bidang Riset lainnya', '2026-02-09 20:05:46', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ref_komponen_biaya`
--

CREATE TABLE `ref_komponen_biaya` (
  `id` int UNSIGNED NOT NULL,
  `id_komponen_rab` int DEFAULT NULL,
  `jenis` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama_komponen` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keterangan` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ref_komponen_biaya`
--

INSERT INTO `ref_komponen_biaya` (`id`, `id_komponen_rab`, `jenis`, `nama_komponen`, `keterangan`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 6, 'HON', 'Honorarium Peneliti', 'Honor untuk ketua dan anggota tim peneliti dalam kegiatan penelitian', '2026-02-09 20:05:46', '2026-02-09 20:05:46', NULL),
(2, 1, 'BHN', 'Bahan Penelitian', 'Pembelian bahan habis pakai untuk kebutuhan laboratorium dan eksperimen penelitian', '2026-02-09 20:05:46', '2026-02-09 20:05:46', NULL),
(3, 2, 'OPS', 'Pengumpulan Data Lapangan', 'Biaya transportasi, akomodasi, dan peralatan lapangan dalam proses pengumpulan data penelitian', '2026-02-09 20:05:46', '2026-02-09 20:05:46', NULL),
(4, 4, 'ANL', 'Analisis Data', 'Biaya untuk pengolahan, analisis, dan interpretasi data hasil penelitian', '2026-02-09 20:05:46', '2026-02-09 20:05:46', NULL),
(5, 5, 'LRN', 'Pelaporan dan Luaran Penelitian', 'Biaya penyusunan laporan, publikasi jurnal, serta luaran wajib dan tambahan penelitian', '2026-02-09 20:05:46', '2026-02-09 20:05:46', NULL),
(6, 7, 'MDK', 'Teknologi dan Inovasi Pengabdian', 'Biaya penerapan teknologi dan inovasi untuk kegiatan pengabdian masyarakat', '2026-02-09 20:05:46', '2026-02-09 20:05:46', NULL),
(7, 8, 'LNP', 'Biaya Lainnya Pengabdian', 'Biaya tidak langsung untuk mendukung kelancaran pelaksanaan kegiatan pengabdian', '2026-02-09 20:05:46', '2026-02-09 20:05:46', NULL),
(8, 9, 'JSP', 'Upah dan Jasa Pengabdian', 'Biaya upah tenaga kerja atau jasa profesional dalam kegiatan pengabdian masyarakat', '2026-02-09 20:05:46', '2026-02-09 20:05:46', NULL),
(9, 10, 'PLT', 'Pelatihan Masyarakat', 'Biaya pelatihan, sosialisasi, dan workshop bagi masyarakat dalam kegiatan pengabdian', '2026-02-09 20:05:46', '2026-02-09 20:05:46', NULL),
(10, 11, 'PRJ', 'Perjalanan Dinas', 'Biaya transportasi, akomodasi, dan konsumsi untuk kegiatan penelitian dan pengabdian di luar kota', '2026-02-09 20:05:46', '2026-02-09 20:05:46', NULL),
(11, 12, 'UPJ', 'Upah dan Jasa Penunjang', 'Biaya jasa pendukung kegiatan seperti desain, dokumentasi, dan pembuatan media promosi pengabdian', '2026-02-09 20:05:46', '2026-02-09 20:05:46', NULL),
(12, 13, 'PLH', 'Pelatihan Tambahan', 'Biaya pelatihan tambahan untuk penguatan kapasitas masyarakat atau mitra pengabdian', '2026-02-09 20:05:46', '2026-02-09 20:05:46', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ref_perguruan_tinggi`
--

CREATE TABLE `ref_perguruan_tinggi` (
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_singkat` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_pt` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ref_perguruan_tinggi`
--

INSERT INTO `ref_perguruan_tinggi` (`uuid`, `nama`, `nama_singkat`, `id_pt`, `alamat`, `created_at`, `updated_at`) VALUES
('0a7f9626-2390-43a9-82fa-3ab87ff9a27b', 'Universitas Indonesia', 'UI', 'PT-002', 'Jl. Samudra Raya No. 45, Surabaya', '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
('17d65870-9cb3-49c7-a095-0ebe65a0be43', 'Institut Teknologi Bandung', 'ITB', 'PT-003', 'Jl. Angkasa No. 7, Bandung', '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
('6c3b1a2e-3f06-4ce6-9e3f-5f8b6f4a9a01', 'Universitas Pembangunan Nasional Veteran Jakarta', 'UPN', 'PT-001', 'Jl. Ilmiah No. 123, Jakarta', '2026-02-09 20:05:46', '2026-02-09 20:05:46');

-- --------------------------------------------------------

--
-- Table structure for table `ref_sdg`
--

CREATE TABLE `ref_sdg` (
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sdg` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ref_sdg`
--

INSERT INTO `ref_sdg` (`uuid`, `sdg`, `level`, `created_at`, `created_by`) VALUES
('09db2a35-d299-4606-b3e8-4127b159b715', 'Penanganan Perubahan Iklim', 13, '2026-02-09 20:05:46', NULL),
('0a3b9c76-8c82-4f94-9874-0914a65f78c0', 'Kota dan Pemukiman yang Berkelanjutan', 11, '2026-02-09 20:05:46', NULL),
('0bc0ed8e-03b6-4f35-adab-b1dfdddcbbc6', 'Pendidikan Berkualitas', 4, '2026-02-09 20:05:46', NULL),
('13d05d1d-f5ce-4b79-8b61-9d1c2d9ed7a3', 'Industri, Inovasi dan Infrastruktur', 9, '2026-02-09 20:05:46', NULL),
('19d64911-1d9c-48eb-85c4-50dbfad8473c', 'Energi Bersih dan Terjangkau', 7, '2026-02-09 20:05:46', NULL),
('442d2f16-bf8c-4b9a-9a09-2b157a4f4efb', 'Berkurangnya Kesenjangan', 10, '2026-02-09 20:05:46', NULL),
('64cfd1eb-f8a2-42cf-b59b-3a0f6f5d109f', 'Pekerjaan Layak dan Pertumbuhan Ekonomi', 8, '2026-02-09 20:05:46', NULL),
('82d65012-7f3b-4d09-bc72-11580a12553e', 'Kesetaraan Gender', 5, '2026-02-09 20:05:46', NULL),
('ad70b7b4-ec76-4a81-9e8c-2fce6b09d83f', 'Kehidupan Sehat dan Sejahtera', 3, '2026-02-09 20:05:46', NULL),
('b02ce966-49b1-4e89-944d-2bb3770a3489', 'Tanpa Kemiskinan', 1, '2026-02-09 20:05:46', NULL),
('b4d1ab62-1e27-41b2-bf61-f42a63e59162', 'Air Bersih dan Sanitasi Layak', 6, '2026-02-09 20:05:46', NULL),
('b8b7b344-8a12-46d9-936f-9e1a77a6d46c', 'Ekosistem Lautan', 14, '2026-02-09 20:05:46', NULL),
('bbbc5e3e-99b4-47f5-b51f-36ce079b06d8', 'Ekosistem Daratan', 15, '2026-02-09 20:05:46', NULL),
('c7f42799-d930-42f0-b76b-cb1e45250f62', 'Perdamaian, Keadilan dan Kelembagaan yang Tangguh', 16, '2026-02-09 20:05:46', NULL),
('c9b7a6e1-5374-40e8-a6fc-fc12a81b76db', 'Tanpa Kelaparan', 2, '2026-02-09 20:05:46', NULL),
('d69bc7d7-523a-4b9d-8e44-8b7d61e7c831', 'Tidak terkait', NULL, '2026-02-09 20:05:46', NULL),
('e0f7c6a3-bb9c-4c0b-8a3a-d07f2a4d39a4', 'Kemitraan untuk Mencapai Tujuan', 17, '2026-02-09 20:05:46', NULL),
('e1b7f436-87e5-4e54-84xb3-0e3b1830a82d', 'Konsumsi dan Produksi yang Bertanggung Jawab', 12, '2026-02-09 20:05:46', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ref_skema`
--

CREATE TABLE `ref_skema` (
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jenis_skema` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama_singkat` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `multi_tahun` tinyint(1) DEFAULT NULL,
  `biaya_minimal` double DEFAULT NULL,
  `biaya_maksimal` double DEFAULT NULL,
  `sumber_dana` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `anggota_min` int DEFAULT NULL,
  `anggota_max` int DEFAULT NULL,
  `mulai` date DEFAULT NULL,
  `selesai` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint UNSIGNED DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ref_skema`
--

INSERT INTO `ref_skema` (`uuid`, `jenis_skema`, `nama`, `nama_singkat`, `multi_tahun`, `biaya_minimal`, `biaya_maksimal`, `sumber_dana`, `anggota_min`, `anggota_max`, `mulai`, `selesai`, `created_at`, `created_by`, `updated_at`, `deleted_at`, `status`) VALUES
('34de00c7-1a1c-4cc9-8d07-98b236c9d399', 'Pengabdian', 'CS-COLL: KOLABORASI PENGABDIAN KEPADA MASYARAKAT FKLPPM', 'CS-COLL', 0, 40000000, 60000000, 'DRPM', 2, 4, '2025-03-01', '2025-09-30', '2026-02-09 20:05:46', NULL, '2026-02-09 20:05:46', NULL, 'aktif'),
('c79e1f30-4b3b-4a09-9a25-3e1fde12bd12', 'Penelitian', 'ECOLL: KOLABORASI RISET FKLPPM', 'ECOLL', 1, 60000000, 80000000, 'BKS-PTN-BARAT', 3, 5, '2025-01-01', '2025-12-31', '2026-02-09 20:05:46', NULL, '2026-02-09 20:05:46', NULL, 'aktif');

-- --------------------------------------------------------

--
-- Table structure for table `ref_tkt`
--

CREATE TABLE `ref_tkt` (
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tkt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ref_tkt`
--

INSERT INTO `ref_tkt` (`uuid`, `tkt`, `level`, `created_at`, `created_by`) VALUES
('0a6f5c39-1d0a-4741-9b39-381f31c31e8e', 'Validasi kode, komponen (breadboard validation) teknologi / hasil litbang dalam lingkungan laboratorium (terkontrol).', 4, '2026-02-09 20:05:46', NULL),
('2e17f73b-67a9-4f0b-9487-0459d88a6b11', 'Formulasi konsep atau aplikasi teknologi / hasil litbang telah dilakukan.', 2, '2026-02-09 20:05:46', NULL),
('3a13cafb-96f5-4e6a-9c83-2852db66b56f', 'Model atau prototipe sistem/subsistem telah didemonstrasikan/diuji dalam lingkungan (aplikasi) sebenarnya.', 7, '2026-02-09 20:05:46', NULL),
('7a8c2e5c-9455-4c9e-996a-1ca5bde42a55', 'Validasi kode, komponen (breadboard validation) teknologi / hasil litbang dalam lingkungan simulasi.', 5, '2026-02-09 20:05:46', NULL),
('9fd81a37-3a21-4821-aac6-0b22e2cf3b92', 'Sistem teknologi / hasil litbang berhasil (teruji dan terbukti) dalam penggunaan yang dituju (aplikasi sebenarnya).', 9, '2026-02-09 20:05:46', NULL),
('b4a24b37-3b22-4c92-a9f3-f2046f6d1a81', 'Sistem telah lengkap dan memenuhi syarat (qualified) melalui pengujian dalam lingkungan (aplikasi) sebenarnya.', 8, '2026-02-09 20:05:46', NULL),
('d1e3a4b1-1bca-4cb3-8c27-1cc11a2b7a01', 'Prinsip dasar teknologi / hasil litbang telah dipelajari (diteliti dan dilaporkan).', 1, '2026-02-09 20:05:46', NULL),
('fd3b21a9-0c89-4fe1-85a3-ed3f13d7a2fc', 'Telah dilakukan pengujian analitis dan eksperimen untuk membuktikan konsep (proof-of-concept) teknologi / hasil litbang.', 3, '2026-02-09 20:05:46', NULL),
('ff61b2ae-1fcb-4927-b2f8-51a2e27c7e5e', 'Model atau prototipe sistem/subsistem telah didemonstrasikan/diuji dalam suatu lingkungan yang relevan.', 6, '2026-02-09 20:05:46', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'super-admin', 'web', '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
(2, 'admin-pt', 'web', '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
(3, 'ketua-lppm', 'web', '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
(4, 'dosen', 'web', '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
(5, 'reviewer', 'web', '2026-02-09 20:05:46', '2026-02-09 20:05:46');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(4, 1),
(5, 1),
(7, 1),
(8, 1),
(9, 1),
(1, 2),
(4, 2),
(5, 2),
(6, 2),
(7, 2),
(1, 3),
(4, 3),
(1, 4),
(2, 4),
(3, 4),
(1, 5),
(10, 5);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'dosen',
  `uuid_pt` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text COLLATE utf8mb4_unicode_ci,
  `two_factor_recovery_codes` text COLLATE utf8mb4_unicode_ci,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `uuid_pt`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Super Admin', 'superadmin@example.com', 'super-admin', NULL, '2026-02-09 20:05:46', '$2y$12$xua/WjkpzfArzXtCNbtUiO85mE1XZ9jeMuotGUmCTVozwcjTIlEhK', NULL, NULL, NULL, NULL, '2026-02-09 20:05:46', '2026-02-09 20:05:46'),
(2, 'Admin PT UCN', 'adminpt.ucn@example.com', 'admin-pt', '6c3b1a2e-3f06-4ce6-9e3f-5f8b6f4a9a01', '2026-02-09 20:05:47', '$2y$12$uSOxhpfVXGUC42DIHMoBuOiDrPdiTsDXXJLtf0e/Nq0gOkBr6NO5q', NULL, NULL, NULL, NULL, '2026-02-09 20:05:47', '2026-02-09 20:05:47'),
(3, 'Admin PT ITS', 'adminpt.its@example.com', 'admin-pt', '0a7f9626-2390-43a9-82fa-3ab87ff9a27b', '2026-02-09 20:05:47', '$2y$12$DoVehBjfulDb3PbdYzv4I.Zj8WnYArmCj/QRuOK86clKJGv.Ze0jW', NULL, NULL, NULL, NULL, '2026-02-09 20:05:47', '2026-02-09 20:05:47'),
(4, 'Admin PT POLNA', 'adminpt.polna@example.com', 'admin-pt', '17d65870-9cb3-49c7-a095-0ebe65a0be43', '2026-02-09 20:05:47', '$2y$12$KxwrcKp1t.LWiK1iWHeQvOkEXVdcwTcThBnt1l39N4pXWh/tFkcCq', NULL, NULL, NULL, NULL, '2026-02-09 20:05:47', '2026-02-09 20:05:47'),
(5, 'Ketua LPPM UCN', 'ketua.lppm.ucn@example.com', 'ketua-lppm', '6c3b1a2e-3f06-4ce6-9e3f-5f8b6f4a9a01', '2026-02-09 20:05:47', '$2y$12$U2qus3/CbDnSakg.zJ2UoelcjZiBingYIo0KA0hbVgPauybSdJgne', NULL, NULL, NULL, NULL, '2026-02-09 20:05:47', '2026-02-09 20:05:47'),
(6, 'Reviewer Demo', 'reviewer@example.com', 'reviewer', NULL, '2026-02-09 20:05:48', '$2y$12$ZJ/TvAW/Un37nbmqUgteS.Ri5TbUw.PwfFQfDTF5.8dnXyhP7sCLi', NULL, NULL, NULL, NULL, '2026-02-09 20:05:48', '2026-02-09 20:05:48'),
(7, 'Dr. Andi Pratama', 'andi.pratama@example.com', 'dosen', '6c3b1a2e-3f06-4ce6-9e3f-5f8b6f4a9a01', '2026-02-09 20:05:48', '$2y$12$oHHB6rcwvXUF/.MnmRuY1.fb8QbUjdY3BLCqWvid9igQgo/oMfYCi', NULL, NULL, NULL, NULL, '2026-02-09 20:05:48', '2026-02-09 20:05:48'),
(8, 'Prof. Siti Rahma', 'siti.rahma@example.com', 'dosen', '0a7f9626-2390-43a9-82fa-3ab87ff9a27b', '2026-02-09 20:05:48', '$2y$12$wRzf0RTYb1a1M1DImzAabeTMVPiO4yygZ.Ij8pWqBARrdpNmMy9wu', NULL, NULL, NULL, NULL, '2026-02-09 20:05:48', '2026-02-09 20:05:48'),
(9, 'Ir. Budi Santoso', 'budi.santoso@example.com', 'dosen', '17d65870-9cb3-49c7-a095-0ebe65a0be43', '2026-02-09 20:05:48', '$2y$12$s92Rrw6R8bt6RyWcmDc18uP.1nwY.EglcP5Hbe8fPo3Cy46.JcbAK', NULL, NULL, NULL, NULL, '2026-02-09 20:05:48', '2026-02-09 20:05:48'),
(10, 'Sri Lestari Wahyuningroem', 'swahyuningroem@upnvj.ac.id', 'dosen', '6c3b1a2e-3f06-4ce6-9e3f-5f8b6f4a9a01', '2026-02-09 20:05:48', '$2y$12$EL6t.VXr3/yYj8t1uW9ICeukxoAQaEuDCPXlGgbsGrt2JrteY2PZO', NULL, NULL, NULL, NULL, '2026-02-09 20:05:48', '2026-02-09 20:05:48');

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
  ADD KEY `dosen_uuid_pt_foreign` (`uuid_pt`);

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
  ADD KEY `pt_penelitian_uuid_pt_foreign` (`uuid_pt`);

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
-- Indexes for table `ref_fokus`
--
ALTER TABLE `ref_fokus`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `ref_fokus_created_by_foreign` (`created_by`);

--
-- Indexes for table `ref_komponen_biaya`
--
ALTER TABLE `ref_komponen_biaya`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ref_perguruan_tinggi`
--
ALTER TABLE `ref_perguruan_tinggi`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `ref_sdg`
--
ALTER TABLE `ref_sdg`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `ref_sdg_created_by_foreign` (`created_by`);

--
-- Indexes for table `ref_skema`
--
ALTER TABLE `ref_skema`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `ref_skema_created_by_foreign` (`created_by`);

--
-- Indexes for table `ref_tkt`
--
ALTER TABLE `ref_tkt`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `ref_tkt_created_by_foreign` (`created_by`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lppm_profiles`
--
ALTER TABLE `lppm_profiles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `pt_penelitian_anggotas`
--
ALTER TABLE `pt_penelitian_anggotas`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pt_penelitian_anggota_approvals`
--
ALTER TABLE `pt_penelitian_anggota_approvals`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pt_penelitian_reviewer`
--
ALTER TABLE `pt_penelitian_reviewer`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pt_penelitian_reviews`
--
ALTER TABLE `pt_penelitian_reviews`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pt_rab_tahun_1`
--
ALTER TABLE `pt_rab_tahun_1`
  MODIFY `uuid` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pt_rab_tahun_2`
--
ALTER TABLE `pt_rab_tahun_2`
  MODIFY `uuid` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pt_rab_tahun_3`
--
ALTER TABLE `pt_rab_tahun_3`
  MODIFY `uuid` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pt_rab_tahun_4`
--
ALTER TABLE `pt_rab_tahun_4`
  MODIFY `uuid` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ref_komponen_biaya`
--
ALTER TABLE `ref_komponen_biaya`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
-- Constraints for table `ref_fokus`
--
ALTER TABLE `ref_fokus`
  ADD CONSTRAINT `ref_fokus_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
