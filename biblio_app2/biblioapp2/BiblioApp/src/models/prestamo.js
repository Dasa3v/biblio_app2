const db = require('../db/connection');

module.exports = {
  async findAll() {
    const [rows] = await db.query(`
      SELECT prestamos.*, 
             usuarios.nombre AS usuario, 
             libros.titulo AS libro
      FROM prestamos
      JOIN usuarios ON prestamos.usuario_id = usuarios.id
      JOIN libros ON prestamos.libro_id = libros.id
      ORDER BY fecha_prestamo DESC
    `);
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query(`
      SELECT * FROM prestamos WHERE id = ?
    `, [id]);
    return rows[0];
  },

  async create({ usuario_id, libro_id, fecha_entrega }) {
    await db.query(
      'INSERT INTO prestamos (usuario_id, libro_id, fecha_prestamo, fecha_entrega) VALUES (?, ?, CURDATE(), ?)',
      [usuario_id, libro_id, fecha_entrega]
    );
  },

  async update(id, { libro_id, fecha_entrega }) {
    await db.query(
      'UPDATE prestamos SET libro_id = ?, fecha_entrega = ? WHERE id = ?',
      [libro_id, fecha_entrega, id]
    );
  },

  async delete(id) {
    await db.query('DELETE FROM prestamos WHERE id = ?', [id]);
  }
};