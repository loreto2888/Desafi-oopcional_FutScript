const express = require('express');
const equiposRouter = require('./routes/equipos');
const authRouter = require('./routes/auth');

const app = express();

app.use(express.json());

app.use('/login', authRouter);
app.use('/equipos', equiposRouter);

// Manejo básico de ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

module.exports = app;
