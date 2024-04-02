const { Payment } = require("../db");

const getPaymentsController = async () => {
    const allPayments = await Payment.findAll();
    console.log('estos son todos los pagos: ', allPayments);
    return allPayments;
};

const getPaymentByIdController = async (id_payment) => {
    const paymentId = await Payment.findByPk(id_payment);
    console.log('este es el pago solicitado por id: ', paymentId);
    return paymentId;
};

const postPaymentController = async (data) => {
    // console.log('esto es el pago: ', data);
    try {
        const [ payment, newPayment ] = await Payment.findOrCreate({
            where: {
                id_paymentMP: data.id_paymentMP
            },
            defaults: data
        })
        // console.log('esto es el newPago: ', newPayment);
        if (newPayment) {
            return newPayment
        }
        return payment
    } catch (error) {
        console.error('Error en postProductController:', error)
        throw error;
    }
};

module.exports = {
    getPaymentsController,
    getPaymentByIdController,
    postPaymentController
};