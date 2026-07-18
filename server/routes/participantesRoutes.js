const express = require('express');
const router = express.Router();
const participantesController = require('../controllers/participantesController');
const verificarToken = require('../middlewares/authMiddleware');

router.use(verificarToken);

router.get('/buscar', participantesController.buscar);
router.get('/', participantesController.listar);
router.get('/:id', participantesController.obtenerPorId);
router.post('/', participantesController.crear);
router.put('/:id', participantesController.actualizar);
router.delete('/:id', participantesController.eliminar);

module.exports = router;