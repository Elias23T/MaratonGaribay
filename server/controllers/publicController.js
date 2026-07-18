const participantesService = require('../services/participantesService');

async function inscribir(req, res) {
  try {
    const participante = await participantesService.crearParticipante(req.body);
    return res.status(201).json({ ok: true, mensaje: 'Inscripción registrada correctamente', participante });
  } catch (error) {
    return res.status(400).json({ ok: false, mensaje: error.message });
  }
}

async function consultarPorCI(req, res) {
  try {
    const { ci } = req.query;
    if (!ci) {
      return res.status(400).json({ ok: false, mensaje: 'Debe proporcionar un número de carnet (CI)' });
    }
    const participante = await participantesService.buscarPorCI(ci.trim());
    if (!participante) {
      return res.status(200).json({ ok: true, inscrito: false, mensaje: 'No se encontró ninguna inscripción con ese CI' });
    }
    return res.status(200).json({ ok: true, inscrito: true, participante });
  } catch (error) {
    return res.status(400).json({ ok: false, mensaje: error.message });
  }
}

module.exports = { inscribir, consultarPorCI };