const { Router } = require("express");

const {
    getRequest,
    postRequest
} = require("../hadlers/requestHandler");

const requestRouter = Router();

requestRouter.get('/', getRequest)
             .post('/', postRequest)

module.exports = requestRouter;