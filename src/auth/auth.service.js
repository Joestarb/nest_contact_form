const db = require('../message/sqlite');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  /**
   * Busca un usuario por email y compara la contraseña usando bcrypt y secretKey
   * @param {string} email
   * @param {string} password
   * @returns {object|null} El usuario sin la contraseña si es válido, o null si no lo es
   */
  login: async (email, password) => {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    const user = stmt.get(email);
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    const { password: _, ...userSafe } = user;

    // Generar JWT y expiración (1 hora)
    const expiresIn = 60 * 60; // 1 hora en segundos
    const secret = process.env.JWT_SECRET || 'secret_key';
    const token = jwt.sign({ id: user.id, email: user.email }, secret, {
      expiresIn,
    });
    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

    return { ...userSafe, token, expiresAt };
  },

  /**
   * Verifica si un JWT es válido y no ha expirado
   * @param {string} token
   * @returns {object|null} El usuario si el token es válido, o null si no lo es
   */
  verifyToken: (token) => {
    try {
      const secret = process.env.JWT_SECRET || 'secret_key';
      const decoded = jwt.verify(token, secret);
      const stmt = db.prepare(
        'SELECT id, nombre, email, telefono FROM users WHERE id = ?',
      );
      const user = stmt.get(decoded.id);
      if (!user) return null;
      return { ...user, token };
    } catch (err) {
      return null;
    }
  },
};
