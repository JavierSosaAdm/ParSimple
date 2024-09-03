require("dotenv").config(); 
const { URL_FRONT } = process.env;
const mercadopago = require("mercadopago")
const {
    getAllProductController,
    getProductByIDController,
    putProductController,
    deleteProductController,
    postProductController
} = require('../controllers/productController')

const getAllProduct = async(req, res) => {
    const {name, type, minPrice, maxPrice, category, size, is_Delete, order} = req.query;

    try {
        const result = await getAllProductController(name, type, minPrice, maxPrice, category, size, is_Delete, order);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
};

const getProductByID = async(req, res) => {
    const {id} = req.params;

    try {
        const producID = await getProductByIDController(id);
        return res.status(200).json(producID)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
};

const putProduct = async(req, res) => {
    const {id} = req.params;
    const { name, price, image, size, description, rating, reviewsCount, category, stock_quantity, is_Delete } = req.body;
    try {
        const data = {
            name: name, 
            price: price, 
            image: image, 
            size: size,
            description: description, 
            rating: rating, 
            reviewsCount: reviewsCount, 
            category: category, 
            stock_quantity: stock_quantity, 
            is_Delete: is_Delete 
        }
        const editProduct = await putProductController(id, data)
        return res.status(200).json(editProduct);
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
};

const deleteProduct = async(req, res) => {
    const {id} = req.params;
    try {
        const productDelete = await deleteProductController(id)
        return res.status(200).json({message: `El producto ${productDelete.name} fue eliminado correctamente`})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
};

const postProduct = async (req, res) => {
    const { id_product, name, price, image, size, description, rating, reviewsCount, category, type, stock_quantity, is_Delete } = req.body;
    try {
        const data = { 
            id_product: id_product, 
            name: name, 
            price: price, 
            image: image, 
            size: size,
            description: description, 
            rating: rating, 
            reviewsCount: reviewsCount, 
            category: category,
            type: type, 
            stock_quantity: stock_quantity, 
            is_Delete: is_Delete 
        }
        const newProduct = await postProductController(data)
        return res.status(200).json(newProduct)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
};

const createPreference = async (req, res) => {
    mercadopago.configure({
        access_token: "TEST-175874241100805-050815-a3242323713da8a5666799071a319883-1501134427"
    })

    const {description, price, quantity, uid}=req.body
    let preference = {
        items:[
            {
                title: description,
                unit_price: Number(price),
				quantity: quantity,
            }
        ],
        back_urls: {
			"success": `${URL_FRONT}`,
			"failure": `${URL_FRONT}`,
			"pending": `${URL_FRONT}`
		},
        external_reference:`${uid}`,
		auto_return: "approved",
    };
    mercadopago.preferences.create(preference)
    .then(function(response) {
        res.json({
            id: response.body.id
        });
    })
    .catch(function(error) {
        console.log(error);
    });
};

module.exports = {
    getAllProduct,
    getProductByID,
    putProduct,
    deleteProduct,
    postProduct,
    createPreference
};


