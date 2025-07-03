const express = require('express');
const registerService = require('./register.service');
const router = express.Router();


/**
 * @swagger
 * /register:
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
 *               password:
 *                 type: string

 *     responses:
 *       201:
 *         description: Mensaje creado
 */
router.post('/', async (req, res) => {
    const { nombre, email, telefono, password } = req.body;
    const postUser = await registerService.create({
        nombre,
        email,
        telefono,
        password,
    });
    res.status(201).json(postUser);
    },

/** 
 *  @swagger
 * /register:
 *   get:
 *     summary: Obtiene todos los usuarios registrados
 *     responses:
 *       200:
 *         description: Lista de usuarios registrados
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
 *                   createdAt:
 *                     type: string
 *                     format: date-time 
 */
router.get('/', async (req, res) => {
    const users = await registerService.getAll();
    res.json(users);
}),
);

module.exports = router;