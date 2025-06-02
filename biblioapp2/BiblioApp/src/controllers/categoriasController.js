const Categoria = require('../models/categoria');

exports.index = async (req, res) => {
  const categorias = await Categoria.findAll();
  res.render('categorias/index', { categorias });
};

exports.new = (req, res) => {
  res.render('categorias/new');
};

exports.create = async (req, res) => {
  await Categoria.create(req.body.nombre);
  res.redirect('/categorias');
};

exports.edit = async (req, res) => {
  const categoria = await Categoria.findById(req.params.id);
  res.render('categorias/edit', { categoria });
};

exports.update = async (req, res) => {
  await Categoria.update(req.params.id, req.body.nombre);
  res.redirect('/categorias');
};

exports.delete = async (req, res) => {
  await Categoria.delete(req.params.id);
  res.redirect('/categorias');
};