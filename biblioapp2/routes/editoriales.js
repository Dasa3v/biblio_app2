const express = require('express');
const router = express.Router();

// Mostrar activos
router.get('/', async (req, res) => {
  const db = req.app.locals.db;
  const [editoriales] = await db.query('SELECT * FROM publishers WHERE state=1');
  res.render('editoriales/index', { editoriales, title: 'Editoriales' });
});

// Formulario Nuevo
router.get('/nuevo', (req, res) => {
  res.render('editoriales/nuevo', { editorial: {}, title: 'Nueva Editorial' });
});

// Formulario Editar
router.get('/editar/:id', async (req, res) => {
  const db = req.app.locals.db;
  const [[editorial]] = await db.query('SELECT * FROM publishers WHERE id_publisher=?', [req.params.id]);
  res.render('editoriales/nuevo', { editorial, title: 'Editar Editorial' });
});

// Crear Editorial
router.post('/nuevo', async (req, res) => {
  const db = req.app.locals.db;
  await db.query('INSERT INTO publishers (name, state) VALUES (?,1)', [req.body.name]);
  req.flash('success', 'Editorial agregada correctamente');
  res.redirect('/editoriales');
});

// Actualizar Editorial
router.post('/editar/:id', async (req, res) => {
  const db = req.app.locals.db;
  await db.query('UPDATE publishers SET name=? WHERE id_publisher=?', [req.body.name, req.params.id]);
  req.flash('success', 'Editorial actualizada correctamente');
  res.redirect('/editoriales');
});

// Eliminar (soft delete)
router.get('/delete/:id', async (req, res) => {
  const db = req.app.locals.db;
  await db.query('UPDATE publishers SET state=0 WHERE id_publisher=?', [req.params.id]);
  req.flash('success', 'Editorial eliminada correctamente');
  res.redirect('/editoriales');
});

module.exports = router;
