const { Router } = require('express');

const usersRouter = require('./users')
const productRouter = require('./product')

const mainRouter = Router();

mainRouter.use('/users', usersRouter);
mainRouter.use('/products', productRouter);

