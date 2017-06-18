-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-06-2017 a las 06:17:20
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `horario`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `P_addCurso` (IN `_nombre` VARCHAR(50))  BEGIN
	DECLARE _cursoExiste VARCHAR(50);
	SET _cursoExiste = (SELECT Count(*) FROM Curso WHERE nombreCurso = _nombre);
	
	IF(_cursoExiste = 0) THEN
		INSERT INTO Curso(nombreCurso) VALUES (_nombre);
	END IF;
	select * from Curso;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `P_addGrupo` (IN `_nombre` VARCHAR(50))  BEGIN
	DECLARE _grupoExiste VARCHAR(50);
	SET _grupoExiste = (SELECT Count(*) FROM Grupo WHERE nombreGrupo = _nombre);
	
	IF(_grupoExiste = 0) THEN
		INSERT INTO Grupo(nombreGrupo) VALUES (_nombre);		
	END IF;
	select * from Grupo;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `idCurso` int(11) NOT NULL,
  `nombreCurso` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`idCurso`, `nombreCurso`) VALUES
(1, 'Idioma'),
(2, 'quimica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallehorario`
--

CREATE TABLE `detallehorario` (
  `idDetalle` int(11) NOT NULL,
  `idGrupo` int(30) NOT NULL,
  `idCurso` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

CREATE TABLE `grupo` (
  `idGrupo` int(11) NOT NULL,
  `nombreGrupo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `grupo`
--

INSERT INTO `grupo` (`idGrupo`, `nombreGrupo`) VALUES
(1, 'IN6AM');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`idCurso`);

--
-- Indices de la tabla `detallehorario`
--
ALTER TABLE `detallehorario`
  ADD PRIMARY KEY (`idDetalle`),
  ADD KEY `idGrupo` (`idGrupo`),
  ADD KEY `idCurso` (`idCurso`);

--
-- Indices de la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`idGrupo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `idCurso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `detallehorario`
--
ALTER TABLE `detallehorario`
  MODIFY `idDetalle` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `grupo`
--
ALTER TABLE `grupo`
  MODIFY `idGrupo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detallehorario`
--
ALTER TABLE `detallehorario`
  ADD CONSTRAINT `detallehorario_ibfk_1` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`idGrupo`),
  ADD CONSTRAINT `detallehorario_ibfk_2` FOREIGN KEY (`idCurso`) REFERENCES `curso` (`idCurso`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
