const { Sequelize } = require('sequelize');
const userModel = require('./models/produtc');
const productModel = require('./models/user');
const cartModel = require('./models/cart');
const categoryModel = require('./models/category');

require('dotenv').config();

const {
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_HOST,
    DB_PORT,
    DB_DIALECT
} = process.env;

const dataBase = new Sequelize(
    `${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    { logging : false }
)

userModel(dataBase);
productModel(dataBase);
cartModel(dataBase);
categoryModel(dataBase);
// Relaciones

const { Product, User, Cart, Category } = dataBase.models;

//*un producto puede tener una categoria y una categoria puede tener varios productos 1:N
Category.hasMany(Product, {foreignKey:"id_category"});
Product.belongsTo(Category, {foreignKey:"id_category"});

//*Un usuario puede comprar varios productos, y un producto puede ser comprado por varios usuarios N:N
User.belongsToMany(Product, {through: 'user_product'});
Product.belongsToMany(User, {through: 'user_product'});

//*Un usuario puede tener una sola card, y una card puede ser de solo un usuario 1:1
User.hasOne(Cart, { onDelete: 'CASCADE'});
Cart.belongsTo(User);

//*un usuario puede comprar varios productos y un producto puede ser comprado por varios usuarios N:N
Cart.belongsToMany(Product, {through: 'cart_product', onDelete: 'CASCADE'});
Product.belongsToMany(Cart, {through: 'cart_product', onDelete: 'CASCADE'});



module.exports = {
    ...dataBase.models,
    dataBase
}