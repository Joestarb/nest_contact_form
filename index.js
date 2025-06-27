const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const messageRoutes = require('./src/message/message.controller');
const swaggerSetup = require('./swagger');

const app = express();
// Servir archivos estáticos del frontend desde la carpeta dist
const path = require('path');
app.use(express.static(path.join(__dirname, 'dist')));

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());
app.use('/message', messageRoutes);
swaggerSetup(app);

// Redirigir todas las rutas que no sean API al index.html del frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${PORT}`);
});
