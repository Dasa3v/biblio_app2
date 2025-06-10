const Prestamo = require('../models/prestamo');
const Libro = require('../models/libro');

exports.listar = async (req, res) => {
  const prestamos = await Prestamo.findAll();
  res.render('prestamos/index', { prestamos });
};

exports.formNuevo = async (req, res) => {
  const libros = await Libro.findAll();
  res.render('prestamos/nuevo', { libros });
};

exports.crear = async (req, res) => {
  const { libro_id, fecha_entrega } = req.body;
  await Prestamo.create({
    usuario_id: req.user.id,
    libro_id,
    fecha_entrega
  });
  res.redirect('/prestamos');
};

exports.formEditar = async (req, res) => {
  const prestamo = await Prestamo.findById(req.params.id);
  const libros = await Libro.findAll();
  res.render('prestamos/editar', { prestamo, libros });
};

exports.editar = async (req, res) => {
  const { libro_id, fecha_entrega } = req.body;
  await Prestamo.update(req.params.id, { libro_id, fecha_entrega });
  res.redirect('/prestamos');
};

exports.eliminar = async (req, res) => {
  await Prestamo.delete(req.params.id);
  res.redirect('/prestamos');
};