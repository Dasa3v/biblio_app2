// carpeta: src/models, archivo: libro.js
const db = require('../db/connection');

module.exports = {
  async findAll() {
    const [rows] = await db.query(`
      SELECT libros.*, autores.nombre AS autor, categorias.nombre AS categoria
      FROM libros
      JOIN autores ON libros.autor_id = autores.id
      JOIN categorias ON libros.categoria_id = categorias.id
      WHERE libros.eliminado = 0
    `);
    return rows;
  },
  async findDeleted() {
    const [rows] = await db.query(`
      SELECT libros.*, autores.nombre AS autor, categorias.nombre AS categoria
      FROM libros
      JOIN autores ON libros.autor_id = autores.id
      JOIN categorias ON libros.categoria_id = categorias.id
      WHERE libros.eliminado = 1
    `);
    return rows;
  },
  async findById(id) {
    const [rows] = await db.query('SELECT * FROM libros WHERE id = ?', [id]);
    return rows[0];
  },
  async create({ titulo, autor_id, categoria_id, anio }) {
    await db.query(
      'INSERT INTO libros (titulo, autor_id, categoria_id, anio) VALUES (?, ?, ?, ?)',
      [titulo, autor_id, categoria_id, anio]
    );
  },
  async update(id, { titulo, autor_id, categoria_id, anio }) {
    await db.query(
      'UPDATE libros SET titulo = ?, autor_id = ?, categoria_id = ?, anio = ? WHERE id = ?',
      [titulo, autor_id, categoria_id, anio, id]
    );
  },
  async softDelete(id) {
    await db.query('UPDATE libros SET eliminado = 1 WHERE id = ?', [id]);
  },
  async restore(id) {
    await db.query('UPDATE libros SET eliminado = 0 WHERE id = ?', [id]);
  }
};