const Libro = require('../models/libro');
const Autor = require('../models/autor');
const Categoria = require('../models/categoria');
const Editorial = require('../models/editorial'); // Importar el modelo de Editorial

exports.index = async (req, res) => {
  const libros = await Libro.findAll();
  res.render('panel/libros/index', { libros }); // Asegúrate de que la ruta de la vista sea correcta
};

exports.deleted = async (req, res) => {
  const libros = await Libro.findDeleted();
  res.render('panel/libros/deleted', { libros }); // Adaptado al panel de control
};

exports.new = async (req, res) => {
  const autores = await Autor.findAll();
  const categorias = await Categoria.findAll();
  const editoriales = await Editorial.findAll(); // Obtener todas las editoriales
  res.render('panel/libros/new', { autores, categorias, editoriales }); // Adaptado al panel de control
};

exports.create = async (req, res) => {
  await Libro.create(req.body);
  res.redirect('/panel/libros'); // Redirigir al panel de control
};

exports.edit = async (req, res) => {
  const libro = await Libro.findById(req.params.id);
  const autores = await Autor.findAll();
  const categorias = await Categoria.findAll();
  const editoriales = await Editorial.findAll(); // Obtener todas las editoriales
  res.render('panel/libros/edit', { libro, autores, categorias, editoriales }); // Adaptado al panel de control
};

exports.update = async (req, res) => {
  await Libro.update(req.params.id, req.body);
  res.redirect('/panel/libros'); // Redirigir al panel de control
};

exports.delete = async (req, res) => {
  await Libro.softDelete(req.params.id);
  res.redirect('/panel/libros'); // Redirigir al panel de control
};

exports.restore = async (req, res) => {
  await Libro.restore(req.params.id);
  res.redirect('/panel/libros/papelera'); // Redirigir al panel de control
};