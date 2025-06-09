const Autor = require('../models/autor');

exports.index = async (req, res) => {
  const autores = await Autor.findAll();
  res.render('autores/index', { autores });
};

exports.new = (req, res) => {
  res.render('autores/new');
};

exports.create = async (req, res) => {
  await Autor.create(req.body);
  res.redirect('/autores');
};

exports.edit = async (req, res) => {
  const autor = await Autor.findById(req.params.id);
  res.render('autores/edit', { autor });
};

exports.update = async (req, res) => {
  await Autor.update(req.params.id, req.body);
  res.redirect('/autores');
};

exports.delete = async (req, res) => {
  await Autor.delete(req.params.id);
  res.redirect('/autores');
};