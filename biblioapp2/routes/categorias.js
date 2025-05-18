const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Configuración de validaciones
const categoriaValidations = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ max: 100 }).withMessage('Máximo 100 caracteres')
    .escape()
];

// Middleware de paginación
const paginationMiddleware = (req, res, next) => {
    req.query.page = Math.max(parseInt(req.query.page) || 1, 1);
    req.query.limit = 10; // 10 items por página
    next();
  };

// Listar categorías con paginación
router.get('/', paginationMiddleware, async (req, res) => {
  try {
    const offset = (req.query.page - 1) * req.query.limit;
    
    const [categorias] = await req.app.locals.db.query(
      `SELECT * FROM categorias 
      WHERE state = 1 
      ORDER BY name 
      LIMIT ? OFFSET ?`,
      [req.query.limit, offset]
    );

    const [[total]] = await req.app.locals.db.query(
      'SELECT COUNT(*) AS total FROM categorias WHERE state = 1'
    );

    res.render('categorias/index', {
      categorias,
      pagination: {
        page: req.query.page,
        pages: Math.ceil(total.total / req.query.limit),
        limit: req.query.limit
      }
    });

  } catch (error) {
    console.error('Error en GET /categorias:', error);
    req.flash('error', 'Error al cargar el listado de categorías');
    res.redirect('/');
  }
});

// Procesar creación de categoría
router.post('/', categoriaValidations, async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    req.flash('error', errors.array()[0].msg);
    return res.redirect('/categorias/nuevo');
  }

  try {
    const [result] = await req.app.locals.db.query(
      'INSERT INTO categorias (name) VALUES (?)',
      [req.body.nombre]
    );
    
    req.flash('success', 'Categoría creada exitosamente');
    return res.redirect(`/categorias/${result.insertId}`);

  } catch (error) {
    console.error('Error en POST /categorias:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      req.flash('error', 'Esta categoría ya existe');
    } else {
      req.flash('error', 'Error al crear la categoría');
    }
    
    res.redirect('/categorias/nuevo');
  }
});

// Detalle de categoría
router.get('/:id', async (req, res) => {
  try {
    const [categoria] = await req.app.locals.db.query(
      `SELECT c.*, COUNT(b.id_book) AS total_libros 
      FROM categorias c
      LEFT JOIN books b ON c.id_category = b.id_category
      WHERE c.id_category = ? AND c.state = 1
      GROUP BY c.id_category`,
      [req.params.id]
    );

    if (!categoria.length) {
      req.flash('error', 'Categoría no encontrada');
      return res.redirect('/categorias');
    }

    res.render('categorias/detalle', { 
      categoria: categoria[0],
      libros: categoria[0].total_libros 
    });

  } catch (error) {
    console.error('Error en GET /categorias/:id:', error);
    req.flash('error', 'Error al cargar la categoría');
    res.redirect('/categorias');
  }
});

// Eliminación mejorada
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await req.app.locals.db.query(
      `UPDATE categorias SET state = 0 
      WHERE id_category = ? AND state = 1`,
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Categoría no encontrada o ya eliminada'
      });
    }

    res.json({ 
      success: true,
      message: 'Categoría eliminada exitosamente'
    });

  } catch (error) {
    console.error('Error en DELETE /categorias/:id:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al eliminar la categoría'
    });
  }
});

module.exports = router;