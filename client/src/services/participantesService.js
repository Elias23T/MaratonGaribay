import api from './api';

async function listar({ categoria, page = 1, limit = 20 } = {}) {
  const { data } = await api.get('/participantes', { params: { categoria, page, limit } });
  return data;
}

async function obtenerPorId(id) {
  const { data } = await api.get(`/participantes/${id}`);
  return data.participante;
}

async function crear(participante) {
  const { data } = await api.post('/participantes', participante);
  return data.participante;
}

async function actualizar(id, participante) {
  const { data } = await api.put(`/participantes/${id}`, participante);
  return data.participante;
}

async function eliminar(id) {
  const { data } = await api.delete(`/participantes/${id}`);
  return data;
}

async function buscar(termino) {
  const { data } = await api.get('/participantes/buscar', { params: { termino } });
  return data.participantes;
}

async function inscribirPublico(datos) {
  const { data } = await api.post('/public/inscripcion', datos);
  return data.participante;
}

async function consultarPorCI(ci) {
  const { data } = await api.get('/public/buscar', { params: { ci } });
  return data;
}

export default { listar, obtenerPorId, crear, actualizar, eliminar, buscar, inscribirPublico, consultarPorCI };