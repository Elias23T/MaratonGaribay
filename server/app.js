const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const participantesRoutes = require('./routes/participantesRoutes');
const publicRoutes = require('./routes/publicRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ ok: true, mensaje: 'API Maratón funcionando correctamente' });
});

app.use('/api/auth', authRoutes);
app.use('/api/participantes', participantesRoutes);
app.use('/api/public', publicRoutes);

app.use((req, res) => {
  res.status(404).json({ ok: false, mensaje: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
});

module.exports = app;