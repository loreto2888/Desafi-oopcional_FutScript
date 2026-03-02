const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET /equipos
// Devuelve [{ id, name }, ...]
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name FROM equipos ORDER BY id');
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener equipos:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// GET /equipos/:teamID/jugadores
// Devuelve [{ name, posicion }, ...] usando INNER JOIN con posiciones
router.get('/:teamID/jugadores', async (req, res) => {
  const { teamID } = req.params;

  try {
    const query = `
      SELECT j.name, p.name AS posicion
      FROM jugadores j
      INNER JOIN equipos e ON j.id_equipos = e.id
      INNER JOIN posiciones p ON j.position = p.id
      WHERE e.id = $1
      ORDER BY j.id
    `;

    const result = await pool.query(query, [teamID]);
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener jugadores:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// POST /equipos
// Registra un nuevo equipo (requiere token válido)
router.post('/', authMiddleware, async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'El nombre del equipo es requerido' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO equipos (name) VALUES ($1) RETURNING id, name',
      [name]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear equipo:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// POST /equipos/:teamID/jugadores
// Registra un nuevo jugador en un equipo (requiere token válido)
// El body debe contener { name, posicion } donde "posicion" corresponde al name en la tabla posiciones
router.post('/:teamID/jugadores', authMiddleware, async (req, res) => {
  const { teamID } = req.params;
  const { name, posicion } = req.body;

  if (!name || !posicion) {
    return res.status(400).json({ message: 'Nombre y posición son requeridos' });
  }

  try {
    // Buscar la posición en la tabla posiciones
    const positionResult = await pool.query(
      'SELECT id FROM posiciones WHERE name = $1',
      [posicion]
    );

    if (positionResult.rowCount === 0) {
      return res.status(400).json({ message: 'Posición no encontrada' });
    }

    const positionId = positionResult.rows[0].id;

    const result = await pool.query(
      'INSERT INTO jugadores (name, position, id_equipos) VALUES ($1, $2, $3) RETURNING id, name',
      [name, positionId, teamID]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear jugador:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
