const db = require('../db/connection');

exports.findByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
  return rows[0];
};

exports.create = async (nombre, email, password, rol = 'usuario') => {
  await db.query('INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)', [nombre, email, password, rol]);
};

exports.findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows[0];
};