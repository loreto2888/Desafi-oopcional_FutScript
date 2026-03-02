const express = require('express');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils/secretKey');

const router = express.Router();

// Usuario administrador único
const ADMIN_USER = {
  username: 'admin',
  password: '1234'
};

// POST /login
router.post('/', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
    const payload = { username, role: 'admin' };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    return res.status(200).json({ token });
  }

  return res.status(400).json({ message: 'Credenciales inválidas' });
});

module.exports = router;
