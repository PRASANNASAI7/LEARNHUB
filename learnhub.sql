-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 29, 2025 at 02:18 PM
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
-- Database: `learnhub`
--

-- --------------------------------------------------------

--
-- Table structure for table `certificates`
--

CREATE TABLE `certificates` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `certificate_url` varchar(255) DEFAULT NULL,
  `issued_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `certificates`
--

INSERT INTO `certificates` (`id`, `user_id`, `certificate_url`, `issued_at`) VALUES
(1, 7, '/uploads/certificates/1742734819730.pdf', '2025-03-23 13:11:36'),
(3, 7, '/uploads/certificates/1742736318257.pdf', '2025-03-23 13:25:18'),
(5, 13, '/uploads/certificates/1742737359650.pdf', '2025-03-23 13:42:39');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `instructor` varchar(255) DEFAULT NULL,
  `instructor_image` varchar(255) DEFAULT NULL,
  `curriculum` text DEFAULT NULL,
  `timings` varchar(255) DEFAULT NULL,
  `training_mode` varchar(100) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `name`, `image`, `instructor`, `instructor_image`, `curriculum`, `timings`, `training_mode`, `start_date`, `end_date`, `price`) VALUES
(25, 'BACKEND DEVELOPMENT', '1740748620887.png', 'HEMANTH', '1740748620888.avif', 'Javascript,Node.js,Angular,Mysql,Express,Php,After Completion Course U Will Get A Certficate And Classes Videos Access For 1year ', '3pm to 7pm', 'ONLINE', '2025-04-01', '2025-10-15', 50000.00),
(27, 'DIGITAL MARKETING', '1741015247623.avif', 'ELARA', '1741015247624.webp', '\r\nIntroduction to Digital Marketing,\r\nSearch Engine Optimization (SEO),\r\nContent Marketing,\r\nSocial Media Marketing,\r\nEmail Marketing,\r\nPay-Per-Click (PPC) Advertising,\r\nGoogle Ads,\r\nAnalytics and Data Analysis,\r\nMobile Marketing,\r\nAffiliate Marketing,\r\nInfluencer Marketing,\r\nBranding Strategies,\r\nConversion Rate Optimization,\r\nWeb Development Basics,\r\nE-commerce Marketing,\r\nDigital Marketing Strategy,\r\nOnline Reputation Management,\r\nEmerging Trends in Digital Marketing,\r\nThis curriculum covers a comprehensive range of topics essential for mastering digital marketing skills!', '2PM TO 6PM', 'ONLINE', '2025-06-01', '2025-12-31', 59999.00),
(34, 'FRONTEND DEVELOPMENT', '1742748281559.avif', 'MARCO', '1742748281560.avif', 'HTML,\r\nCSS,\r\nBOOTSTRAP,\r\nJAVASCRIPT,\r\nREACT.JS,\r\nTAILWAND-CSS,\r\nWORDPRESS', '3pm to 7pm', 'online', '2025-04-01', '2025-06-30', 39999.00),
(35, 'ARTIFICIAL NEURAL NETWOTK', '1742748486623.webp', 'Aisha Verma', '1742748486633.png', 'Introduction to Neural Networks,\r\nFundamentals of Artificial Neural Networks,\r\nLearning and Training Neural Networks,\r\nMulti-Layer Perceptron (MLP),\r\nOptimization Techniques in Neural Networks,\r\nConvolutional Neural Networks (CNNs),\r\nRecurrent Neural Networks (RNNs),\r\nDeep Learning and Advanced Architectures,\r\nImplementing Neural Networks with Frameworks,\r\nApplications of Neural Networks,\r\nChallenges and Future of Neural Networks', '3pm to 7pm', 'online', '2025-05-01', '2025-12-31', 89999.00),
(36, 'NATURAL LANGUAGE PROCESSING', '1742748675578.jpg', 'ROKO', '1742748675578.avif', 'Introduction to Natural Language Processing (NLP),\r\nText Preprocessing and Tokenization,\r\nPart-of-Speech (POS) Tagging,\r\nNamed Entity Recognition (NER),\r\nSyntactic and Semantic Analysis,\r\nWord Embeddings and Vector Representations,\r\nLanguage Models (N-grams, RNNs, Transformers),\r\nSentiment Analysis and Opinion Mining,\r\nMachine Translation,\r\nText Summarization,\r\nQuestion Answering Systems,\r\nSpeech Recognition and Text-to-Speech (TTS),\r\nChatbots and Conversational AI,\r\nEthical Considerations in NLP,\r\nApplications and Future of NLP', '3pm to 7pm', 'online', '2025-06-01', '2026-02-28', 99999.00),
(41, 'MACHINE LEARNING WITH PYTHON', '1743251373783.png', 'ZARAM', '1743251373807.webp', 'Introduction to Machine Learning,\r\nPython for Machine Learning,\r\nData Preprocessing,\r\nExploratory Data Analysis (EDA),\r\nSupervised Learning,\r\nModel Evaluation and Selection,\r\nUnsupervised Learning,\r\nFeature Engineering,\r\nEnsemble Methods,\r\nDeep Learning Basics,\r\nModel Deployment,\r\nEthics in Machine Learning', '9AM TO 1PM', 'online', '2025-05-01', '2025-12-31', 99999.00),
(43, 'MOBILE APP DEVELOPMENT', '1743252213768.avif', 'ASHITOSH', '1743252213768.jpg', 'Introduction to Mobile App Development,\r\nUnderstanding Mobile Platforms (iOS and Android),\r\nMobile App Development Frameworks,\r\nUser Interface (UI) and User Experience (UX) Design,\r\nProgramming Languages for Mobile Development,\r\nSetting Up the Development Environment,\r\nBuilding Your First Mobile App,\r\nData Management and Storage,\r\nIntegrating APIs and Third-Party Services,\r\nTesting and Debugging Mobile Apps,\r\nDeployment to App Stores,\r\nApp Maintenance and Updates,\r\nMonetization Strategies for Mobile Apps,\r\nFuture Trends in Mobile App Development', '11AM TO 1PM', 'online', '2025-06-01', '2025-10-31', 19999.00),
(44, 'FULL STACK WEBDEVELOPMENT', '1743252448164.webp', 'SHOPIA', '1743252448169.webp', 'Introduction to Full Stack Development,\r\nUnderstanding Web Technologies,\r\nHTML and CSS Fundamentals,\r\nJavaScript Basics,\r\nResponsive Web Design,\r\nFront-End Frameworks (e.g., React, Angular, Vue),\r\nVersion Control with Git and GitHub,\r\nBack-End Development Basics,\r\nNode.js and Express.js,\r\nDatabase Management (SQL and NoSQL),\r\nRESTful APIs and Web Services,\r\nAuthentication and Authorization,\r\nDeployment and Hosting,\r\nTesting and Debugging,\r\nBest Practices in Full Stack Development,\r\nBuilding a Full Stack Application,\r\nProject Management and Collaboration Tools', '9AM TO 1PM', 'online', '2025-06-01', '2025-12-31', 69999.00),
(45, 'DATA SCIENCE WITH PYTHON', '1743253033800.jpg', 'William Parker', '1743253033801.jpg', 'Introduction to Data Science,\r\nPython Basics for Data Science,\r\nData Manipulation with Pandas,\r\nData Visualization Techniques,\r\nStatistical Analysis and Inference,\r\nExploratory Data Analysis (EDA),\r\nIntroduction to Machine Learning,\r\nSupervised Learning Algorithms,\r\nUnsupervised Learning Algorithms,\r\nModel Evaluation and Selection,\r\nFeature Engineering and Selection,\r\nTime Series Analysis,\r\nNatural Language Processing (NLP),\r\nBig Data Technologies,\r\nDeployment of Data Science Models', '2PM TO 5PM', 'online', '2025-05-01', '2025-12-31', 59999.00);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `email`, `message`, `timestamp`, `user_id`) VALUES
(16, 'www.pavan666@gmail.com', 'hi,please join on this whats app group whats.com', '2025-03-23 13:41:03', 13),
(17, 'www.pavan666@gmail.com', 'class-1:zoom/class-1/1234', '2025-03-23 13:41:29', 13),
(18, 'www.pavan666@gmail.com', 'class-2:zomm/class-2/1234', '2025-03-23 13:41:45', 13),
(19, 'www.pavan666@gmail.com', 'class-3:zomm/class-3/1234', '2025-03-23 13:41:58', 13),
(20, 'www.pavan666@gmail.com', 'class-4:zomm/class-4/1234', '2025-03-23 13:42:08', 13),
(21, 'www.pavan666@gmail.com', 'tommorrow class is postponed', '2025-03-23 15:27:44', 13);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `certificate` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`, `certificate`) VALUES
(7, 'prasannasai tripuraneni', 'learnify.prasannasai@gmail.com', '$2b$10$Io/HU6aebPeKNfUgEb1jxuJYIYsxPzgdgT2l3wZgzmQ13zX4OK3eG', '2025-03-04 15:26:12', NULL),
(13, 'pavankumar', 'www.pavan666@gmail.com', '$2b$10$JbqR2W/LZB7dBwAe3uhvh.tuNpLhwl8KTF/b8EzvsKAs8uFGvYgiC', '2025-03-23 13:39:52', NULL),
(14, 'prasannasai', 't.prasannasai.7@gmail.com', '$2b$10$sEhA1LAI3bsqG5FdbqWQzeTTFlahEoDCKu63kmD1sLI9BDHz5X2CC', '2025-03-23 13:40:13', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_courses`
--

CREATE TABLE `user_courses` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `assigned_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `certificates`
--
ALTER TABLE `certificates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_courses`
--
ALTER TABLE `user_courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `course_id` (`course_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `certificates`
--
ALTER TABLE `certificates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user_courses`
--
ALTER TABLE `user_courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `certificates`
--
ALTER TABLE `certificates`
  ADD CONSTRAINT `certificates_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE;

--
-- Constraints for table `user_courses`
--
ALTER TABLE `user_courses`
  ADD CONSTRAINT `user_courses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_courses_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
