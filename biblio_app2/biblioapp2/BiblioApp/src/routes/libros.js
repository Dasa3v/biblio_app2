// carpeta: src/routes, archivo: libros.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/librosController');
// Middleware de autenticación ya se aplica en app.js

// Rutas base
router.get('/', controller.index);
router.get('/new', controller.new);
router.post('/create', controller.create);
router.get('/papelera', controller.deleted);
router.post('/:id/restore', controller.restore);
router.post('/panel/libros/:id/restore', controller.restore);
router.get('/:id/edit', controller.edit);
router.post('/:id/update', controller.update);
router.post('/:id/delete', controller.delete);
router.post('/panel/libros/:id/delete', controller.delete);

// Rutas alternativas para /libros
router.get('/libros', controller.index);
router.get('/libros/new', controller.new);
router.get('/libros/papelera', controller.deleted);
router.post('/libros/:id/restore', controller.restore);
router.get('/libros/:id/edit', controller.edit);
router.post('/libros/:id/update', controller.update);
router.post('/libros/:id/delete', controller.delete);

// Rutas alternativas para /panel/libros
router.get('/panel/libros', controller.index);
router.get('/panel/libros/new', controller.new);
router.post('/panel/libros/create', controller.create);
router.get('/panel/libros/papelera', controller.deleted);
router.post('/panel/libros/:id/restore', controller.restore);
router.get('/panel/libros/:id/edit', controller.edit);
router.post('/panel/libros/:id/update', controller.update);
router.post('/panel/libros/:id/delete', controller.delete);

module.exports = router;