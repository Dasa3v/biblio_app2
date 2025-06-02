const db = require('../db/connection');

module.exports = {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM categorias');
    return rows;
  },
  async findById(id) {
    const [rows] = await db.query('SELECT * FROM categorias WHERE id = ?', [id]);
    return rows[0];
  },
  async create(nombre) {
    await db.query('INSERT INTO categorias (nombre) VALUES (?)', [nombre]);
  },
  async update(id, nombre) {
    await db.query('UPDATE categorias SET nombre = ? WHERE id = ?', [nombre, id]);
  },
  async delete(id) {
    await db.query('DELETE FROM categorias WHERE id = ?', [id]);
  }
};