const db = require('../db/connection');

module.exports = {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM autores');
    return rows;
  },
  async findById(id) {
    const [rows] = await db.query('SELECT * FROM autores WHERE id = ?', [id]);
    return rows[0];
  },
  async create({ nombre, pais, fecha_nacimiento }) {
    await db.query(
      'INSERT INTO autores (nombre, pais, fecha_nacimiento) VALUES (?, ?, ?)',
      [nombre, pais, fecha_nacimiento]
    );
  },
  async update(id, { nombre, pais, fecha_nacimiento }) {
    await db.query(
      'UPDATE autores SET nombre = ?, pais = ?, fecha_nacimiento = ? WHERE id = ?',
      [nombre, pais, fecha_nacimiento, id]
    );
  },
  async delete(id) {
    await db.query('DELETE FROM autores WHERE id = ?', [id]);
  }
};