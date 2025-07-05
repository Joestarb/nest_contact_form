// Cargar variables de entorno desde .env en la raíz del proyecto
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const messageRoutes = require('./src/message/message.controller');
const registerRoutes = require('./src/register/register.controller');
const authRoutes = require('./src/auth/auth.controller');
const swaggerSetup = require('./swagger');

const app = express();
// Servir archivos estáticos del frontend desde la carpeta dist
const path = require('path');
app.use(express.static(path.join(__dirname, 'dist')));

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }),
);

app.use(bodyParser.json());
app.use('/message', messageRoutes);
app.use('/register', registerRoutes);
app.use('/auth', authRoutes);
swaggerSetup(app);

// Redirigir todas las rutas que no sean API al index.html del frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${PORT}`);
});
