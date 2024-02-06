const { 
    getPaymentsController,
    getPaymentByIdController,
    postPaymentController } = require("../controllers/paymentController");


const getAllPatments = async (req, res) => {
    try {
        const allPayments = await getPaymentsController();
        return res.status(200).json(allPayments);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

const getPaymentById = async (req, res) => {
    const {id_payment} = req.params;
    try {
        const paymentId = await getPaymentByIdController(id_payment);
        console.log(paymentId);
        return res.status(200).json(paymentId);
        
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

const postPayment = async (req, res) => {
    const { id_payment, user_name, user_email, id_paymentMP, total_amount } = req.body;
    try {
        const data = {
            id_payment: id_payment,
            user_name: user_name,
            user_email: user_email,
            id_paymentMP: id_paymentMP,
            total_amount: total_amount
        }

        const newPayment = await postPaymentController(data);
        return res.status(200).json(newPayment)

    } catch (error) {
        return res.status(400).json({error: error.message})
    }
};

module.exports = {
    getAllPatments,
    getPaymentById,
    postPayment
};