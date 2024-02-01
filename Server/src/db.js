const { Sequelize } = require('sequelize');
const userModel = require('./models/produtc');
const productModel = require('./models/user');
const product = require('./models/user');

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

userModel(dataBase)
productModel(dataBase)

// Relaciones

const { Product, User } = dataBase.models;

//*un usuario puede comprar varios productos y un producto puede ser comprado por varios usuarios
User.belongsToMany(Product, {through: 'user_product'})
Product.belongsToMany(User, {through: 'user_product'})

module.exports = {
    ...dataBase.models,
    dataBase
}