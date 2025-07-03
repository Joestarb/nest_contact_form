const db = require('../message/sqlite');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

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

    // Generar token y expiración (1 hora)
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    const insertToken = db.prepare(`
      INSERT INTO users_tokens (user_id, token, expiresAt)
      VALUES (?, ?, ?)
    `);
    insertToken.run(user.id, token, expiresAt);

    return { ...userSafe, token, expiresAt };
  },

  /**
   * Verifica si un token es válido y no ha expirado
   * @param {string} token
   * @returns {object|null} El usuario si el token es válido, o null si no lo es
   */
  verifyToken: (token) => {
    const stmt = db.prepare(`
      SELECT ut.*, u.nombre, u.email, u.telefono FROM users_tokens ut
      JOIN users u ON ut.user_id = u.id
      WHERE ut.token = ?
    `);
    const row = stmt.get(token);
    if (!row) return null;
    if (new Date(row.expiresAt) < new Date()) return null;
    // Retornar datos del usuario y token
    return {
      id: row.user_id,
      nombre: row.nombre,
      email: row.email,
      telefono: row.telefono,
      token: row.token,
      expiresAt: row.expiresAt,
    };
  },
};
