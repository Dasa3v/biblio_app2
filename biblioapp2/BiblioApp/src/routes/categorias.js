const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoriasController');

router.get('/', controller.index);
router.get('/new', controller.new);
router.post('/', controller.create);
router.get('/:id/edit', controller.edit);
router.post('/:id/update', controller.update); // O usa method-override para PUT
router.post('/:id/delete', controller.delete); // O usa method-override para DELETE

module.exports = router;