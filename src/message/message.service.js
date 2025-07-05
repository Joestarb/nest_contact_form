const db = require('./sqlite');
const nodemailer = require('nodemailer');
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
    const insertedMessage = getInserted.get(result.lastInsertRowid);

    // Configuración de nodemailer (ejemplo con Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'arbeydzib1@gmail.com', // Cambia esto por tu correo
        pass: 'qdtjwntyzuuylbgi', // Usa una contraseña de aplicación
      },
    });

    const mailOptions = {
      from: 'arbeydzib1@gmail.com',
      to: 'arbeydzib1@gmail.com', // Puedes cambiarlo por cualquier destinatario
      subject: 'Nuevo mensaje de contacto',
      text: `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nMensaje: ${mensaje}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Correo enviado correctamente');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }

    return insertedMessage;
  },

  validateMesage: async (id) => {
 try {
      const stmt = db.prepare('UPDATE message SET validate_view = 1 WHERE id = ?');
      stmt.run(id);
      return { success: true, message: 'Mensaje validado correctamente' };
    } catch (error) {
      console.error('Error al validar el mensaje:', error);
      return { success: false, message: 'Error al validar el mensaje' };
    }
  },
};
