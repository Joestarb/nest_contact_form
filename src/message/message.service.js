const db = require('./sqlite');

module.exports = {
  getAll: async () => {
    const stmt = db.prepare('SELECT * FROM message ORDER BY createdAt DESC');
    return stmt.all();
  },

  create: async ({ nombre, email, telefono, mensaje }) => {
    const stmt = db.prepare(`
      INSERT INTO message (nombre, email, telefono, mensaje)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(nombre, email, telefono, mensaje);

    const getInserted = db.prepare('SELECT * FROM message WHERE id = ?');
    return getInserted.get(result.lastInsertRowid);
  }
};
