const { User, Message } = require("../db");

const getMessageController = async () => {
    const messages = await Message.findAll()
    return messages;
};

const sendMessageController = async (uid, message) => {
    
        const newMessage = await Message.create(message)
        return newMessage;
    
};

const deleteMessageController = async (id_message) => {
    
    const deleteMen = await Message.findByPk(id_message);
    await deleteMen.destroy();
    return deleteMen;

};

module.exports = { sendMessageController, deleteMessageController, getMessageController };