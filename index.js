// index.js
const express = require('express');
const bodyParser = require('body-parser');
const messageRoutes = require('./src/message/message.controller');
const swaggerSetup = require('./swagger');

const app = express();
app.use(bodyParser.json());

// Rutas
app.use('/message', messageRoutes);

swaggerSetup(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${PORT}`);
});
