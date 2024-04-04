const {
     sendMessageController,
     deleteMessageController,
     getMessageController } = require("../controllers/messageController")

const getMessage = async (req, res) => {
    try {
        const allMessage = await getMessageController();
        res.status(200).json(allMessage);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};
const sendMessage = async (req, res) => {
    const { userName, text, timestamp } = req.body
    
    try {
        const message = {
            userName,
            text,
            timestamp
        }
        const send = await sendMessageController(message)
        res.status(200).json(send)      
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

const deleteMessage = async (req, res) => {
    const { uid } = req.params;
    const { id_message } = req.query;

    try {
        const deleteMessage = await deleteMessageController(uid, id_message)
        res.status(200).json(deleteMessage)      
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

module.exports = { sendMessage, deleteMessage, getMessage };