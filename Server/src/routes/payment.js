const { Router } = require("express"); 
const {
    getAllPatments,
    getPaymentById,
    postPayment
} = require("../hadlers/paymentHandler")

const paymentRouter = Router();

paymentRouter.get('/', getAllPatments)
             .get('/:id', getPaymentById)
             .post('/', postPayment)

module.exports = paymentRouter;