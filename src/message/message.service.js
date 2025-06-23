// src/message/message.service.js
const messages = [];

module.exports = {
  getAll: async () => {
    return messages;
  },
  create: async ({ nombre, email, mensaje }) => {
    const newMessage = { id: messages.length + 1, nombre, email, mensaje };
    messages.push(newMessage);
    return newMessage;
  },
};
