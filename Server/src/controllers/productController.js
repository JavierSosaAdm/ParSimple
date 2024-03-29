const { Op } = require("sequelize");
const { Product, Categorie } = require('../db');

const getAllProductController = async () => { //Funciona
    const allProduct = await Product.findAll();
    return allProduct;
};

const getProductNameController = async () => {};

const getProductByIDController = async (id) => { //funcona
    const productID = await Product.findByPk(id);
    return productID;
};

const putProductController = async (id, data) => { //funcona
    
    try {
        const productID = await Product.findByPk(id);
       
        const updateProduct = await productID.update(data);
       
        return updateProduct;
        
    } catch (error) {
        console.error('Error en postProductController:', error);
        
        throw error;
    }
};

const deleteProductController = async (id) => { // funciona
    const productID = await Product.findByPk(id);
    productID.destroy()
    return productID;
};

const postProductController = async (data) => { //funciona
    
   try {
    const [product, newProduct] = await Product.findOrCreate({
        
        where: {
            name: data.name,
        },
        defaults: data
    });
    console.log('esto es newProduct: ►', newProduct);
        if (newProduct) {
            // Si el producto es recién creado, también crea un carrito y asócialo
            const categorie = await Categorie.findOne({
                where: {
                    name: newProduct.name,
                }
            })

            if (categorie) {
                newProduct.setCategorie(categorie)          }
            return newProduct;
        }
        return product
   } catch (error) {
        console.error('Error en postProductController:', error);
        
        throw error;
   }
};

module.exports = {
    getAllProductController,
    getProductNameController,
    getProductByIDController,
    putProductController,
    deleteProductController,
    postProductController
};
