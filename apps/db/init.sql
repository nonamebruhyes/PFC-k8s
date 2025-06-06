CREATE DATABASE IF NOT EXISTS `pfc-bbdd`;
    USE `pfc-bbdd`;
    SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
    START TRANSACTION;
    SET time_zone = "+00:00";

    DROP TABLE IF EXISTS `publicacion`;
    CREATE TABLE `publicacion` (
      `id` int(10) NOT NULL AUTO_INCREMENT,
      `id_autor` int(10) NOT NULL,
      `nombre` varchar(200) NOT NULL,
      `titulo` varchar(200) NOT NULL,
      `descripcion` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`descripcion`)),
      `archivo` varchar(200) NOT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

    DROP TABLE IF EXISTS `usuario`;
    CREATE TABLE `usuario` (
      `id` int(10) NOT NULL,
      `nombre` varchar(30) NOT NULL,
      `email` varchar(50) NOT NULL,
      `password` varchar(20) NOT NULL,
      `NPublicaciones` int(10) NOT NULL,
      `foto_perfil` varchar(1000) NOT NULL,
      `foto_banner` varchar(1000) NOT NULL,
      `primera_vez` boolean NOT NULL DEFAULT TRUE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

    INSERT INTO `usuario` (`id`, `nombre`, `email`, `password`, `NPublicaciones`, `foto_perfil`, `foto_banner`, `primera_vez`) VALUES
    (1, 'Isaac', 'sdaniel9391@gmail.com', 'abc123', 1, '', '', TRUE),
    (2, 'Pandorito', 'leandroutz@gmail.com', 'Abc123', 0, './img/perfil/perfil_default.png', './img/perfil/banner_default.png', TRUE);


    ALTER TABLE `usuario`
      ADD PRIMARY KEY (`id`);
    
    ALTER TABLE `publicacion`
      MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
    
    ALTER TABLE `usuario`
      MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
    

    
    INSERT INTO `publicacion` (`id`, `id_autor`, `nombre`, `titulo`, `descripcion`, `archivo`) VALUES
      (1, 27, 'Pagina azul', 'Pagina azul', 'Pagina azul porque me encanta el azul, azul de mar azul de cielo, azul de pureza. UWU', 'a');
    
    COMMIT;