const db = require('../message/sqlite');
const bcrypt = require('bcrypt');

module.exports = {
    getAll: async () => {
        const stmt = db.prepare('SELECT * FROM users ORDER BY createdAt DESC');
        return stmt.all();
    },
    create: async ({ nombre, email, telefono, password }) => {
        passwordHashed = await bcrypt.hash(password, 10);
        const stmt = db.prepare(`
      INSERT INTO users (nombre, email, telefono, password)
      VALUES (?, ?, ?, ?)
    `);
        const result = stmt.run(nombre, email, telefono, passwordHashed);

        const getInserted = db.prepare('SELECT * FROM users WHERE id = ?');
        return getInserted.get(result.lastInsertRowid);
    }
};

