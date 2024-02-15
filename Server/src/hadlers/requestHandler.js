
const {
    getRequestController,
    postRequestController
} = require("../controllers/requestController");

const getRequest = async (req, res) => {
    try {
        const request = await getRequestController();
        return res.status(200).json(request);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

const postRequest = async (req, res) => {
    const { id_request, products, date, status, address, id_payment, total_amount } = req.body;
    try {
        const data = {
            id_request: id_request,
            products: products,
            date: date,
            status: status,
            address: address,
            id_payment: id_payment,
            total_amount: total_amount
        }
        const newRequest = await postRequestController(data);
        return res.status(200).json(newRequest);

    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

module.exports = {
    getRequest,
    postRequest
}