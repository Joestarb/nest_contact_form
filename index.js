const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const messageRoutes = require('./src/message/message.controller');
const swaggerSetup = require('./swagger');

const app = express();

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());
app.use('/message', messageRoutes);
swaggerSetup(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${PORT}`);
});
