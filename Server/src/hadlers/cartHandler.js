const {getCartByIdController, updateCartController} = require('../controllers/cartController');

const getCartById = async (req, res) => {
    const { id_Cart } = req.params;
    try {
        const cartId = await getCartByIdController(id_Cart);
        console.log('id desde handlers', id_Cart);
        return res.status(200).json(cartId);
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
};

const putCart = async (req, res) => {
    
    const { id_Cart } = req.params;
    const { products, product_quantity, total_price } = req.body;

    try {
        const data = { 
            products: products,
            product_quantity: product_quantity,
            total_price: total_price
         }
         const updateCart = await updateCartController(id_Cart, data);
         return res.status(200).json(updateCart)
    } catch (error) {
        return res.status(400).json({error: error.message})
    } 
};

module.exports = { getCartById, putCart };