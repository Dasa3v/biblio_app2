### 1. Configuración del Proyecto

#### a. Crear la carpeta del proyecto

Abre tu terminal y ejecuta los siguientes comandos:

```bash
mkdir BiblioApp
cd BiblioApp
```

#### b. Inicializar el proyecto

Ejecuta el siguiente comando para crear un `package.json`:

```bash
npm init -y
```

#### c. Instalar dependencias

Instala Express, EJS y otras dependencias necesarias:

```bash
npm install express ejs body-parser method-override
```

### 2. Estructura de Carpetas

Crea la siguiente estructura de carpetas:

```
BiblioApp/
│
├── views/
│   ├── categories/
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── edit.ejs
│   ├── authors/
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── edit.ejs
│   ├── books/
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── edit.ejs
│   └── layout.ejs
│
├── public/
│   └── styles.css
│
├── routes/
│   ├── categories.js
│   ├── authors.js
│   └── books.js
│
├── models/
│   ├── category.js
│   ├── author.js
│   └── book.js
│
├── app.js
└── package.json
```

### 3. Configuración de Express

Crea el archivo `app.js` en la raíz del proyecto:

```javascript
// app.js
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Rutas
app.use('/categories', require('./routes/categories'));
app.use('/authors', require('./routes/authors'));
app.use('/books', require('./routes/books'));

// Página de inicio
app.get('/', (req, res) => {
    res.render('layout');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```

### 4. Crear Rutas

Crea los archivos de rutas en la carpeta `routes`.

#### a. `routes/categories.js`

```javascript
// routes/categories.js
const express = require('express');
const router = express.Router();

// Simulación de base de datos
let categories = [];

// Rutas CRUD para Categorías
router.get('/', (req, res) => {
    res.render('categories/index', { categories });
});

router.get('/new', (req, res) => {
    res.render('categories/new');
});

router.post('/', (req, res) => {
    categories.push(req.body);
    res.redirect('/categories');
});

router.get('/:id/edit', (req, res) => {
    const category = categories[req.params.id];
    res.render('categories/edit', { category, id: req.params.id });
});

router.put('/:id', (req, res) => {
    categories[req.params.id] = req.body;
    res.redirect('/categories');
});

router.delete('/:id', (req, res) => {
    categories.splice(req.params.id, 1);
    res.redirect('/categories');
});

module.exports = router;
```

#### b. `routes/authors.js`

```javascript
// routes/authors.js
const express = require('express');
const router = express.Router();

// Simulación de base de datos
let authors = [];

// Rutas CRUD para Autores
router.get('/', (req, res) => {
    res.render('authors/index', { authors });
});

router.get('/new', (req, res) => {
    res.render('authors/new');
});

router.post('/', (req, res) => {
    authors.push(req.body);
    res.redirect('/authors');
});

router.get('/:id/edit', (req, res) => {
    const author = authors[req.params.id];
    res.render('authors/edit', { author, id: req.params.id });
});

router.put('/:id', (req, res) => {
    authors[req.params.id] = req.body;
    res.redirect('/authors');
});

router.delete('/:id', (req, res) => {
    authors.splice(req.params.id, 1);
    res.redirect('/authors');
});

module.exports = router;
```

#### c. `routes/books.js`

```javascript
// routes/books.js
const express = require('express');
const router = express.Router();

// Simulación de base de datos
let books = [];

// Rutas CRUD para Libros
router.get('/', (req, res) => {
    res.render('books/index', { books });
});

router.get('/new', (req, res) => {
    res.render('books/new');
});

router.post('/', (req, res) => {
    books.push(req.body);
    res.redirect('/books');
});

router.get('/:id/edit', (req, res) => {
    const book = books[req.params.id];
    res.render('books/edit', { book, id: req.params.id });
});

router.put('/:id', (req, res) => {
    books[req.params.id] = req.body;
    res.redirect('/books');
});

router.delete('/:id', (req, res) => {
    books.splice(req.params.id, 1);
    res.redirect('/books');
});

module.exports = router;
```

### 5. Crear Vistas

Crea las vistas en la carpeta `views`.

#### a. `views/layout.ejs`

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/styles.css">
    <title>BiblioApp</title>
</head>
<body>
    <header>
        <h1>BiblioApp</h1>
        <nav>
            <a href="/categories">Categorías</a>
            <a href="/authors">Autores</a>
            <a href="/books">Libros</a>
        </nav>
    </header>
    <main>
        <%- include('partials/flash') %>
        <%- body %>
    </main>
</body>
</html>
```

#### b. Crear las vistas para Categorías, Autores y Libros

Crea las vistas correspondientes en sus respectivas carpetas (`index.ejs`, `new.ejs`, `edit.ejs`). Aquí tienes un ejemplo para las categorías:

##### `views/categories/index.ejs`

```html
<%- include('../layout') %>
<h2>Categorías</h2>
<a href="/categories/new">Nueva Categoría</a>
<ul>
    <% categories.forEach((category, index) => { %>
        <li>
            <%= category.name %>
            <form action="/categories/<%= index %>?_method=DELETE" method="POST">
                <button type="submit">Eliminar</button>
            </form>
            <a href="/categories/<%= index %>/edit">Editar</a>
        </li>
    <% }) %>
</ul>
```

##### `views/categories/new.ejs`

```html
<%- include('../layout') %>
<h2>Nueva Categoría</h2>
<form action="/categories" method="POST">
    <label for="name">Nombre:</label>
    <input type="text" name="name" required>
    <button type="submit">Agregar</button>
</form>
```

##### `views/categories/edit.ejs`

```html
<%- include('../layout') %>
<h2>Editar Categoría</h2>
<form action="/categories/<%= id %>?_method=PUT" method="POST">
    <label for="name">Nombre:</label>
    <input type="text" name="name" value="<%= category.name %>" required>
    <button type="submit">Actualizar</button>
</form>
```

### 6. Estilos CSS

Crea un archivo `styles.css` en la carpeta `public` para agregar estilos básicos.

```css
/* public/styles.css */
body {
    font-family: Arial, sans-serif;
}

header {
    background: #333;
    color: white;
    padding: 10px;
}

nav a {
    color: white;
    margin: 0 10px;
}

main {
    padding: 20px;
}
```

### 7. Ejecutar la Aplicación

Finalmente, ejecuta tu aplicación:

```bash
node app.js
```

Ahora puedes acceder a tu aplicación en `http://localhost:3000` y gestionar las categorías, autores y libros a través de las rutas CRUD implementadas.

### Notas Finales

- Este es un ejemplo básico y no incluye persistencia de datos. Para un proyecto real, considera usar una base de datos como MongoDB o MySQL.
- Puedes mejorar la validación de formularios y la gestión de errores según sea necesario.
- Asegúrate de manejar la seguridad y la autenticación si planeas desplegar la aplicación.