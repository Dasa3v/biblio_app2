// carpeta: BiblioApp/src, archivo: app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

// Configuración de EJS y vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, '../public')));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Rutas principales
app.use('/categorias', require('./routes/categorias'));
app.use('/autores', require('./routes/autores'));
app.use('/libros', require('./routes/libros'));

// Ruta raíz
app.get('/', (req, res) => res.redirect('/libros'));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});