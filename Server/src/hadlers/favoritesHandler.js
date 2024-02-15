const {
    getFavController,
    getFavByIDController,
    addFavController,
    removeFavController
} = require("../controllers/favoriteController");

const addFavorites = async (req, res) => {
    const { uid } = req.params; //ID del usuario 
    const { id_product } = req.query;

    try {
        const addFav = await addFavController(uid, id_product);
        console.log('esto es product:', addFav);
        res.status(200).json(addFav);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getFavProduct = async (req, res) => {
    const { uid } = req.params; //ID del usuario 
    const { id_product } = req.query;
    console.log('esto es el id de usuario en el handler: ', uid);
    console.log('esto es el id de pruducto en el handler: ', id_product);

    try {
        const getFav = id_product ? await getFavByIDController(id_product, uid) : await getFavController(uid);
        // console.log('esto es getFav: ',getFav);
        return res.status(200).json(getFav)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getFavProductID = async (req, res) => {
    const { uid } = req.params; //ID del usuario 
    const { id_product } = req.query;
    console.log(`HANDLER => uid:${uid}, id_product:${id_product}`);

    try {
        const product = await getFavByIDController(uid, id_product)
        
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const removeFavProduct = async (req, res) => {
    const { uid } = req.params; //ID del usuario 
    const { id_product } = req.query;
    try {
        const removed = await removeFavController(uid, id_product)
        res.status(200).json(removed);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    addFavorites,
    getFavProduct,
    getFavProductID,
    removeFavProduct
};