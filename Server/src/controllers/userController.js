const { User, Cart, Request, Product, Payment } = require('../db')
const { Op } = require("sequelize");

const getAllUserController = async () => {
    const users = await User.findAll({
        include: [Cart, Request, Product, Payment]
    })
    return users;
};


const getUserNameController = async (name)=>{
    
    const result = await User.findAll({
        where : {
            name: {[Op.iLike]: `%${name}%`}
        } 
    })
    console.log('esto es result: ', result);
    return result
}

const userIDController = async (id) => {
    const userId = await User.findByPk(id, {
        include: [Cart, Request, Product, Payment]
    })
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
    getUserNameController,
    userIDController,
    putUserController,
    deleteUserController,
    postUserController
};

// const getUserNameController = async (name) => {
//     const nameLower = name.toLowerCase();
//     const name2 = nameLower.charAt(0).toUpperCase() + nameLower.slice(1)

//     const nameUser = await User.findAll({
//         where: {
//             name: {[Op.iLike]: `${name2}` },
//         }
//     });
//     const lastNameUser = await User.findAll({
//         where: {
//             lastName: {[Op.iLike]: `${name2}`}
//         }
//     });

//     const nameDB = [...nameUser, ...lastNameUser]
//     const firterName = nameDB.filter(response => {
//         return response.name === name2
//         ? response.name === name2
//         : response.lastName === name2
//     })
//     return firterName;
// };