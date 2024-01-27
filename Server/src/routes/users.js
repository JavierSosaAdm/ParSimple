const { Router } = require("express");

const {
    getAllUser,
    getUserByName,
    getUserByID,
    putUser,
    deleteUser,
    postUser
} = require('../hadlers/userHandler')

const usersRouter = Router();

usersRouter.get('/', getAllUser)
           .get('/:id', getUserByID)
           .post('/', postUser)
           .put('/:id', putUser)
           .delete('/:id', deleteUser)

module.exports = usersRouter;