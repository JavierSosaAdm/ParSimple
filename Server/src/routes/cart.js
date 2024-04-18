const { Router } = require("express");
const { getCartById, putCart } = require("../hadlers/cartHandler");

const cartRouter = Router();

cartRouter.get('/:id_cart', getCartById)
          .put('/:id_cart', putCart)

module.exports = cartRouter;

