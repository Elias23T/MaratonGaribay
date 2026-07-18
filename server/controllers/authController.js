const authService = require('../services/authService');

async function register(req, res) {
  try {
    const { nombre_completo, correo, password } = req.body;

    if (!nombre_completo || !correo || !password) {
      return res.status(400).json({ ok: false, mensaje: 'Todos los campos son obligatorios' });
    }

    const usuario = await authService.registrarUsuario({ nombre_completo, correo, password });
    return res.status(201).json({ ok: true, mensaje: 'Usuario registrado correctamente', usuario });
  } catch (error) {
    return res.status(400).json({ ok: false, mensaje: error.message });
  }
}

async function login(req, res) {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ ok: false, mensaje: 'Correo y contraseña son obligatorios' });
    }

    const resultado = await authService.login({ correo, password });
    return res.status(200).json({ ok: true, mensaje: 'Login exitoso', ...resultado });
  } catch (error) {
    return res.status(401).json({ ok: false, mensaje: error.message });
  }
}

module.exports = { register, login };
