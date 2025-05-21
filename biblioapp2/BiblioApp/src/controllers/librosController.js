// carpeta: src/controllers, archivo: librosController.js
const Libro = require('../models/libro');
const Autor = require('../models/autor');
const Categoria = require('../models/categoria');

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
  res.render('libros/new', { autores, categorias });
};

exports.create = async (req, res) => {
  await Libro.create(req.body);
  res.redirect('/libros');
};

exports.edit = async (req, res) => {
  const libro = await Libro.findById(req.params.id);
  const autores = await Autor.findAll();
  const categorias = await Categoria.findAll();
  res.render('libros/edit', { libro, autores, categorias });
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