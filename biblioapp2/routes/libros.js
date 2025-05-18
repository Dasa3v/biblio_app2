const express = require('express');
const router = express.Router();

// Mostrar activos
router.get('/', async (req, res) => {
  const db = req.app.locals.db;
  const [libros] = await db.query(
    'SELECT l.*, a.name autor, c.name categoria, p.name editorial ' +
    'FROM books l ' +
    'JOIN authors a ON l.id_author=a.id_author ' +
    'JOIN categories c ON l.id_category=c.id_category ' +
    'JOIN publishers p ON l.id_publisher=p.id_publisher ' +
    'WHERE l.state=1'
  );
  res.render('libros/index', { libros, title: 'Libros' });
});

// Formulario Nuevo
router.get('/nuevo', async (req, res) => {
  const db = req.app.locals.db;
  const [autores] = await db.query('SELECT * FROM authors WHERE state=1');
  const [categorias] = await db.query('SELECT * FROM categories WHERE state=1');
  const [editoriales] = await db.query('SELECT * FROM publishers WHERE state=1');
  res.render('libros/nuevo', {
    libro: {}, autores, categorias, editoriales, title: 'Nuevo Libro'
  });
});

// Crear Libro
router.post('/nuevo', async (req, res) => {
  const db = req.app.locals.db;
  const { name, id_author, isbn, year_published, num_pages, id_category, id_publisher } = req.body;
  await db.query(
    'INSERT INTO books (name, id_author, isbn, year_published, num_pages, id_category, id_publisher, state, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, 1, NOW())',
    [name, id_author, isbn, year_published, num_pages, id_category, id_publisher]
  );
  req.flash('success', 'Libro agregado correctamente');
  res.redirect('/libros');
});

// Editar Libro
router.get('/editar/:id', async (req, res) => {
  const db = req.app.locals.db;
  const [[libro]] = await db.query('SELECT * FROM books WHERE id_book = ?', [req.params.id]);
  const [autores] = await db.query('SELECT * FROM authors WHERE state=1');
  const [categorias] = await db.query('SELECT * FROM categories WHERE state=1');
  const [editoriales] = await db.query('SELECT * FROM publishers WHERE state=1');
  res.render('libros/nuevo', {
    libro, autores, categorias, editoriales, title: 'Editar Libro'
  });
});

router.post('/editar/:id', async (req, res) => {
  const db = req.app.locals.db;
  const { name, id_author, isbn, year_published, num_pages, id_category, id_publisher } = req.body;
  await db.query(
    'UPDATE books SET name=?, id_author=?, isbn=?, year_published=?, num_pages=?, id_category=?, id_publisher=? WHERE id_book=?',
    [name, id_author, isbn, year_published, num_pages, id_category, id_publisher, req.params.id]
  );
  req.flash('success', 'Libro actualizado correctamente');
  res.redirect('/libros');
});

// Enviar a Papelera
router.get('/delete/:id', async (req, res) => {
  const db = req.app.locals.db;
  await db.query('UPDATE books SET state=0 WHERE id_book=?', [req.params.id]);
  req.flash('success', 'Libro enviado a papelera');
  res.redirect('/libros');
});

// Listar Papelera
router.get('/restaurar', async (req, res) => {
  const db = req.app.locals.db;
  const [libros] = await db.query('SELECT * FROM books WHERE state=0');
  res.render('libros/restaurar', { libros, title: 'Papelera de Libros' });
});

// Restaurar Libro
router.get('/restaurar/:id', async (req, res) => {
  const db = req.app.locals.db;
  await db.query('UPDATE books SET state=1 WHERE id_book=?', [req.params.id]);
  req.flash('success', 'Libro restaurado correctamente');
  res.redirect('/libros/restaurar');
});

module.exports = router;
