require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const mysql = require('mysql2/promise');

const app = express();

// ======================
//  Configuración Base de Datos
// ======================
app.locals.db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true // Mejor seguridad para parámetros
});

// ======================
//  Configuración del Motor de Vistas
// ======================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/base');

// ======================
//  Middlewares Esenciales
// ======================
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Habilitar extended para formularios complejos
app.use(express.json());

// ======================
//  Manejo de Sesiones
// ======================
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret-key-dev',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
  }
}));

app.use(flash());

// ======================
//  Variables Globales
// ======================
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentUser = null; // Para futura autenticación
  res.locals.currentPath = req.path; // Para navegación activa
  next();
});

// ======================
//  Configuración de Rutas
// ======================
const routes = [
  { path: '/libros', router: require('./routes/libros') }, // Usar minúsculas en nombres de archivo
  { path: '/autores', router: require('./routes/autores') },
  { path: '/editoriales', router: require('./routes/editoriales') },
  { path: '/categorias', router: require('./routes/categorias') } // Nombre de archivo en minúsculas
];

routes.forEach(route => {
  app.use(route.path, route.router);
});

// ======================
//  Manejo de Errores
// ======================
app.use((req, res, next) => {
  res.status(404).render('error', {
    title: 'Página no encontrada',
    message: 'La página solicitada no existe'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    title: 'Error del servidor',
    message: 'Algo salió mal en el servidor'
  });
});

// ======================
//  Inicio del Servidor
// ======================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`🔧 Entorno: ${process.env.NODE_ENV || 'development'}`);
});