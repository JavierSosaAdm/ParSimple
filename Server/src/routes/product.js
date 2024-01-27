const { Router } = require("express");

const {
    getAllProduct,
    getProductByID,
    getProductByName,
    putProduct,
    deleteProduct,
    postProduct
} = require('../hadlers/productHandler');

const productsRouter = Router();

productsRouter.get('/', getAllProduct)
              .get('/:id', getProductByID)
              .post('/', postProduct)
              .put('/:id', putProduct)
              .delete('/:id', deleteProduct)

module.exports= productsRouter;

