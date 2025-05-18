-- Script de creación de tablas MySQL para BiblioApp
CREATE DATABASE IF NOT EXISTS `biblioapp_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE `biblioapp_db`;

CREATE TABLE IF NOT EXISTS `authors` (
  `id_author` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `state` TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `categorias` (
  `id_category` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `state` TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `publishers` (
  `id_publisher` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `state` TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `books` (
  `id_book` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `id_author` INT NOT NULL,
  `isbn` VARCHAR(20),
  `year_published` YEAR,
  `num_pages` INT,
  `id_category` INT NOT NULL,
  `id_publisher` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  `state` TINYINT(1) NOT NULL DEFAULT 1,
  FOREIGN KEY (`id_author`) REFERENCES `authors`(`id_author`),
  FOREIGN KEY (`id_category`) REFERENCES `categories`(`id_category`),
  FOREIGN KEY (`id_publisher`) REFERENCES `publishers`(`id_publisher`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS categorias (
  id_category INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  state TINYINT(1) DEFAULT 1 COMMENT '1=activo, 0=eliminado'
);