const { Router } = require('express');

const usersRouter = require('./users')
const productsRouter = require('./products')

const mainRouter = Router();

mainRouter.use('/users', usersRouter);
mainRouter.use('/products', productsRouter);

module.exports = mainRouter;
