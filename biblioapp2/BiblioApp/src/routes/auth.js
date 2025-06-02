const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para mostrar el formulario de registro
router.get('/register', (req, res) => res.render('auth/register'));

// Ruta para procesar el registro
router.post('/register', authController.register);

// Ruta para mostrar el formulario de inicio de sesión
router.get('/login', (req, res) => res.render('auth/login'));

// Ruta para procesar el inicio de sesión
router.post('/login', authController.login);

// Ruta para cerrar sesión
router.get('/logout', authController.logout);

module.exports = router;