const { Type, Product } = require("../db");

const getTypesController = async () => {
    const types = await Type.findAll({
        include: Product
    });
    return types
};

module.exports = { getTypesController };