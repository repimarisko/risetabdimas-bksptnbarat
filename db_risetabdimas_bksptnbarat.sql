-- MySQL dump 10.13  Distrib 9.4.0, for macos26.0 (arm64)
--
-- Host: localhost    Database: db_risetabdimas_bksptnbarat
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dosen`
--

DROP TABLE IF EXISTS `dosen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dosen` (
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nidn` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_user` bigint unsigned NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid_pt` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `verified_at` timestamp NULL DEFAULT NULL,
  `verified_by` bigint unsigned DEFAULT NULL,
  `created_by` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `dosen_email_unique` (`email`),
  KEY `dosen_id_user_foreign` (`id_user`),
  KEY `dosen_verified_by_foreign` (`verified_by`),
  KEY `dosen_created_by_foreign` (`created_by`),
  KEY `dosen_uuid_pt_foreign` (`uuid_pt`),
  CONSTRAINT `dosen_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `dosen_id_user_foreign` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `dosen_uuid_pt_foreign` FOREIGN KEY (`uuid_pt`) REFERENCES `ref_perguruan_tinggi` (`uuid`) ON DELETE CASCADE,
  CONSTRAINT `dosen_verified_by_foreign` FOREIGN KEY (`verified_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dosen`
--

LOCK TABLES `dosen` WRITE;
/*!40000 ALTER TABLE `dosen` DISABLE KEYS */;
INSERT INTO `dosen` VALUES ('1b49c744-78fc-458d-bbdb-edf67b5162de','0123456789',7,'andi.pratama@example.com','6c3b1a2e-3f06-4ce6-9e3f-5f8b6f4a9a01','2026-02-05 02:35:01',7,7,'2026-02-05 02:35:01'),('48043b04-3b70-455d-8161-865bc46a5afc','1122334455',9,'budi.santoso@example.com','17d65870-9cb3-49c7-a095-0ebe65a0be43','2026-02-05 02:35:02',9,9,'2026-02-05 02:35:02'),('6efef392-160c-49de-a623-ed17ba587107','9876543210',8,'siti.rahma@example.com','0a7f9626-2390-43a9-82fa-3ab87ff9a27b','2026-02-05 02:35:02',8,8,'2026-02-05 02:35:02');
/*!40000 ALTER TABLE `dosen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lppm_profiles`
--

DROP TABLE IF EXISTS `lppm_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lppm_profiles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
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
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lppm_profiles_uuid_pt_unique` (`uuid_pt`),
  CONSTRAINT `lppm_profiles_uuid_pt_foreign` FOREIGN KEY (`uuid_pt`) REFERENCES `ref_perguruan_tinggi` (`uuid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lppm_profiles`
--

LOCK TABLES `lppm_profiles` WRITE;
/*!40000 ALTER TABLE `lppm_profiles` DISABLE KEYS */;
/*!40000 ALTER TABLE `lppm_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_permission`
--

DROP TABLE IF EXISTS `menu_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_permission` (
  `menu_id` bigint unsigned NOT NULL,
  `permission_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`menu_id`,`permission_id`),
  KEY `menu_permission_permission_id_foreign` (`permission_id`),
  CONSTRAINT `menu_permission_menu_id_foreign` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE,
  CONSTRAINT `menu_permission_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_permission`
--

LOCK TABLES `menu_permission` WRITE;
/*!40000 ALTER TABLE `menu_permission` DISABLE KEYS */;
INSERT INTO `menu_permission` VALUES (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10);
/*!40000 ALTER TABLE `menu_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menus`
--

DROP TABLE IF EXISTS `menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menus` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `href` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` bigint unsigned DEFAULT NULL,
  `sort` int unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `menus_slug_unique` (`slug`),
  KEY `menus_parent_id_foreign` (`parent_id`),
  CONSTRAINT `menus_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menus`
--

LOCK TABLES `menus` WRITE;
/*!40000 ALTER TABLE `menus` DISABLE KEYS */;
INSERT INTO `menus` VALUES (1,'Dashboard','dashboard','/dashboard',NULL,NULL,1,'2026-02-05 02:35:00','2026-02-05 02:35:00'),(2,'Usulan Penelitian','pt-penelitian','/pt-penelitian',NULL,NULL,2,'2026-02-05 02:35:00','2026-02-05 02:35:00'),(3,'Perbaikan Usulan Penelitian','pt-penelitian-perbaikan','/pt-penelitian/perbaikan',NULL,NULL,3,'2026-02-05 02:35:00','2026-02-05 02:35:00'),(4,'Usulan Penelitian (Admin PT)','admin-pt-penelitian','/admin/pt-penelitian',NULL,NULL,4,'2026-02-05 02:35:00','2026-02-05 02:35:00'),(5,'Plotting Reviewer','assign-reviewer','/admin/pt-penelitian/assign-reviewer',NULL,NULL,5,'2026-02-05 02:35:00','2026-02-05 02:35:00'),(6,'Approve Akun Baru','users-approvals','/users/approvals',NULL,NULL,6,'2026-02-05 02:35:00','2026-02-05 02:35:00'),(7,'Skema Aktif','pt-skema','/admin/pt-skema',NULL,NULL,7,'2026-02-05 02:35:00','2026-02-05 02:35:00'),(8,'Role Assignment','role-assignment','/settings/role-assignment',NULL,NULL,8,'2026-02-05 02:35:00','2026-02-05 02:35:00'),(9,'Menu Settings','settings-menus','/settings/menus',NULL,NULL,9,'2026-02-05 02:35:00','2026-02-05 02:35:00'),(10,'Review Proposal','reviewer-dashboard','/reviewer/pt-penelitian',NULL,NULL,10,'2026-02-05 02:35:00','2026-02-05 02:35:00');
/*!40000 ALTER TABLE `menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2025_08_26_100418_add_two_factor_columns_to_users_table',1),(5,'2025_11_02_033510_create_permission_tables',1),(6,'2025_11_02_033600_create_penelitian_reference_tables',1),(7,'2025_11_02_033645_pt_penelitian',1),(8,'2025_11_02_033700_create_pt_rab_tables',1),(9,'2025_11_02_053206_create_ref_perguruan_tinggi_and_dosen_tables',1),(10,'2025_11_02_053300_add_role_to_users_table',1),(11,'2025_11_02_060000_add_document_columns_to_pt_penelitian_table',1),(12,'2025_11_02_070000_create_pt_penelitian_anggotas_table',1),(13,'2025_11_02_070500_add_uuid_pt_to_users_table',1),(14,'2025_11_02_070600_add_uuid_pt_to_pt_penelitian_table',1),(15,'2025_11_02_080000_create_pt_penelitian_anggota_approvals_table',1),(16,'2025_11_05_000000_create_lppm_profiles_table',1),(17,'2025_12_10_000000_add_updated_at_to_pt_penelitian_table',1),(18,'2025_12_10_010000_create_pt_penelitian_reviews_table',1),(19,'2025_12_10_020000_create_pt_penelitian_reviewer_table',1),(20,'2025_12_12_134200_create_menus_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_permissions`
--

DROP TABLE IF EXISTS `model_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_permissions`
--

LOCK TABLES `model_has_permissions` WRITE;
/*!40000 ALTER TABLE `model_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_roles`
--

DROP TABLE IF EXISTS `model_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_roles` (
  `role_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_roles`
--

LOCK TABLES `model_has_roles` WRITE;
/*!40000 ALTER TABLE `model_has_roles` DISABLE KEYS */;
INSERT INTO `model_has_roles` VALUES (1,'App\\Models\\User',1),(2,'App\\Models\\User',2),(2,'App\\Models\\User',3),(2,'App\\Models\\User',4),(3,'App\\Models\\User',5),(5,'App\\Models\\User',6),(4,'App\\Models\\User',7),(4,'App\\Models\\User',8),(4,'App\\Models\\User',9);
/*!40000 ALTER TABLE `model_has_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'menu.dashboard','web','2026-02-05 02:35:00','2026-02-05 02:35:00'),(2,'menu.pt-penelitian','web','2026-02-05 02:35:00','2026-02-05 02:35:00'),(3,'menu.pt-penelitian-perbaikan','web','2026-02-05 02:35:00','2026-02-05 02:35:00'),(4,'menu.admin-pt-penelitian','web','2026-02-05 02:35:00','2026-02-05 02:35:00'),(5,'menu.assign-reviewer','web','2026-02-05 02:35:00','2026-02-05 02:35:00'),(6,'menu.users-approvals','web','2026-02-05 02:35:00','2026-02-05 02:35:00'),(7,'menu.pt-skema','web','2026-02-05 02:35:00','2026-02-05 02:35:00'),(8,'menu.role-assignment','web','2026-02-05 02:35:00','2026-02-05 02:35:00'),(9,'menu.settings-menus','web','2026-02-05 02:35:00','2026-02-05 02:35:00'),(10,'menu.reviewer-dashboard','web','2026-02-05 02:35:00','2026-02-05 02:35:00');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_penelitian`
--

DROP TABLE IF EXISTS `pt_penelitian`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  `created_by` bigint unsigned DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `deleted_by` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `pt_penelitian_created_by_foreign` (`created_by`),
  KEY `pt_penelitian_deleted_by_foreign` (`deleted_by`),
  KEY `pt_penelitian_id_skema_foreign` (`id_skema`),
  KEY `pt_penelitian_id_tkt_foreign` (`id_tkt`),
  KEY `pt_penelitian_id_sdg_foreign` (`id_sdg`),
  KEY `pt_penelitian_id_fokus_foreign` (`id_fokus`),
  KEY `pt_penelitian_uuid_pt_foreign` (`uuid_pt`),
  CONSTRAINT `pt_penelitian_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `pt_penelitian_deleted_by_foreign` FOREIGN KEY (`deleted_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `pt_penelitian_id_fokus_foreign` FOREIGN KEY (`id_fokus`) REFERENCES `ref_fokus` (`uuid`),
  CONSTRAINT `pt_penelitian_id_sdg_foreign` FOREIGN KEY (`id_sdg`) REFERENCES `ref_sdg` (`uuid`),
  CONSTRAINT `pt_penelitian_id_skema_foreign` FOREIGN KEY (`id_skema`) REFERENCES `ref_skema` (`uuid`),
  CONSTRAINT `pt_penelitian_id_tkt_foreign` FOREIGN KEY (`id_tkt`) REFERENCES `ref_tkt` (`uuid`),
  CONSTRAINT `pt_penelitian_uuid_pt_foreign` FOREIGN KEY (`uuid_pt`) REFERENCES `ref_perguruan_tinggi` (`uuid`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_penelitian`
--

LOCK TABLES `pt_penelitian` WRITE;
/*!40000 ALTER TABLE `pt_penelitian` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_penelitian` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_penelitian_anggota_approvals`
--

DROP TABLE IF EXISTS `pt_penelitian_anggota_approvals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pt_penelitian_anggota_approvals` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `anggota_id` bigint unsigned NOT NULL,
  `dosen_uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','approved') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `approved_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pt_penelitian_anggota_approvals_anggota_id_dosen_uuid_unique` (`anggota_id`,`dosen_uuid`),
  KEY `pt_penelitian_anggota_approvals_dosen_uuid_foreign` (`dosen_uuid`),
  CONSTRAINT `pt_penelitian_anggota_approvals_anggota_id_foreign` FOREIGN KEY (`anggota_id`) REFERENCES `pt_penelitian_anggotas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `pt_penelitian_anggota_approvals_dosen_uuid_foreign` FOREIGN KEY (`dosen_uuid`) REFERENCES `dosen` (`uuid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_penelitian_anggota_approvals`
--

LOCK TABLES `pt_penelitian_anggota_approvals` WRITE;
/*!40000 ALTER TABLE `pt_penelitian_anggota_approvals` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_penelitian_anggota_approvals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_penelitian_anggotas`
--

DROP TABLE IF EXISTS `pt_penelitian_anggotas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pt_penelitian_anggotas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `penelitian_uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dosen_uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `peran` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tugas` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `penelitian_dosen_peran_unique` (`penelitian_uuid`,`dosen_uuid`,`peran`),
  KEY `pt_penelitian_anggotas_dosen_uuid_foreign` (`dosen_uuid`),
  CONSTRAINT `pt_penelitian_anggotas_dosen_uuid_foreign` FOREIGN KEY (`dosen_uuid`) REFERENCES `dosen` (`uuid`) ON DELETE CASCADE,
  CONSTRAINT `pt_penelitian_anggotas_penelitian_uuid_foreign` FOREIGN KEY (`penelitian_uuid`) REFERENCES `pt_penelitian` (`uuid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_penelitian_anggotas`
--

LOCK TABLES `pt_penelitian_anggotas` WRITE;
/*!40000 ALTER TABLE `pt_penelitian_anggotas` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_penelitian_anggotas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_penelitian_reviewer`
--

DROP TABLE IF EXISTS `pt_penelitian_reviewer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pt_penelitian_reviewer` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `penelitian_uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reviewer_id` bigint unsigned NOT NULL,
  `assigned_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pt_penelitian_reviewer_penelitian_uuid_reviewer_id_unique` (`penelitian_uuid`,`reviewer_id`),
  KEY `pt_penelitian_reviewer_reviewer_id_foreign` (`reviewer_id`),
  CONSTRAINT `pt_penelitian_reviewer_penelitian_uuid_foreign` FOREIGN KEY (`penelitian_uuid`) REFERENCES `pt_penelitian` (`uuid`) ON DELETE CASCADE,
  CONSTRAINT `pt_penelitian_reviewer_reviewer_id_foreign` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_penelitian_reviewer`
--

LOCK TABLES `pt_penelitian_reviewer` WRITE;
/*!40000 ALTER TABLE `pt_penelitian_reviewer` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_penelitian_reviewer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_penelitian_reviews`
--

DROP TABLE IF EXISTS `pt_penelitian_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pt_penelitian_reviews` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `penelitian_uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reviewer_id` bigint unsigned NOT NULL,
  `rekomendasi` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skor_kualitas` tinyint unsigned DEFAULT NULL,
  `skor_rab` tinyint unsigned DEFAULT NULL,
  `catatan_umum` text COLLATE utf8mb4_unicode_ci,
  `catatan_rab` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pt_penelitian_reviews_penelitian_uuid_reviewer_id_unique` (`penelitian_uuid`,`reviewer_id`),
  KEY `pt_penelitian_reviews_reviewer_id_foreign` (`reviewer_id`),
  CONSTRAINT `pt_penelitian_reviews_penelitian_uuid_foreign` FOREIGN KEY (`penelitian_uuid`) REFERENCES `pt_penelitian` (`uuid`) ON DELETE CASCADE,
  CONSTRAINT `pt_penelitian_reviews_reviewer_id_foreign` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_penelitian_reviews`
--

LOCK TABLES `pt_penelitian_reviews` WRITE;
/*!40000 ALTER TABLE `pt_penelitian_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_penelitian_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_rab_tahun_1`
--

DROP TABLE IF EXISTS `pt_rab_tahun_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pt_rab_tahun_1` (
  `uuid` int unsigned NOT NULL AUTO_INCREMENT,
  `id_penelitian` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_komponen` int unsigned DEFAULT NULL,
  `nama_item` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jumlah_item` double DEFAULT NULL,
  `harga_satuan` double DEFAULT NULL,
  `total_biaya` double DEFAULT NULL,
  `id_satuan` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `pt_rab_tahun_1_id_penelitian_foreign` (`id_penelitian`),
  KEY `pt_rab_tahun_1_id_komponen_foreign` (`id_komponen`),
  CONSTRAINT `pt_rab_tahun_1_id_komponen_foreign` FOREIGN KEY (`id_komponen`) REFERENCES `ref_komponen_biaya` (`id`),
  CONSTRAINT `pt_rab_tahun_1_id_penelitian_foreign` FOREIGN KEY (`id_penelitian`) REFERENCES `pt_penelitian` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_rab_tahun_1`
--

LOCK TABLES `pt_rab_tahun_1` WRITE;
/*!40000 ALTER TABLE `pt_rab_tahun_1` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_rab_tahun_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_rab_tahun_2`
--

DROP TABLE IF EXISTS `pt_rab_tahun_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pt_rab_tahun_2` (
  `uuid` int unsigned NOT NULL AUTO_INCREMENT,
  `id_penelitian` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_komponen` int unsigned DEFAULT NULL,
  `nama_item` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jumlah_item` double DEFAULT NULL,
  `harga_satuan` double DEFAULT NULL,
  `total_biaya` double DEFAULT NULL,
  `id_satuan` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `pt_rab_tahun_2_id_penelitian_foreign` (`id_penelitian`),
  KEY `pt_rab_tahun_2_id_komponen_foreign` (`id_komponen`),
  CONSTRAINT `pt_rab_tahun_2_id_komponen_foreign` FOREIGN KEY (`id_komponen`) REFERENCES `ref_komponen_biaya` (`id`),
  CONSTRAINT `pt_rab_tahun_2_id_penelitian_foreign` FOREIGN KEY (`id_penelitian`) REFERENCES `pt_penelitian` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_rab_tahun_2`
--

LOCK TABLES `pt_rab_tahun_2` WRITE;
/*!40000 ALTER TABLE `pt_rab_tahun_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_rab_tahun_2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_rab_tahun_3`
--

DROP TABLE IF EXISTS `pt_rab_tahun_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pt_rab_tahun_3` (
  `uuid` int unsigned NOT NULL AUTO_INCREMENT,
  `id_penelitian` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_komponen` int unsigned DEFAULT NULL,
  `nama_item` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jumlah_item` double DEFAULT NULL,
  `harga_satuan` double DEFAULT NULL,
  `total_biaya` double DEFAULT NULL,
  `id_satuan` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `pt_rab_tahun_3_id_penelitian_foreign` (`id_penelitian`),
  KEY `pt_rab_tahun_3_id_komponen_foreign` (`id_komponen`),
  CONSTRAINT `pt_rab_tahun_3_id_komponen_foreign` FOREIGN KEY (`id_komponen`) REFERENCES `ref_komponen_biaya` (`id`),
  CONSTRAINT `pt_rab_tahun_3_id_penelitian_foreign` FOREIGN KEY (`id_penelitian`) REFERENCES `pt_penelitian` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_rab_tahun_3`
--

LOCK TABLES `pt_rab_tahun_3` WRITE;
/*!40000 ALTER TABLE `pt_rab_tahun_3` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_rab_tahun_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_rab_tahun_4`
--

DROP TABLE IF EXISTS `pt_rab_tahun_4`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pt_rab_tahun_4` (
  `uuid` int unsigned NOT NULL AUTO_INCREMENT,
  `id_penelitian` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_komponen` int unsigned DEFAULT NULL,
  `nama_item` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jumlah_item` double DEFAULT NULL,
  `harga_satuan` double DEFAULT NULL,
  `total_biaya` double DEFAULT NULL,
  `id_satuan` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `pt_rab_tahun_4_id_penelitian_foreign` (`id_penelitian`),
  KEY `pt_rab_tahun_4_id_komponen_foreign` (`id_komponen`),
  CONSTRAINT `pt_rab_tahun_4_id_komponen_foreign` FOREIGN KEY (`id_komponen`) REFERENCES `ref_komponen_biaya` (`id`),
  CONSTRAINT `pt_rab_tahun_4_id_penelitian_foreign` FOREIGN KEY (`id_penelitian`) REFERENCES `pt_penelitian` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_rab_tahun_4`
--

LOCK TABLES `pt_rab_tahun_4` WRITE;
/*!40000 ALTER TABLE `pt_rab_tahun_4` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_rab_tahun_4` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ref_fokus`
--

DROP TABLE IF EXISTS `ref_fokus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_fokus` (
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fokus` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `ref_fokus_created_by_foreign` (`created_by`),
  CONSTRAINT `ref_fokus_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ref_fokus`
--

LOCK TABLES `ref_fokus` WRITE;
/*!40000 ALTER TABLE `ref_fokus` DISABLE KEYS */;
INSERT INTO `ref_fokus` VALUES ('0b8c3d45-5d68-48f7-9b54-00c8a4b7f42f','Kesehatan Obat','2026-02-05 02:35:00',NULL),('1e4b9b1c-42db-4d3d-80a2-5118f37a09bc','Hukum, politik dan civil society','2026-02-05 02:35:00',NULL),('2cdb8a1a-2359-4a2c-a7e1-889a1e4b8eab','Sosial Humaniora','2026-02-05 02:35:00',NULL),('38b9c247-ff65-4c98-9b93-49b5efc65d41','Inovasi Sains','2026-02-05 02:35:00',NULL),('40ff1ab6-d364-4eb4-b8ce-82d54d7f06e4','Inovasi teknologi mitigasi bencana','2026-02-05 02:35:00',NULL),('43f0d331-4d3f-4a67-85c4-124d5418bb61','Transportasi','2026-02-05 02:35:00',NULL),('6b582b79-76c1-4d6a-8121-9a1cbf4b0879','Pengembangan karakter bangsa','2026-02-05 02:35:00',NULL),('6d3a7e21-39cb-40a8-b8a5-ff732cf08ab4','Kemaritiman','2026-02-05 02:35:00',NULL),('8ad57e45-1a25-41b9-bc39-259f3b820d8a','Ekonomi dan Sumber Daya Manusia','2026-02-05 02:35:00',NULL),('8f9a2d7b-3569-4b11-8e7f-1f9a8b8e5f6b','Pertahanan dan Keamanan','2026-02-05 02:35:00',NULL),('9721b041-3a54-4975-80df-b796cf38bcdd','Gizi dan Kesehatan','2026-02-05 02:35:00',NULL),('a3d4c273-0162-49b4-b3c5-c2fdbf822d4a','Produk Rekayasa Keteknikan','2026-02-05 02:35:00',NULL),('a7bcd6c4-b6c5-4f51-8ee8-68b978a8b7a5','Inovasi teknologi dan industri','2026-02-05 02:35:00',NULL),('c8a5b679-d0a8-4a7e-b35d-351fd5f726a9','Obat Berbahan Alam','2026-02-05 02:35:00',NULL),('d3173e4a-f07f-45a1-93f1-2db468b19522','Multidisiplin & Lintas Sektor (Kebencanaan, Biodiversitas, Stunting, Lingkungan, Sumber Daya Air, Iklim)','2026-02-05 02:35:00',NULL),('db29f914-cf33-4692-8532-522a0aa96ab6','Energi','2026-02-05 02:35:00',NULL),('f4a3b5f7-8c5d-4a71-9b53-6ef620a43112','Ketahanan Pangan','2026-02-05 02:35:00',NULL),('fbc1b3a7-51e4-42b3-9a6b-d52d0c6b356c','Bidang Riset lainnya','2026-02-05 02:35:00',NULL);
/*!40000 ALTER TABLE `ref_fokus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ref_komponen_biaya`
--

DROP TABLE IF EXISTS `ref_komponen_biaya`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_komponen_biaya` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_komponen_rab` int DEFAULT NULL,
  `jenis` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama_komponen` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keterangan` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ref_komponen_biaya`
--

LOCK TABLES `ref_komponen_biaya` WRITE;
/*!40000 ALTER TABLE `ref_komponen_biaya` DISABLE KEYS */;
INSERT INTO `ref_komponen_biaya` VALUES (1,6,'HON','Honorarium Peneliti','Honor untuk ketua dan anggota tim peneliti dalam kegiatan penelitian','2026-02-05 02:35:00','2026-02-05 02:35:00',NULL),(2,1,'BHN','Bahan Penelitian','Pembelian bahan habis pakai untuk kebutuhan laboratorium dan eksperimen penelitian','2026-02-05 02:35:00','2026-02-05 02:35:00',NULL),(3,2,'OPS','Pengumpulan Data Lapangan','Biaya transportasi, akomodasi, dan peralatan lapangan dalam proses pengumpulan data penelitian','2026-02-05 02:35:00','2026-02-05 02:35:00',NULL),(4,4,'ANL','Analisis Data','Biaya untuk pengolahan, analisis, dan interpretasi data hasil penelitian','2026-02-05 02:35:00','2026-02-05 02:35:00',NULL),(5,5,'LRN','Pelaporan dan Luaran Penelitian','Biaya penyusunan laporan, publikasi jurnal, serta luaran wajib dan tambahan penelitian','2026-02-05 02:35:00','2026-02-05 02:35:00',NULL),(6,7,'MDK','Teknologi dan Inovasi Pengabdian','Biaya penerapan teknologi dan inovasi untuk kegiatan pengabdian masyarakat','2026-02-05 02:35:00','2026-02-05 02:35:00',NULL),(7,8,'LNP','Biaya Lainnya Pengabdian','Biaya tidak langsung untuk mendukung kelancaran pelaksanaan kegiatan pengabdian','2026-02-05 02:35:00','2026-02-05 02:35:00',NULL),(8,9,'JSP','Upah dan Jasa Pengabdian','Biaya upah tenaga kerja atau jasa profesional dalam kegiatan pengabdian masyarakat','2026-02-05 02:35:00','2026-02-05 02:35:00',NULL),(9,10,'PLT','Pelatihan Masyarakat','Biaya pelatihan, sosialisasi, dan workshop bagi masyarakat dalam kegiatan pengabdian','2026-02-05 02:35:00','2026-02-05 02:35:00',NULL),(10,11,'PRJ','Perjalanan Dinas','Biaya transportasi, akomodasi, dan konsumsi untuk kegiatan penelitian dan pengabdian di luar kota','2026-02-05 02:35:00','2026-02-05 02:35:00',NULL),(11,12,'UPJ','Upah dan Jasa Penunjang','Biaya jasa pendukung kegiatan seperti desain, dokumentasi, dan pembuatan media promosi pengabdian','2026-02-05 02:35:00','2026-02-05 02:35:00',NULL),(12,13,'PLH','Pelatihan Tambahan','Biaya pelatihan tambahan untuk penguatan kapasitas masyarakat atau mitra pengabdian','2026-02-05 02:35:00','2026-02-05 02:35:00',NULL);
/*!40000 ALTER TABLE `ref_komponen_biaya` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ref_perguruan_tinggi`
--

DROP TABLE IF EXISTS `ref_perguruan_tinggi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_perguruan_tinggi` (
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_singkat` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_pt` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ref_perguruan_tinggi`
--

LOCK TABLES `ref_perguruan_tinggi` WRITE;
/*!40000 ALTER TABLE `ref_perguruan_tinggi` DISABLE KEYS */;
INSERT INTO `ref_perguruan_tinggi` VALUES ('0a7f9626-2390-43a9-82fa-3ab87ff9a27b','Universitas Indonesia','UI','PT-002','Jl. Samudra Raya No. 45, Surabaya','2026-02-05 02:35:00','2026-02-05 02:35:00'),('17d65870-9cb3-49c7-a095-0ebe65a0be43','Institut Teknologi Bandung','ITB','PT-003','Jl. Angkasa No. 7, Bandung','2026-02-05 02:35:00','2026-02-05 02:35:00'),('6c3b1a2e-3f06-4ce6-9e3f-5f8b6f4a9a01','Universitas Pembangunan Nasional Veteran Jakarta','UPN','PT-001','Jl. Ilmiah No. 123, Jakarta','2026-02-05 02:35:00','2026-02-05 02:35:00');
/*!40000 ALTER TABLE `ref_perguruan_tinggi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ref_sdg`
--

DROP TABLE IF EXISTS `ref_sdg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_sdg` (
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sdg` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `ref_sdg_created_by_foreign` (`created_by`),
  CONSTRAINT `ref_sdg_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ref_sdg`
--

LOCK TABLES `ref_sdg` WRITE;
/*!40000 ALTER TABLE `ref_sdg` DISABLE KEYS */;
INSERT INTO `ref_sdg` VALUES ('09db2a35-d299-4606-b3e8-4127b159b715','Penanganan Perubahan Iklim',13,'2026-02-05 02:35:00',NULL),('0a3b9c76-8c82-4f94-9874-0914a65f78c0','Kota dan Pemukiman yang Berkelanjutan',11,'2026-02-05 02:35:00',NULL),('0bc0ed8e-03b6-4f35-adab-b1dfdddcbbc6','Pendidikan Berkualitas',4,'2026-02-05 02:35:00',NULL),('13d05d1d-f5ce-4b79-8b61-9d1c2d9ed7a3','Industri, Inovasi dan Infrastruktur',9,'2026-02-05 02:35:00',NULL),('19d64911-1d9c-48eb-85c4-50dbfad8473c','Energi Bersih dan Terjangkau',7,'2026-02-05 02:35:00',NULL),('442d2f16-bf8c-4b9a-9a09-2b157a4f4efb','Berkurangnya Kesenjangan',10,'2026-02-05 02:35:00',NULL),('64cfd1eb-f8a2-42cf-b59b-3a0f6f5d109f','Pekerjaan Layak dan Pertumbuhan Ekonomi',8,'2026-02-05 02:35:00',NULL),('82d65012-7f3b-4d09-bc72-11580a12553e','Kesetaraan Gender',5,'2026-02-05 02:35:00',NULL),('ad70b7b4-ec76-4a81-9e8c-2fce6b09d83f','Kehidupan Sehat dan Sejahtera',3,'2026-02-05 02:35:00',NULL),('b02ce966-49b1-4e89-944d-2bb3770a3489','Tanpa Kemiskinan',1,'2026-02-05 02:35:00',NULL),('b4d1ab62-1e27-41b2-bf61-f42a63e59162','Air Bersih dan Sanitasi Layak',6,'2026-02-05 02:35:00',NULL),('b8b7b344-8a12-46d9-936f-9e1a77a6d46c','Ekosistem Lautan',14,'2026-02-05 02:35:00',NULL),('bbbc5e3e-99b4-47f5-b51f-36ce079b06d8','Ekosistem Daratan',15,'2026-02-05 02:35:00',NULL),('c7f42799-d930-42f0-b76b-cb1e45250f62','Perdamaian, Keadilan dan Kelembagaan yang Tangguh',16,'2026-02-05 02:35:00',NULL),('c9b7a6e1-5374-40e8-a6fc-fc12a81b76db','Tanpa Kelaparan',2,'2026-02-05 02:35:00',NULL),('d69bc7d7-523a-4b9d-8e44-8b7d61e7c831','Tidak terkait',NULL,'2026-02-05 02:35:00',NULL),('e0f7c6a3-bb9c-4c0b-8a3a-d07f2a4d39a4','Kemitraan untuk Mencapai Tujuan',17,'2026-02-05 02:35:00',NULL),('e1b7f436-87e5-4e54-84xb3-0e3b1830a82d','Konsumsi dan Produksi yang Bertanggung Jawab',12,'2026-02-05 02:35:00',NULL);
/*!40000 ALTER TABLE `ref_sdg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ref_skema`
--

DROP TABLE IF EXISTS `ref_skema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  `created_by` bigint unsigned DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `ref_skema_created_by_foreign` (`created_by`),
  CONSTRAINT `ref_skema_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ref_skema`
--

LOCK TABLES `ref_skema` WRITE;
/*!40000 ALTER TABLE `ref_skema` DISABLE KEYS */;
INSERT INTO `ref_skema` VALUES ('34de00c7-1a1c-4cc9-8d07-98b236c9d399','Pengabdian','CS-COLL: KOLABORASI PENGABDIAN KEPADA MASYARAKAT FKLPPM','CS-COLL',0,40000000,60000000,'DRPM',2,4,'2025-03-01','2025-09-30','2026-02-05 02:35:00',NULL,'2026-02-05 02:35:00',NULL,'aktif'),('c79e1f30-4b3b-4a09-9a25-3e1fde12bd12','Penelitian','ECOLL: KOLABORASI RISET FKLPPM','ECOLL',1,60000000,80000000,'BKS-PTN-BARAT',3,5,'2025-01-01','2025-12-31','2026-02-05 02:35:00',NULL,'2026-02-05 02:35:00',NULL,'aktif');
/*!40000 ALTER TABLE `ref_skema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ref_tkt`
--

DROP TABLE IF EXISTS `ref_tkt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_tkt` (
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tkt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `ref_tkt_created_by_foreign` (`created_by`),
  CONSTRAINT `ref_tkt_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ref_tkt`
--

LOCK TABLES `ref_tkt` WRITE;
/*!40000 ALTER TABLE `ref_tkt` DISABLE KEYS */;
INSERT INTO `ref_tkt` VALUES ('0a6f5c39-1d0a-4741-9b39-381f31c31e8e','Validasi kode, komponen (breadboard validation) teknologi / hasil litbang dalam lingkungan laboratorium (terkontrol).',4,'2026-02-05 02:35:00',NULL),('2e17f73b-67a9-4f0b-9487-0459d88a6b11','Formulasi konsep atau aplikasi teknologi / hasil litbang telah dilakukan.',2,'2026-02-05 02:35:00',NULL),('3a13cafb-96f5-4e6a-9c83-2852db66b56f','Model atau prototipe sistem/subsistem telah didemonstrasikan/diuji dalam lingkungan (aplikasi) sebenarnya.',7,'2026-02-05 02:35:00',NULL),('7a8c2e5c-9455-4c9e-996a-1ca5bde42a55','Validasi kode, komponen (breadboard validation) teknologi / hasil litbang dalam lingkungan simulasi.',5,'2026-02-05 02:35:00',NULL),('9fd81a37-3a21-4821-aac6-0b22e2cf3b92','Sistem teknologi / hasil litbang berhasil (teruji dan terbukti) dalam penggunaan yang dituju (aplikasi sebenarnya).',9,'2026-02-05 02:35:00',NULL),('b4a24b37-3b22-4c92-a9f3-f2046f6d1a81','Sistem telah lengkap dan memenuhi syarat (qualified) melalui pengujian dalam lingkungan (aplikasi) sebenarnya.',8,'2026-02-05 02:35:00',NULL),('d1e3a4b1-1bca-4cb3-8c27-1cc11a2b7a01','Prinsip dasar teknologi / hasil litbang telah dipelajari (diteliti dan dilaporkan).',1,'2026-02-05 02:35:00',NULL),('fd3b21a9-0c89-4fe1-85a3-ed3f13d7a2fc','Telah dilakukan pengujian analitis dan eksperimen untuk membuktikan konsep (proof-of-concept) teknologi / hasil litbang.',3,'2026-02-05 02:35:00',NULL),('ff61b2ae-1fcb-4927-b2f8-51a2e27c7e5e','Model atau prototipe sistem/subsistem telah didemonstrasikan/diuji dalam suatu lingkungan yang relevan.',6,'2026-02-05 02:35:00',NULL);
/*!40000 ALTER TABLE `ref_tkt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_has_permissions`
--

DROP TABLE IF EXISTS `role_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_has_permissions`
--

LOCK TABLES `role_has_permissions` WRITE;
/*!40000 ALTER TABLE `role_has_permissions` DISABLE KEYS */;
INSERT INTO `role_has_permissions` VALUES (1,1),(4,1),(5,1),(7,1),(8,1),(9,1),(1,2),(4,2),(5,2),(6,2),(7,2),(1,3),(4,3),(1,4),(2,4),(3,4),(1,5),(10,5);
/*!40000 ALTER TABLE `role_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'super-admin','web','2026-02-05 02:35:00','2026-02-05 02:35:00'),(2,'admin-pt','web','2026-02-05 02:35:00','2026-02-05 02:35:00'),(3,'ketua-lppm','web','2026-02-05 02:35:00','2026-02-05 02:35:00'),(4,'dosen','web','2026-02-05 02:35:00','2026-02-05 02:35:00'),(5,'reviewer','web','2026-02-05 02:35:00','2026-02-05 02:35:00');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
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
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_uuid_pt_foreign` (`uuid_pt`),
  CONSTRAINT `users_uuid_pt_foreign` FOREIGN KEY (`uuid_pt`) REFERENCES `ref_perguruan_tinggi` (`uuid`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Super Admin','superadmin@example.com','super-admin',NULL,'2026-02-05 02:35:00','$2y$12$fJ/awb4QOLDS.lr/Gng6geTJU/WA5zrd.ZTpUBPMotQWLpzsn.BaG',NULL,NULL,NULL,NULL,'2026-02-05 02:35:00','2026-02-05 02:35:00'),(2,'Admin PT UCN','adminpt.ucn@example.com','admin-pt','6c3b1a2e-3f06-4ce6-9e3f-5f8b6f4a9a01','2026-02-05 02:35:00','$2y$12$mLhTTdIvQoyiaZ85wy7Hi.w5VFf3s9MDHy.mas5oOnh3uKJg0f7PG',NULL,NULL,NULL,NULL,'2026-02-05 02:35:00','2026-02-05 02:35:00'),(3,'Admin PT ITS','adminpt.its@example.com','admin-pt','0a7f9626-2390-43a9-82fa-3ab87ff9a27b','2026-02-05 02:35:01','$2y$12$Z0s2no0dYrjJywnjvbQS2ORjnPOG5Vpenivosr15Bxf2kAHdKhHuS',NULL,NULL,NULL,NULL,'2026-02-05 02:35:01','2026-02-05 02:35:01'),(4,'Admin PT POLNA','adminpt.polna@example.com','admin-pt','17d65870-9cb3-49c7-a095-0ebe65a0be43','2026-02-05 02:35:01','$2y$12$8yENmgw1eT1n2pJycUxlJOBlsRbwlsm3Dja1eXbur1JwUANCF7Goy',NULL,NULL,NULL,NULL,'2026-02-05 02:35:01','2026-02-05 02:35:01'),(5,'Ketua LPPM UCN','ketua.lppm.ucn@example.com','ketua-lppm','6c3b1a2e-3f06-4ce6-9e3f-5f8b6f4a9a01','2026-02-05 02:35:01','$2y$12$Z2EWWcC.eIAoMxV/7ttbPuQOntCVMzHn02Ia3O5UCmh67dFf3LBWK',NULL,NULL,NULL,NULL,'2026-02-05 02:35:01','2026-02-05 02:35:01'),(6,'Reviewer Demo','reviewer@example.com','reviewer',NULL,'2026-02-05 02:35:01','$2y$12$8sGcpaIU.9tMRRbVKD0ShO/o5FvY.rakQHxvEH/wOOWFbWojD4MSi',NULL,NULL,NULL,NULL,'2026-02-05 02:35:01','2026-02-05 02:35:01'),(7,'Dr. Andi Pratama','andi.pratama@example.com','dosen','6c3b1a2e-3f06-4ce6-9e3f-5f8b6f4a9a01','2026-02-05 02:35:01','$2y$12$VO1ukDKdl6oB6QrLbg/vou83ANAWe4Tw5ITD0h/rUWLNiwB.xUTiK',NULL,NULL,NULL,NULL,'2026-02-05 02:35:01','2026-02-05 02:35:01'),(8,'Prof. Siti Rahma','siti.rahma@example.com','dosen','0a7f9626-2390-43a9-82fa-3ab87ff9a27b','2026-02-05 02:35:02','$2y$12$eJ.71afdq/pWDE921DRMDOq7jQ8KKLNxFcKUYJ36dqcHWIYw/G4Pe',NULL,NULL,NULL,NULL,'2026-02-05 02:35:02','2026-02-05 02:35:02'),(9,'Ir. Budi Santoso','budi.santoso@example.com','dosen','17d65870-9cb3-49c7-a095-0ebe65a0be43','2026-02-05 02:35:02','$2y$12$AbeqAr.8Gg9ZBA5zeULRMeH.J1hbjaxXvoNdP/vw1FFW0sIB42yj6',NULL,NULL,NULL,NULL,'2026-02-05 02:35:02','2026-02-05 02:35:02');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-05 16:39:43
