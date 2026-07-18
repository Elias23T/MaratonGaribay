import api from './api';

async function login(correo, password) {
  const { data } = await api.post('/auth/login', { correo, password });
  localStorage.setItem('token', data.token);
  localStorage.setItem('usuario', JSON.stringify(data.usuario));
  return data;
}

async function register(nombre_completo, correo, password) {
  const { data } = await api.post('/auth/register', { nombre_completo, correo, password });
  return data;
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
}

function getUsuario() {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
}

function isAutenticado() {
  return !!localStorage.getItem('token');
}

export default { login, register, logout, getUsuario, isAutenticado };