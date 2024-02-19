const { Router } = require("express");
const { sendMessage, deleteMessage, getMessage } = require("../hadlers/messageHandler");

const messageRouter = Router();

messageRouter.get('/', getMessage)
             .post('/', sendMessage)
             .delete('/:id', deleteMessage)

module.exports = messageRouter;