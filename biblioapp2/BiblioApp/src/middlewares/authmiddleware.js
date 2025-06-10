const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    req.flash('error', 'Debes iniciar sesión para acceder a esta página.');
    return res.redirect('/auth/login');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto');
    req.user = decoded;
    next();
  } catch (err) {
    req.flash('error', 'Sesión inválida o expirada.');
    res.clearCookie('token');
    return res.redirect('/auth/login');
  }
}

module.exports = authMiddleware;