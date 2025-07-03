// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Mensajes',
      version: '1.0.0',
      description: 'Documentación de la API de Mensajes con Express y Swagger',
    },
  },
  apis: [
    './src/message/message.controller.js',
    './src/register/register.controller.js',
    './src/auth/auth.controller.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
