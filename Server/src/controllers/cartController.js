const { Cart } = require('../db');

const getCartByIdController = async (id_Cart) => {
    const cart = await Cart.findByPk(id_Cart)

    if (!cart) {
        return {
            message: `No hay carrito cin ese ID`
        }
    };
    return cart;
};

const updateCartController = async (id_Cart, data) => {

    console.log("id desde el controller", id_Cart)
    console.log("informacion de actualizacion", data)

    const cart = await Cart.findByPk(id_Cart);
    await cart.update(data)
    return cart;
};

module.exports = {
    getCartByIdController,
    updateCartController
};