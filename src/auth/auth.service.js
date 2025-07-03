const db = require('../message/sqlite');
const bcrypt = require('bcrypt');

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
    return userSafe;
  },
};
