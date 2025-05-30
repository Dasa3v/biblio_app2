const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser'); // Para manejar cookies
const session = require('express-session'); // Para manejar sesiones
const flash = require('connect-flash'); // Para mensajes flash
const jwt = require('jsonwebtoken'); // Para manejar tokens JWT
const authMiddleware = require('./middlewares/authMiddleware'); // Middleware para proteger rutas

const app = express();

// Configuración de EJS y vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, '../public')));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'secreto', // Cambia 'secreto' por una clave segura
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Cambia a `true` si usas HTTPS
}));
app.use(flash());

// Middleware para pasar mensajes flash y datos del usuario a las vistas
app.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto'); // Verifica el token
      res.locals.user = decoded; // Almacena los datos del usuario autenticado
    } catch (error) {
      res.locals.user = null; // Si el token es inválido, no hay usuario autenticado
    }
  } else {
    res.locals.user = null; // Si no hay token, no hay usuario autenticado
  }
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// Rutas públicas
app.use('/auth', require('./routes/auth')); // Rutas para login y registro

// Rutas protegidas (requieren autenticación)
app.use('/panel', authMiddleware, require('./routes/panel')); // Ruta para el panel de control
app.use('/categorias', authMiddleware, require('./routes/categorias'));
app.use('/autores', authMiddleware, require('./routes/autores'));
app.use('/libros', authMiddleware, require('./routes/libros'));
app.use('/editorial', authMiddleware, require('./routes/editorial'));

// Ruta raíz
app.get('/', (req, res) => {
  if (res.locals.user) {
    return res.redirect('/panel'); // Redirigir al panel si el usuario está autenticado
  }
  res.render('index'); // Mostrar la página de bienvenida si no está autenticado
});

// Ruta para manejar errores 404
app.use((req, res) => {
  res.status(404).render('404', { error: 'Página no encontrada' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});