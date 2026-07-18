const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../services/authService');

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ ok: false, mensaje: 'Token no proporcionado' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ ok: false, mensaje: 'Token inválido o expirado' });
    }
    req.usuario = decoded;
    next();
  });
}

module.exports = verificarToken;