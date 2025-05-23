// carpeta: src/controllers, archivo: librosController.js
const Libro = require('../models/libro');
const Autor = require('../models/autor');
const Categoria = require('../models/categoria');
const Editorial = require('../models/editorial'); // Importar el modelo de Editorial

exports.index = async (req, res) => {
  const libros = await Libro.findAll();
  res.render('libros/index', { libros });
};

exports.deleted = async (req, res) => {
  const libros = await Libro.findDeleted();
  res.render('libros/deleted', { libros });
};

exports.new = async (req, res) => {
  const autores = await Autor.findAll();
  const categorias = await Categoria.findAll();
  const editoriales = await Editorial.findAll(); // Obtener todas las editoriales
  res.render('libros/new', { autores, categorias, editoriales }); // Pasar editoriales a la vista
};

exports.create = async (req, res) => {
  await Libro.create(req.body);
  res.redirect('/libros');
};

exports.edit = async (req, res) => {
  const libro = await Libro.findById(req.params.id);
  const autores = await Autor.findAll();
  const categorias = await Categoria.findAll();
  const editoriales = await Editorial.findAll(); // Obtener todas las editoriales
  res.render('libros/edit', { libro, autores, categorias, editoriales }); // Pasar editoriales a la vista
};

exports.update = async (req, res) => {
  await Libro.update(req.params.id, req.body);
  res.redirect('/libros');
};

exports.delete = async (req, res) => {
  await Libro.softDelete(req.params.id);
  res.redirect('/libros');
};

exports.restore = async (req, res) => {
  await Libro.restore(req.params.id);
  res.redirect('/libros/papelera');
};