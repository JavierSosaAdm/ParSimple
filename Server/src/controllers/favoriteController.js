const { Op } = require("sequelize");
const { User, Product } = require("../db");

const getFavController = async (uid) => {
    const user = await User.findByPk(uid);
    console.log('esto es user', user);
    
    if (user) {
        const favorites = await User.getProduct();
        console.log('esto es favorites', favorites);
        if (favorites.length > 0) return favorites; 
        else return [];
    }
    else return 'Usuario no registrado';
};

const getFavByIDController = async (uid, id_product) => {
    const user = await User.findByPk(uid);

    if (user) {
        const favorites = await user.getPruduct();
        if (favorites.length > 0) {
            const products = favorites.find(favorite => favorite.id_product === id_product);
            console.log(favorites);
            return products ? true : false;
        }
         else return false;
    }
     else return 'El usuario no está registrado';
};

const addFavController = async (uid, id_product) => {
    const userID = await User.findByPk(uid);
    const producID = await Product.findByPk(id_product);

    if (userID && producID) {
        await userID.addProduct(producID);
        return { message: 'Producto agregado a favoritos', product: producID };
    }
};

const removeFavController = async (uid, id_product) => {
    const userID = await User.findByPk(uid);
    const producID = await Product.findByPk(id_product);

    if (userID && producID) {
        await userID.removeProduct(producID);
        return { message: 'Producto removido a favoritos', product: producID };
    }
};

module.exports = {
    getFavController,
    getFavByIDController,
    addFavController,
    removeFavController
};