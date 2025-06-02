const express = require('express');
const router = express.Router();
const prestamoController = require('../controllers/prestamoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', prestamoController.listar);
router.get('/nuevo', prestamoController.formNuevo);
router.post('/nuevo', prestamoController.crear);
router.get('/:id/editar', prestamoController.formEditar);
router.post('/:id/editar', prestamoController.editar);
router.post('/:id/eliminar', prestamoController.eliminar);

module.exports = router;