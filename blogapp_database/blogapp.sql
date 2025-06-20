-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 21 Haz 2025, 01:13:06
-- Sunucu sürümü: 10.4.32-MariaDB
-- PHP Sürümü: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `blogapp`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `user_email`, `content`, `created_at`) VALUES
(1, 6, 'user@example.com', 'deneme yorum 1', '2025-01-15 23:31:51'),
(2, 6, 'omer4@gmail.com', 'deneme yorum 2', '2025-01-15 23:35:41'),
(3, 6, 'burak3@gmail.com', 'bu yorum bir deneme yorumudur aaa bbbb ccc', '2025-01-15 23:36:25'),
(4, 7, 'burak3@gmail.com', 'dsfzbdxgngsfxd', '2025-01-15 23:40:22'),
(5, 7, 'omer4@gmail.com', 'ccccc', '2025-01-15 23:40:33'),
(6, 7, 'omer4@gmail.com', 'jjjj', '2025-01-15 23:40:40'),
(7, 6, 'omer4@gmail.com', 'asd asd 123', '2025-01-15 23:40:48'),
(8, 5, 'omer4@gmail.com', 'd', '2025-01-15 23:56:28'),
(9, 7, 'elif@gmail.com', 'deneme yorumu', '2025-01-16 18:16:26'),
(10, 8, 'elif@gmail.com', 'deneme yorum 1', '2025-01-16 18:27:03'),
(11, 8, 'elif@gmail.com', 'deneme yorum 2', '2025-01-16 18:27:09'),
(12, 11, 'omer4@gmail.com', 'yorum 1', '2025-01-16 20:18:04'),
(13, 11, 'testt@gmail.com', 'deneme yorum', '2025-01-17 16:16:26'),
(14, 11, 'testt@gmail.com', 'dafdsds', '2025-01-17 16:16:32'),
(15, 12, 'omer11@gmail.com', 'asd', '2025-01-17 16:44:54'),
(16, 12, 'omer11@gmail.com', 'dfsgd', '2025-01-17 16:44:57'),
(17, 11, 'omer11@gmail.com', 'dfsgdsfsd', '2025-01-17 16:45:07'),
(18, 10, 'omer4@gmail.com', 'asd', '2025-01-17 17:10:49'),
(19, 12, 'test@gmail.com', 'deneme yeni 1', '2025-06-16 17:33:38'),
(20, 13, 'test@gmail.com', 'yeni eklenen posta yeni yorum', '2025-06-16 17:33:55'),
(21, 18, 'aziz@gmail.com', 'asdsadsa', '2025-06-16 18:47:29'),
(22, 16, 'aziz@gmail.com', 'aaaaaaaaaaaaaaaaaaaa', '2025-06-16 18:47:52'),
(23, 19, 'test21@gmail.com', 'dsdsf', '2025-06-19 20:32:51'),
(24, 9, 'test21@gmail.com', 'dddd', '2025-06-19 20:33:26'),
(25, 20, 'test34@gmail.com', 'dfsgfhfgfasdgfgf', '2025-06-19 20:34:44'),
(26, 20, 'test34@gmail.com', 'safdadsfgnh', '2025-06-19 20:34:47'),
(27, 19, 'test34@gmail.com', 'dsfgdsf', '2025-06-19 20:35:15'),
(28, 21, 'test55@gmail.com', 'sadsadsa', '2025-06-19 20:41:06'),
(29, 21, 'test55@gmail.com', 'dasddsadsa', '2025-06-19 20:41:09'),
(30, 20, 'test55@gmail.com', 'asdsadsadsad', '2025-06-19 20:41:16'),
(31, 19, 'test55@gmail.com', 'dasdsad', '2025-06-19 20:41:22');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `likes`
--

INSERT INTO `likes` (`id`, `post_id`, `user_email`, `created_at`) VALUES
(11, 6, 'omer4@gmail.com', '2025-01-15 23:56:14'),
(13, 7, 'omer4@gmail.com', '2025-01-15 23:56:20'),
(15, 5, 'elif@gmail.com', '2025-01-16 18:35:31'),
(17, 11, 'omer4@gmail.com', '2025-01-16 20:18:05'),
(18, 11, 'testt@gmail.com', '2025-01-17 16:16:19'),
(19, 10, 'testt@gmail.com', '2025-01-17 16:16:38'),
(20, 8, 'testt@gmail.com', '2025-01-17 16:16:43'),
(21, 11, 'omer11@gmail.com', '2025-01-17 16:44:27'),
(22, 10, 'omer11@gmail.com', '2025-01-17 16:44:29'),
(23, 8, 'omer11@gmail.com', '2025-01-17 16:44:32'),
(24, 12, 'omer11@gmail.com', '2025-01-17 16:44:52'),
(25, 5, 'omer11@gmail.com', '2025-01-17 16:45:28'),
(31, 13, 'test@gmail.com', '2025-06-16 17:46:15'),
(32, 12, 'test@gmail.com', '2025-06-16 17:46:19'),
(34, 16, 'aziz@gmail.com', '2025-06-16 18:26:38'),
(35, 15, 'aziz@gmail.com', '2025-06-16 18:26:42'),
(36, 14, 'aziz@gmail.com', '2025-06-16 18:26:46'),
(38, 19, 'test21@gmail.com', '2025-06-19 20:33:05'),
(39, 9, 'test21@gmail.com', '2025-06-19 20:33:12'),
(41, 16, 'test34@gmail.com', '2025-06-19 20:34:57'),
(42, 15, 'test34@gmail.com', '2025-06-19 20:35:02'),
(43, 21, 'test55@gmail.com', '2025-06-19 20:41:07'),
(44, 20, 'test55@gmail.com', '2025-06-19 20:41:13'),
(45, 19, 'test55@gmail.com', '2025-06-19 20:41:22'),
(46, 7, 'test55@gmail.com', '2025-06-19 20:41:59');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `posts`
--

INSERT INTO `posts` (`id`, `user_email`, `title`, `content`, `picture`, `created_at`) VALUES
(3, 'omer4@gmail.com', 'adsfxb', 'safdgfxg', '678823011e674_1010.png', '2025-01-15 21:05:05'),
(4, 'burak3@gmail.com', 'deneme 2', 'deneme 2 içerik', '678824acbcef5_Ekran görüntüsü 2022-03-31 134212.png', '2025-01-15 21:12:12'),
(5, 'omer4@gmail.com', 'deneme postu 3', 'deneme postu 3 içerik', '678824cc30726_Ekran görüntüsü 2022-03-19 224824.png', '2025-01-15 21:12:44'),
(6, 'burak3@gmail.com', 'deneme post 4 başlık', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '67882512b77e9_Ekran görüntüsü 2023-04-27 231418.png', '2025-01-15 21:13:54'),
(7, 'omer4@gmail.com', 'deneme 5', 'deneme 5 içerik  deneme 5 içerik  deneme 5 içerik  deneme 5 içerik  deneme 5 içerik', '6788411b21344_Ekran görüntüsü 2022-10-23 183026.png', '2025-01-15 23:13:31'),
(8, 'elif@gmail.com', 'en son 1', 'en son içerik 1', '67894d0e7ffff_Ekran görüntüsü 2024-07-29 005333.png', '2025-01-16 18:16:46'),
(9, 'elif@gmail.com', 'ankara', 'ankara içerik', '6789627910273_erp_1.png', '2025-01-16 19:48:09'),
(10, 'omer4@gmail.com', 'dfsagdsfhng 23', 'sdaf k jb h yuv kyv v uasvjhfavj fvakshvf jhas vjhvasfjsav jv  vkahsjv', '6789684e08bf0_IMG-20211119-WA0011.jpg', '2025-01-16 20:13:02'),
(11, 'omer4@gmail.com', 'gönderi 1', 'gönderi 1 içerik 1 gönderi 1 içerik 1 gönderi 1 içerik 1 gönderi 1 içerik 1 gönderi 1 içerik 1 gönderi 1 içerik 1 gönderi 1 içerik 1 gönderi 1 içerik 1 gönderi 1 içerik 1 gönderi 1 içerik 1 gönderi 1 içerik 1 gönderi 1 içerik 1 gönderi 1 içerik 1 gönderi 1 içerik 1 gönderi 1 içerik 1 gönderi 1 içerik 1 gönderi 1 içerik 1 gönderi 1 içerik 1 gönderi 1 içerik 1 gönderi 1 içerik 1 gönderi 1 içerik 1', '67896956642c5_2021-11-15.png', '2025-01-16 20:17:26'),
(12, 'omer11@gmail.com', 'QQQQQQ', 'QQQQQQQ', '678a89014dc93_2021-11-07 (4).png', '2025-01-17 16:44:49'),
(13, 'test@gmail.com', 'yeni eklenen post1', 'yeni eklenen içerik yeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikWelcome to Gboard clipboard, any text you copy will be saved here.Welcome to Gboard clipboard, any text you copy will be saved here.Welcome to Gboard clipboard, any text you copy will be saved here.Welcome to Gboard clipboard, any text you copy will be saved here.Welcome to Gboard clipboard, any text you copy will be saved here.Welcome to Gboard clipboard, any text you copy will be saved here.Welcome to Gboard clipboard, any text you copy will be saved here.Welcome to Gboard clipboard, any text you copy will be saved here.Welcome to Gboard clipboard, any text you copy will be saved here.Welcome to Gboard clipboard, any text you copy will be saved here.Welcome to Gboard clipboard, any text you copy will be saved here.', '680ec588530e0_photo.jpg', '2025-04-28 00:02:16'),
(14, 'test@gmail.com', 'yeni eklenen post 2', 'yeni eklenen içerik yeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikyeni eklenen içerikWelcome to Gboard clipboard, any text you copy will be saved here.Welcome to Gboard clipboard, any text you copy will be saved here.Welcome to Gboard clipboard, any text you copy will be saved here.Welcome to Gboard clipboard, any text you copy will be saved here.Welcome to Gboard clipboard, any text you copy will be saved here.Welcome to Gboard clipboard, any text you copy will be saved here.Welcome to Gboard clipboard, any text you copy will be saved here.Welcome to Gboard clipboard, any text you copy will be saved here.Welcome to Gboard clipboard, any text you copy will be saved here.Welcome to Gboard clipboard, any text you copy will be saved here.Welcome to Gboard clipboard, any text you copy will be saved here.', '680ec6d1d5e19_photo.jpg', '2025-04-28 00:07:45'),
(15, 'omer22@gmail.com', 'yeni eklenen post 3', 'ierik', '680f31315b4e9_photo.jpg', '2025-04-28 07:41:37'),
(16, 'test@gmail.com', 'wefdadf', 'dsfdsafdsf', '680f363eada57_photo.jpg', '2025-04-28 08:03:10'),
(17, 'aziz@gmail.com', 'Baslik Aziz 1', 'Aziz icerik 1 Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1Aziz icerik 1', '685061d48397a_photo.jpg', '2025-06-16 18:26:28'),
(18, 'aziz@gmail.com', 'Baslik Aziz 2', 'ziz icerik2 aziz icerik 2 ziz icerik2 aziz icerik 2 ziz icerik2 aziz icerik 2 ziz icerik2 aziz icerik 2 ziz icerik2 aziz icerik 2 ziz icerik2 aziz icerik 2 ziz icerik2 aziz icerik 2 ziz icerik2 aziz icerik 2 ziz icerik2 aziz icerik 2 ziz icerik2 aziz icerik 2', '685065eb4d045_photo.jpg', '2025-06-16 18:43:55'),
(19, 'test21@gmail.com', 'asddasfd', 'adsfdsfds', '685473ebed72a_photo.jpg', '2025-06-19 20:32:43'),
(20, 'test34@gmail.com', 'deneme 34', 'sadfafdsfdsfgdsa', '6854745d929c7_photo.jpg', '2025-06-19 20:34:37'),
(21, 'test55@gmail.com', '55 balk', 'dsafdsfdsfsadf', '685475d739752_photo.jpg', '2025-06-19 20:40:55');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `created_at`, `name`, `surname`, `phone`, `profile_picture`) VALUES
(1, 'test@example.com', '$2y$10$GL1V6MQ.7s9M70.WVbHid.aWyLizGmQzdLOmGQPmm73eSOP/9kVuC', '2025-01-12 18:42:04', 'Ömer11', 'Altındal11', '5467211111', NULL),
(16, 'deenem@gmail.com', '$2y$10$WumGylWPHYxUn0cOavd4O.pRUiPO6Wobtf7ed1oLypypHdJJkEXe2', '2025-01-12 18:56:59', 'kemal', 'Altındal 2', '5467217390', NULL),
(17, 'afdsgcnvb@gmail.com', '$2y$10$J/HfSS5ISp5VA8PYkBJ2e.WzbIETHQAXxoQGFrD7iTkwj6ZeNEOIi', '2025-01-13 16:41:27', '', '', '', NULL),
(18, 'son@gmail.com', '$2y$10$cHdo3diXwnYy8mMRcno.ku20gxGvUleF1fp./b6GRbTKjBxq282pa', '2025-01-13 16:44:55', '', '', '', NULL),
(19, 'test@gmail.com', '$2y$10$UxaQ2Qi3mSbIieGkv6aPy.yY2lmkNWDN18PdusqudslRt/ci3XbnK', '2025-01-13 16:52:22', 'Ömer12', 'Altındal12', '5467211111', 'omer12.png'),
(20, 'omer4@gmail.com', '$2y$10$SFkVk6jNX3/oTEazu9vbxOKLvbE5qixxQ2k4Sw2al0/qdY4I6tdfq', '2025-01-13 17:07:36', 'Ömer Burak 4', 'Altındal 4', '5467217394', 'uploads/67896a8416db3_2021-11-04.png'),
(21, 'sadfgda@gmail.com', '$2y$10$S64Zp.ZknDvAC.ChlzxFw.VqZ7uoa1stMSm/rAkGXQsvp92KIHO3q', '2025-01-13 18:40:51', 'asd', 'sdf', '23432', NULL),
(22, 'ssssss@gmail.com', '$2y$10$k3kvzLHbbAO7G.LLtSRs7eNpkdTZPxFLVYSuzGEX.QuyzyPDvH17e', '2025-01-13 18:42:29', 'sdaf', 'ewfsgdhgj', '3245', NULL),
(23, 'mehmet@gmail.com', '$2y$10$/2V0Fb/OPnCZFqqoYuyzQOLb3F7g.cUKuXrj6u4rlYU4IEn/nIIVK', '2025-01-13 18:58:31', 'Mehmet', 'Çakır', '2342342343', NULL),
(24, 'ldsjnvbhds@gmail.com', '$2y$10$99m8RCgasiLbFqB44g1PZ.2GKgYs7AHlsCbt6Dp9M.VjpqCIiqob2', '2025-01-13 19:09:10', 'sdsdf', 'fdsggfd', '23424324', NULL),
(25, 'burak3@gmail.com', '$2y$10$fPovg7iH3k63Gi3cuEV/E.xg9zxDzBeiNOw1DCU2PvFiKf/k/4UAa', '2025-01-15 18:11:51', 'Burak 3', 'Altındal 3', '5467217393', 'uploads/678800709c077_Ekran görüntüsü 2022-04-28 211127.png'),
(26, 'elif@gmail.com', '$2y$10$pGpp1nGpJg2/qvLWeUBo9uqH4tT.Yy.l.8Mmanv2PtNHqsmV8OG3i', '2025-01-16 17:48:40', 'Elif 1', 'Şimşek 1', '2345678971', 'uploads/678946a7a943d_Ekran görüntüsü 2024-07-27 162710.png'),
(27, 'gfd@gmail.com', '$2y$10$Y7zix0exgSqXZFjs0UKIsecWl7O1tlUK2jH/BJhwCKJ4iTVsPxO/u', '2025-01-16 19:54:57', 'gfd', 'gfd', '3453453445', NULL),
(28, 'kayit@gmail.com', '$2y$10$jBBSrHHO9dPRHHS49Bag/O.vPXt.73Nz1qazkmZaIk25xjfMNLQxa', '2025-01-17 16:04:12', 'kayit', 'soyad', '4564565667', NULL),
(29, 'test123@gmail.com', '$2y$10$P/1/1zu365vuC8mqDVuphO74LFex/1Tgx1hI5TRHAx0AIesPkM48u', '2025-01-17 16:14:10', 'test123', 'soyad123', '4569875423', NULL),
(30, 'testt@gmail.com', '$2y$10$xSd5bKpF6gNpmdAbebLiqeN7635xalG9ZbxRi5PFU68HfhuW2F8ri', '2025-01-17 16:15:59', 'testt 1', 'testtsoyad 1', '5467234561', NULL),
(31, 'omer11@gmail.com', '$2y$10$isk3UmibGAcGp1DU3PkieeqGXJ6cM3.0dg2lzJpoIPf4eyBUFaQSK', '2025-01-17 16:43:41', 'ömer 1', 'altındal 1', '3455675641', 'uploads/678a88d167f22_2021-11-07 (2).png'),
(32, 'aaae@gmail.com', '$2y$10$Votzs2PHpYDLTaJu.Vb8f.kmwtl6m6DdnyQkGLUfpIPgdmCssGKAS', '2025-04-27 22:43:04', 'aaae', 'aaae', '23544354356', NULL),
(33, 'omer22@gmail.com', '$2y$10$p85lcC73WZ1Up1EG1ZdFOeCDuE7L8R2Y3I5XWOud7Wi49f1b6pgAC', '2025-04-28 07:40:28', 'omer22', 'a22', '5467233445', NULL),
(34, 'asdasd1212@gmail.com', '$2y$10$CpMp2vxRXyLsHFeQsn4VpOxo4NE2emaiJlD/cFJbc6PCBfzw73.Pe', '2025-05-26 07:32:04', 'asd1', 'asd2', '7657656554', NULL),
(35, 'deneme8@gmail.com', '$2y$10$oowY5cGVNvzMrEBShb18KuyP3TSzkhlnIaHJwtTLyDg/nWnLATkp.', '2025-05-26 07:58:34', 'deneme8', 'soyad', '3243455667', NULL),
(36, 'aziz@gmail.com', '$2y$10$hIM0Q9MVsc6RwqkKng0gsOugo7CZTRUz.pYxQnYZB0tJKMEmNgE72', '2025-06-16 18:24:22', 'Aziz3', 'Yildirim3', '5467212223', 'uploads/68507186536d6_3371f359-2643-4110-8c93-00b41e9c9164.png'),
(37, 'test21@gmail.com', '$2y$10$fLeLFNRZw7Hj/DceaZnkEu7E/YUkJKUEg8iamUAoNlSf7mawOEpdK', '2025-06-19 20:31:44', 'asdsaa1', 'sdsad1', '23324324324', 'uploads/685474264384f_76965b62-cbe9-4dd8-a702-ac9ce9bb182f.png'),
(38, 'test34@gmail.com', '$2y$10$tdkemKcYznkoATl2jiN4l.ABv7BTbsAldaoCd1D713btpwF3xUiOa', '2025-06-19 20:34:17', 'sadsadas1', 'dsads1', '2342343434', 'uploads/6854748a2a304_d273051c-a03e-487d-92bd-e4a20c05e4b3.png'),
(39, 'test55@gmail.com', '$2y$10$rYNXE/AOq1EAZu6YBYkJ0.Bg6syzjdQiv8b6iVktZBeulCd4NxSuO', '2025-06-19 20:40:33', 'test551', 'sddfdsf1', '3453453434', 'uploads/6854760329d9d_f21fb275-dbd2-414f-a7e1-433eefc2a52c.png');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`);

--
-- Tablo için indeksler `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `post_id` (`post_id`,`user_email`);

--
-- Tablo için indeksler `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Tablo için AUTO_INCREMENT değeri `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- Tablo için AUTO_INCREMENT değeri `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
