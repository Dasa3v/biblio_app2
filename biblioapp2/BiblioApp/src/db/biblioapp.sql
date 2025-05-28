-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS biblioapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE biblioapp;

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  estado TINYINT(1) DEFAULT 1
);

-- Tabla de autores
CREATE TABLE IF NOT EXISTS autores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  pais VARCHAR(100) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  estado TINYINT(1) DEFAULT 1
);

-- Tabla de libros
CREATE TABLE IF NOT EXISTS libros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  autor_id INT NOT NULL,
  categoria_id INT NOT NULL,
  anio YEAR NOT NULL,
  estado TINYINT(1) DEFAULT 1,
  eliminado TINYINT(1) DEFAULT 0,
  FOREIGN KEY (autor_id) REFERENCES autores(id) ON DELETE CASCADE,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE CASCADE
);

-- Tabla de editoriales
CREATE TABLE IF NOT EXISTS editorial (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  estado TINYINT(1) DEFAULT 1
);

-- Tabla de usuarios (para autenticación)
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol ENUM('admin', 'usuario') DEFAULT 'usuario',
  estado TINYINT(1) DEFAULT 1
);

-- Tabla de sesiones (opcional, para tokens persistentes)
CREATE TABLE IF NOT EXISTS sesiones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  token VARCHAR(255) NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Ejemplo de datos
INSERT INTO categorias (nombre) VALUES ('Novela'), ('Cuento'), ('Ciencia'), ('Historia');
INSERT INTO autores (nombre, pais, fecha_nacimiento) VALUES 
  ('Gabriel García Márquez', 'Colombia', '1927-03-06'),
  ('Isabel Allende', 'Chile', '1942-08-02');
INSERT INTO libros (titulo, autor_id, categoria_id, anio) VALUES 
  ('Cien años de soledad', 1, 1, 1967),
  ('La casa de los espíritus', 2, 1, 1982);
INSERT INTO editorial(nombre, estado) VALUES 
  ('Editorial Planeta', 1),
  ('Penguin Random House', 1),
  ('Alfaguara', 1),
  ('Anagrama', 1),
  ('Tusquets Editores', 1),
  ('Ediciones Akal', 1),
  ('Siglo XXI Editores', 1),
  ('Fondo de Cultura Económica', 1),
  ('Editorial Norma', 1),
  ('Santillana', 1);

-- Ejemplo de datos para usuarios
INSERT INTO usuarios (nombre, email, password, rol) VALUES 
  ('Administrador', 'admin@biblioapp.com', '$2b$10$hashedpassword', 'admin'),
  ('Usuario', 'usuario@biblioapp.com', '$2b$10$hashedpassword', 'usuario');