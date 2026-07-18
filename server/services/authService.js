const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');

const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_maraton_2026';
const JWT_EXPIRES_IN = '8h';

async function registrarUsuario({ nombre_completo, correo, password }) {
  const { data: existente } = await supabase
    .from('usuarios')
    .select('id')
    .eq('correo', correo)
    .maybeSingle();

  if (existente) {
    throw new Error('Ya existe un usuario registrado con ese correo');
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const { data, error } = await supabase
    .from('usuarios')
    .insert([{ nombre_completo, correo, password: passwordHash }])
    .select('id, nombre_completo, correo, estado, fecha_creacion')
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function login({ correo, password }) {
  const { data: usuario, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('correo', correo)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!usuario) throw new Error('Credenciales inválidas');
  if (!usuario.estado) throw new Error('El usuario se encuentra inactivo');

  const passwordValido = await bcrypt.compare(password, usuario.password);
  if (!passwordValido) throw new Error('Credenciales inválidas');

  const token = jwt.sign(
    { id: usuario.id, correo: usuario.correo, nombre_completo: usuario.nombre_completo },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  const { password: _omit, ...usuarioSinPassword } = usuario;

  return { usuario: usuarioSinPassword, token };
}

module.exports = { registrarUsuario, login, JWT_SECRET };