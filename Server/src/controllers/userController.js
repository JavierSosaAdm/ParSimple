const { User } = require('../db')
const { Op } = require("sequelize");

const getAllUserController = async () => {
    const users = await User.findAll()
    return users;
};

// const getUserNameController = () => {};

const userIDController = async (id) => {
    const userId = await User.findByPk(id)
    return userId;
};

const putUserController = async (id, data) => {
    const findUserById = await User.findByPk(id);   
    const upDatedUser = await findUserById.update(data);
    return upDatedUser;
};

const deleteUserController = async (id) => {
    const findUserById = await User.findByPk(id); 
    await findUserById.destroy();

    return findUserById;
};

const postUserController = async (data) => {
    console.log('esto es data: ', data);
    try {
        const [user, created] = await User.findOrCreate({
            where: {
                email: data.email
            },
            defaults: data,
        });
        if (created) {
            // Si el usuario es recién creado, también crea un carrito y asócialo
            console.log('esto es created:' , created);
            return created;
        }
        return user
    } catch (error) {
        console.error('Error en postUserController:', error);
        throw error;
    }
};

module.exports = {
    getAllUserController,
    // getUserNameController,
    userIDController,
    putUserController,
    deleteUserController,
    postUserController
};
