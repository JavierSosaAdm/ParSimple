const { Router } = require('express');

const usersRouter = require('./users');
const productsRouter = require('./products');
const categorieRouter = require('./category');
const cartRouter = require('./cart');

const mainRouter = Router();

mainRouter.use('/users', usersRouter);
mainRouter.use('/products', productsRouter);
mainRouter.use('/categories', categorieRouter);
mainRouter.use('/cart', cartRouter);

module.exports = mainRouter;
