const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findByEmail(email);

    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
      req.flash('error', 'Credenciales inválidas.');
      return res.redirect('/auth/login');
    }

    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET || 'secreto', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    req.flash('success', 'Inicio de sesión exitoso.');
    res.redirect('/panel');
  } catch (error) {
    req.flash('error', 'Ocurrió un error al iniciar sesión.');
    res.redirect('/auth/login');
  }
};

exports.register = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    // Verificar si el correo ya está registrado
    const existingUser = await Usuario.findByEmail(email);
    if (existingUser) {
      req.flash('error', 'El correo electrónico ya está registrado.');
      return res.redirect('/auth/register');
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    await Usuario.create(nombre, email, hashedPassword);
    req.flash('success', 'Registro exitoso. Ahora puedes iniciar sesión.');
    res.redirect('/auth/login');
  } catch (error) {
    req.flash('error', 'Ocurrió un error al registrar el usuario.');
    res.redirect('/auth/register');
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  req.flash('success', 'Sesión cerrada exitosamente.');
  res.redirect('/auth/login');
};