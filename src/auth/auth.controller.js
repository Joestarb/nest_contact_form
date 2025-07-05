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

// Login: genera y retorna token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.login(email, password);
  if (!user) {
    return res
      .status(401)
      .json({ message: 'Usuario o contraseña incorrectos' });
  }
  // El token y expiresAt vienen en user
  res.json({ message: 'Login exitoso', user });
});

/**
 * @swagger
 * /auth/verify-token:
 *   post:
 *     summary: Verifica si un token es válido y no ha expirado
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                 user:
 *                   type: object
 *       401:
 *         description: Token inválido o expirado
 */
router.post('/verify-token', (req, res) => {
  const { token } = req.body;
  const user = authService.verifyToken(token);
  if (!user) {
    return res
      .status(401)
      .json({ valid: false, message: 'Token inválido o expirado' });
  }
  res.json({ valid: true, user });
});

module.exports = router;
