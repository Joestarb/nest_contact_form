const db = require('./sqlite');
const fetch = require('node-fetch');

module.exports = {
  getAll: async () => {
    const stmt = db.prepare('SELECT * FROM message ORDER BY createdAt DESC');
    return stmt.all();
  },
  create: async ({ nombre, email, telefono, mensaje, captcha }) => {
    // Validar captcha
    console.log(
      'Validando captcha:',
      nombre,
      email,
      telefono,
      mensaje,
      captcha,
    );
    const RECAPTCHA_SECRET = '6LeadnUrAAAAAEMpgOZ8_t7E-ftfWod6dZjG3bFY';
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${RECAPTCHA_SECRET}&response=${captcha}`,
      },
    );

    const data = await response.json();
    console.log('datos', data);
    // Guardar 1 si success es true, 0 si es false
    const captchaValido = data.success ? 1 : 0;

    const stmt = db.prepare(`
    INSERT INTO message (nombre, email, telefono, mensaje, validate_captcha)
    VALUES (?, ?, ?, ?, ?)
  `);
    const result = stmt.run(nombre, email, telefono, mensaje, captchaValido);

    const getInserted = db.prepare('SELECT * FROM message WHERE id = ?');
    return getInserted.get(result.lastInsertRowid);
  },
};
