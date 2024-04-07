const { Op, where } = require("sequelize");
const { Product, Category, User, Type } = require('../db');


const getAllProductController = async (name, type, minPrice, maxPrice, category, size, is_Delete, order) => {
    console.log(name, type, minPrice, maxPrice, category, size, is_Delete, order);
    
    let whereClause = {};
    
    if(name) {
        whereClause.name = {
            [Op.iLike]: `%${name}%`
        }
    }

    if(category) {
        whereClause.category = category 
    }
    if(type) {
        whereClause.type = type
    }
    
    if(is_Delete) {
        whereClause.is_Delete = is_Delete
    }
    
    if (size) {
        whereClause.size = size
    }

    if (minPrice && maxPrice) {
        whereClause.price = {
            [Op.between]: [minPrice, maxPrice]
        }; 
    } else if (maxPrice) {
        if (minPrice) {
            whereClause.price = {
                [Op.between]: [minPrice, maxPrice]
            };
        } else {
            whereClause.price = {
                [Op.lte]: maxPrice
            };
        }
    } else if (minPrice) {
        whereClause.price = {
            [Op.gte]: minPrice
        };
    }
        
    let orderBy = [];

    if (order === 'ASC') {
        orderBy = [['name', 'ASC']]
    } else if (order === 'DESC') {
        orderBy = [['name', 'DESC']]
    } else if (order === 'priceASC') {
        orderBy = [['price', 'ASC']]
    } else if (order === 'priceDESC') {
        orderBy = [['price', 'DESC']]
    } else if (orderBy.length === 0) {
        orderBy.push(['name', 'ASC']);
    }

    // console.log(where, order);
    const allProduct = await Product.findAll({
        where: whereClause,
        order: orderBy.length > 0 ? orderBy : undefined,
        include: [{
            model: User
        }]
    });
    
    return allProduct;
}

// const getAllProductController = async (name, type, minPrice, maxPrice, category, size, is_Delete, order) => { //Funciona
    
//     console.log(name, type, minPrice, maxPrice, category, size, is_Delete, order);

//     const whereClause={}

//     if(name) {
//         whereClause.name = {
//             [Op.iLike]: `${name}`
//         }
//     }


//     if (minPrice && maxPrice) {
//         whereClause.price = {
//             [Op.between]: [minPrice, maxPrice]
//         } 
//     } else if (minPrice) {
//         whereClause.price = {
//             [Op.gte]: minPrice
//         }       
//     } else if (maxPrice) {
//         whereClause.price = {
//             [Op.Ite]: maxPrice
//         }
//     }

//     let orderBy = [];

//     if (order === 'name_ASC') {
//         orderBy = [['name', 'ASC']]
//     } else if (order === 'name_DESC') {
//         orderBy = [['name', 'DESC']]
//     } else if (order === 'price_ASC') {
//         orderBy = [['price', 'ASC']]
//     } else if (order === 'price_DESC') {
//         orderBy = [['price', 'DESC']]
//     }

//     if(Object.keys(whereClause).length === 0){
//         const response = await Product.findAll({
//             order: orderBy.length > 0 ? orderBy : undefined,
//             include: [{
//                 model: User,
//                 through: 'user_product' // Asegúrate de especificar el nombre correcto de la tabla intermedia
//             }]
//         })
//         return response
//     } else {
//         const response = await Product.findAll({
//             where: whereClause,
//             order: orderBy.length > 0 ? orderBy : undefined,
//             include: [{
//                 model: User,
//                 through: 'user_product' // Asegúrate de especificar el nombre correcto de la tabla intermedia
//             }]
            
//         })
//         return response
//     }
// };



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
            const category = await Category.findOne({
                where: {
                    name: newProduct.name,
                }
            })

            if (category) {
                newProduct.setCategory(category)          }
                console.log(newProduct);
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
