const express = require('express');
const router = express.Router();
const controller = require('../controllers/autoresController');

router.get('/', controller.index);
router.get('/new', controller.new);
router.post('/', controller.create);
router.get('/:id/edit', controller.edit);
router.post('/:id/update', controller.update);
router.post('/:id/delete', controller.delete);

module.exports = router;