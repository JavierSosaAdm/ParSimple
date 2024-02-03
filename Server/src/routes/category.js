const { Router } = require("express");

const {
    getAllCategories
} = require("../hadlers/categoryHandler");

const categoryRouter = Router();

categoryRouter.get('/', getAllCategories)
               

module.exports = categoryRouter;