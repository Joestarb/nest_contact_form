const express = require('express');
const router = express.Router();
const messageService = require('./message.service');

/**
 * @swagger
 * /message:
 *   get:
 *     summary: Obtiene todos los mensajes
 *     responses:
 *       200:
 *         description: Lista de mensajes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   email:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   mensaje:
 *                     type: string
 */
router.get('/', async (req, res) => {
  const messages = await messageService.getAll();
  res.json(messages);
});

/**
 * @swagger
 * /message:
 *   post:
 *     summary: Crea un nuevo mensaje
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               telefono:
 *                 type: string
 *               mensaje:
 *                 type: string
 *               validate_captcha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mensaje creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 email:
 *                   type: string
 *                 telefono:
 *                   type: string
 *                 mensaje:
 *                   type: string
 */
router.post('/', async (req, res) => {
  const { nombre, email, telefono, mensaje, captcha } = req.body;
  const newMessage = await messageService.create({
    nombre,
    email,
    telefono,
    mensaje,
    captcha,
  });
  res.status(201).json(newMessage);
});
/**
 * @swagger
 * /message/{id}:
 *   put:
 *     summary: Actualiza la vista de un mensaje
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               validate_view:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mensaje actualizado
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { validate_view } = req.body;

  // Validar que validate_view sea un string
  if (typeof validate_view !== 'string') {
    return res.status(400).json({ error: 'validate_view debe ser un string' });
  }

  try {
    const updatedMessage = await messageService.validateMesage(
      id,
      validate_view,
    );
    if (!updatedMessage) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }
    res.json(updatedMessage);
  } catch (error) {
    console.error('Error al actualizar el mensaje:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
module.exports = router;
