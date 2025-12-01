-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2025 at 03:32 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `organisasi`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `status` enum('Hadir','Izin','Sakit') NOT NULL,
  `verified` enum('True','False','Pending') NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `user_id`, `activity_id`, `date`, `status`, `verified`) VALUES
(6, 4, 6, '2025-11-29', 'Hadir', 'True'),
(8, 7, 6, '2025-12-02', 'Sakit', 'True');

-- --------------------------------------------------------

--
-- Table structure for table `madding`
--

CREATE TABLE `madding` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `category` varchar(100) NOT NULL,
  `approved` enum('approve','reject','pending') NOT NULL DEFAULT 'pending',
  `status` varchar(50) DEFAULT NULL,
  `thumbnail` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `activity` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_start` date NOT NULL,
  `date_end` date DEFAULT NULL,
  `status` enum('Toward','Done','Cancel') NOT NULL DEFAULT 'Toward'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `activity`, `description`, `created_by`, `created_at`, `date_start`, `date_end`, `status`) VALUES
(6, 'makan siang', 'makan enak bos', 4, '2025-11-26 08:19:17', '0000-00-00', '2025-11-26', 'Toward');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `no_telp` varchar(20) NOT NULL
  `password` varchar(150) NOT NULL,
  `role` enum('admin','member') NOT NULL DEFAULT 'member',
  `status` enum('active','noneactive') NOT NULL DEFAULT 'active',
  `avatar` text NOT NULL DEFAULT '/profile.webp'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `status`, `avatar`) VALUES
(4, 'Mr Anggarawa', 'Ujang1234@gmail.com', '$2b$10$UXAmxM/smG4TDTsORsztk.61Kli2JZQglubBBys3pXn0/FEC3kZUy', 'admin', 'active', '/profile.webp'),
(7, 'Agus kuncoro', 'Ujang1234@gmail.com', '$2b$10$Hwjtroy53nkTor1bNvegBOp1MYFniAhwZzaPb0yLAtIHTtlbebuKK', 'member', 'active', '/profile.webp'),
(9, 'Fauzan Muammar Kamil', 'Fauzan216@gmail.com', '$2b$10$kLcPkJOfOLHUOKjjYf5zgeoOlEckXGlqO75Bd1NKZTugey95Mq7Yq', 'member', 'active', '/profile.webp');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_absen_user` (`user_id`),
  ADD KEY `fk_absen_activity` (`activity_id`);

--
-- Indexes for table `madding`
--
ALTER TABLE `madding`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_madding_user` (`user_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_schedule_user` (`created_by`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `madding`
--
ALTER TABLE `madding`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `fk_absen_activity` FOREIGN KEY (`activity_id`) REFERENCES `schedule` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_absen_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `madding`
--
ALTER TABLE `madding`
  ADD CONSTRAINT `fk_madding_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `fk_schedule_user` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
