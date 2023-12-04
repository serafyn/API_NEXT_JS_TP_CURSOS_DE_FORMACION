-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-12-2023 a las 22:32:53
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `course_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `course`
--

INSERT INTO `course` (`id`, `name`, `description`, `active`) VALUES
(1, 'Course 1', 'Description for Course 1', 1),
(2, 'Course 2', 'Description for Course 2', 1),
(3, 'Course 3', 'Description for Course 3', 1),
(4, 'Course 1', 'Description for Course 1', 1),
(5, 'Course 2', 'Description for Course 2', 1),
(6, 'Course 3', 'Description for Course 3', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos_login`
--

CREATE TABLE `eventos_login` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `tipo_evento` enum('inicio_sesion_exitoso','inicio_sesion_fallido','intentar_inicio_sesion','recuperacion_password_iniciado','recuperacion_password_fallido') DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(200) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `course_id`, `active`) VALUES
(1, 'User 1', 'user1@example.com', '', 1, 1),
(2, 'User 2', 'user2@example.com', '', 2, 1),
(3, 'User 3', 'user3@example.com', '', 1, 1),
(4, 'User 1', 'user1@example.com', '', 1, 1),
(5, 'User 2', 'user2@example.com', '', 2, 1),
(6, 'User 3', 'user3@example.com', '', 1, 1),
(7, 'User 4', '', '', NULL, 0),
(8, '', 'test@test.com', '$2a$10$SN8.D7DYE9j0we88eKek9u8Ejk3BULJjkAIN9rCCxkxocNMcvN/U6', NULL, 1),
(9, 'Keepass', 'test1@test.com', '$2a$10$occtB6HoUVgGXhWAA8qRquLbDRejjbeOtMFLmoaIc.7gjFErTt23i', NULL, 1),
(10, 'User 4', '', '', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_courses`
--

CREATE TABLE `user_courses` (
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_courses`
--

INSERT INTO `user_courses` (`user_id`, `course_id`) VALUES
(1, 1),
(2, 1),
(3, 2),
(7, 1),
(10, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `eventos_login`
--
ALTER TABLE `eventos_login`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indices de la tabla `user_courses`
--
ALTER TABLE `user_courses`
  ADD PRIMARY KEY (`user_id`,`course_id`),
  ADD KEY `course_id` (`course_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `eventos_login`
--
ALTER TABLE `eventos_login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`);

--
-- Filtros para la tabla `user_courses`
--
ALTER TABLE `user_courses`
  ADD CONSTRAINT `user_courses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `user_courses_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
