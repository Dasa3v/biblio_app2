const Editorial = require('../models/editorial');

exports.index = async (req, res) => {
  const editoriales = await Editorial.findAll();
  res.render('editorial/index', { editoriales });
};

exports.new = (req, res) => {
  res.render('editorial/new');
};

exports.create = async (req, res) => {
  await Editorial.create(req.body.nombre, req.body.pais);
  res.redirect('/editorial');
};

exports.edit = async (req, res) => {
  const editorial = await Editorial.findById(req.params.id);
  res.render('editorial/edit', { editorial });
};

exports.update = async (req, res) => {
  await Editorial.update(req.params.id, req.body.nombre, req.body.pais);
  res.redirect('/editorial');
};

exports.delete = async (req, res) => {
  await Editorial.delete(req.params.id);
  res.redirect('/editorial');
};