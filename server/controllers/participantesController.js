const participantesService = require('../services/participantesService');

async function crear(req, res) {
  try {
    const participante = await participantesService.crearParticipante(req.body);
    return res.status(201).json({ ok: true, mensaje: 'Participante registrado correctamente', participante });
  } catch (error) {
    return res.status(400).json({ ok: false, mensaje: error.message });
  }
}

async function listar(req, res) {
  try {
    const { categoria, page, limit } = req.query;
    const resultado = await participantesService.listarParticipantes({ categoria, page, limit });
    return res.status(200).json({ ok: true, ...resultado });
  } catch (error) {
    return res.status(400).json({ ok: false, mensaje: error.message });
  }
}

async function obtenerPorId(req, res) {
  try {
    const participante = await participantesService.obtenerParticipantePorId(req.params.id);
    return res.status(200).json({ ok: true, participante });
  } catch (error) {
    return res.status(404).json({ ok: false, mensaje: error.message });
  }
}

async function actualizar(req, res) {
  try {
    const participante = await participantesService.actualizarParticipante(req.params.id, req.body);
    return res.status(200).json({ ok: true, mensaje: 'Participante actualizado correctamente', participante });
  } catch (error) {
    return res.status(400).json({ ok: false, mensaje: error.message });
  }
}

async function eliminar(req, res) {
  try {
    const resultado = await participantesService.eliminarParticipante(req.params.id);
    return res.status(200).json({ ok: true, ...resultado });
  } catch (error) {
    return res.status(400).json({ ok: false, mensaje: error.message });
  }
}

async function buscar(req, res) {
  try {
    const { termino } = req.query;
    if (!termino) {
      return res.status(400).json({ ok: false, mensaje: 'Debe proporcionar un término de búsqueda' });
    }
    const participantes = await participantesService.buscarParticipantes(termino);
    return res.status(200).json({ ok: true, participantes });
  } catch (error) {
    return res.status(400).json({ ok: false, mensaje: error.message });
  }
}

module.exports = { crear, listar, obtenerPorId, actualizar, eliminar, buscar };