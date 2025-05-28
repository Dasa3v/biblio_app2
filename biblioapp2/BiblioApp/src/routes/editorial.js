const express = require('express');
const router = express.Router();
const db = require('../db/connection'); // Asegúrate de que esta ruta sea correcta

// Listar editoriales
router.get('/', async (req, res) => {
  try {
    const [editoriales] = await db.query('SELECT * FROM editorial');
    res.render('editorial/index', { editoriales });
  } catch (error) {
    console.error('Error al listar editoriales:', error);
    res.status(500).send('Error al listar editoriales');
  }
});

// Mostrar formulario para crear una nueva editorial
router.get('/new', (req, res) => {
  try {
    res.render('editorial/new');
  } catch (error) {
    console.error('Error al mostrar el formulario de nueva editorial:', error);
    res.status(500).send('Error al mostrar el formulario');
  }
});

// Crear una nueva editorial
router.post('/new.', async (req, res) => {
  try {
    const { nombre, pais } = req.body;
    await db.query('INSERT INTO editorial (nombre, pais) VALUES (?, ?)', [nombre, pais]);
    res.redirect('/editorial');
  } catch (error) {
    console.error('Error al crear la editorial:', error);
    res.status(500).send('Error al crear la editorial');
  }
});

// Mostrar formulario para editar una editorial
router.get('/:id/edit', async (req, res) => {
  try {
    const [editorial] = await db.query('SELECT * FROM editorial WHERE id = ?', [req.params.id]);
    if (editorial.length === 0) {
      return res.status(404).send('Editorial no encontrada');
    }
    res.render('editorial/edit', { editorial: editorial[0] });
  } catch (error) {
    console.error('Error al mostrar el formulario de edición:', error);
    res.status(500).send('Error al mostrar el formulario de edición');
  }
});

// Actualizar editorial
router.post('/:id/update', async (req, res) => {
  try {
    const { nombre, pais } = req.body;
    await db.query('UPDATE editorial SET nombre = ?, pais = ? WHERE id = ?', [nombre, pais, req.params.id]);
    res.redirect('/editorial');
  } catch (error) {
    console.error('Error al actualizar la editorial:', error);
    res.status(500).send('Error al actualizar la editorial');
  }
});

// Eliminar editorial
router.post('/:id/delete', async (req, res) => {
  try {
    await db.query('DELETE FROM editorial WHERE id = ?', [req.params.id]);
    res.redirect('/editorial');
  } catch (error) {
    console.error('Error al eliminar la editorial:', error);
    res.status(500).send('Error al eliminar la editorial');
  }
});

module.exports = router;