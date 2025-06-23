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
  const { nombre, email, telefono, mensaje } = req.body;
  const newMessage = await messageService.create({ nombre, email, telefono, mensaje });
  res.status(201).json(newMessage);
});

module.exports = router;
