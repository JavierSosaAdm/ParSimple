const { Request } = require("../db");

const getRequestController = async () => {
    const allRequest = await Request.findAll();
    return allRequest;
};

const postRequestController = async (data) => {
    try {
        const [request, newRequest] = await Request.findOrCreate({
            where: {
                id_payment: data.id_payment
            },
            defaults: data
        })
        if (newRequest) {
            return newRequest;
        }
        return request;
    } catch (error) {
        console.error('Error en postRequestController:', error)
        throw error;
    }
};

module.exports = {
    getRequestController,
    postRequestController
}