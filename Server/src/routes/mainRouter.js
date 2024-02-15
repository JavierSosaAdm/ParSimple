const { Router } = require("express");

const usersRouter = require("./users");
const productsRouter = require("./products");
const categorieRouter = require("./category");
const cartRouter = require("./cart");
const paymentRouter = require("./payment");
const requestRouter = require("./request");
const favoritesRouter = require("./favorites");

const mainRouter = Router();

mainRouter.use('/users', usersRouter);
mainRouter.use('/products', productsRouter);
mainRouter.use('/categories', categorieRouter);
mainRouter.use('/cart', cartRouter);
mainRouter.use('/payment', paymentRouter);
mainRouter.use('/request', requestRouter);
mainRouter.use('/favorites', favoritesRouter);

module.exports = mainRouter;
