const { Router } = require("express");
const { getTypes } = require("../hadlers/typeHandlers");

const typeRouter = Router();

typeRouter.get('/', getTypes);

module.exports = typeRouter;