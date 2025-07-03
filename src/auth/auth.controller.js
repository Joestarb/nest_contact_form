const express = require('express');
const bcrypt = require('bcrypt');
const authService = require('./auth.service');
const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.login(email, password);
  if (!user) {
    return res
      .status(401)
      .json({ message: 'Usuario o contraseña incorrectos' });
  }
  res.json({ message: 'Login exitoso', user });
});

module.exports = router;
