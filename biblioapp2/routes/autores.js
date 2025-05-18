const express = require('express');
const router = express.Router();

// Mostrar activos
router.get('/', async (req, res) => {
  const db = req.app.locals.db;
  const [autores] = await db.query('SELECT * FROM authors WHERE state=1');
  res.render('autores/index', { autores, title: 'Autores' });
});

// Formulario Nuevo
router.get('/nuevo', (req, res) => {
  res.render('autores/nuevo', { autor: {}, title: 'Nuevo Autor' });
});

// Formulario Editar
router.get('/editar/:id', async (req, res) => {
  const db = req.app.locals.db;
  const [[autor]] = await db.query('SELECT * FROM authors WHERE id_author=?', [req.params.id]);
  res.render('autores/nuevo', { autor, title: 'Editar Autor' });
});

// Crear Autor
router.post('/nuevo', async (req, res) => {
  const db = req.app.locals.db;
  await db.query('INSERT INTO authors (name, state) VALUES (?,1)', [req.body.name]);
  req.flash('success', 'Autor agregado correctamente');
  res.redirect('/autores');
});

// Actualizar Autor
router.post('/editar/:id', async (req, res) => {
  const db = req.app.locals.db;
  await db.query('UPDATE authors SET name=? WHERE id_author=?', [req.body.name, req.params.id]);
  req.flash('success', 'Autor actualizado correctamente');
  res.redirect('/autores');
});

// Eliminar (soft delete)
router.get('/delete/:id', async (req, res) => {
  const db = req.app.locals.db;
  await db.query('UPDATE authors SET state=0 WHERE id_author=?', [req.params.id]);
  req.flash('success', 'Autor eliminado correctamente');
  res.redirect('/autores');
});

module.exports = router;
