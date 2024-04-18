const { Router } = require("express");

const {
    addFavorites,
    getFavProduct,
    getFavProductID,
    removeFavProduct
} = require("../hadlers/favoritesHandler");

const favoritesRouter = Router();

favoritesRouter.get('/:uid', getFavProduct)
               .get('/:uid', getFavProductID)
               .post('/:uid', addFavorites)
               .delete('/:uid', removeFavProduct)

module.exports = favoritesRouter;