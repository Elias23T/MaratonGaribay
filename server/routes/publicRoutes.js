const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

// Rutas públicas, no requieren login
router.post('/inscripcion', publicController.inscribir);
router.get('/buscar', publicController.consultarPorCI);

module.exports = router;