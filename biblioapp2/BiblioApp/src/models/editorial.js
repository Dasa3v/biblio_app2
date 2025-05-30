// carpeta: src/models, archivo: editorial.js
const db = require('../db/connection');

exports.findAll = async () => {
  const [rows] = await db.query('SELECT * FROM editorial');
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM editorial WHERE id = ?', [id]);
  return rows[0];
};

exports.create = async (nombre, pais) => {
  await db.query('INSERT INTO editorial (nombre, pais) VALUES (?, ?)', [nombre, pais]);
};

exports.update = async (id, nombre, pais) => {
  await db.query('UPDATE editorial SET nombre = ?, pais = ? WHERE id = ?', [nombre, pais, id]);
};

exports.delete = async (id) => {
  await db.query('DELETE FROM editorial WHERE id = ?', [id]);
};