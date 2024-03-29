const { Sequelize } = require("sequelize");
const userModel = require("./models/produtc");
const productModel = require("./models/user");
const cartModel = require("./models/cart");
const categoryModel = require("./models/category");
const paymentModel = require("./models/payment");
const requestModel = require("./models/request");
const reviewModel = require("./models/review");

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
paymentModel(dataBase);
requestModel(dataBase);
reviewModel(dataBase);

// Relaciones

const { Product, User, Cart, Category, Payment, Request, Review } = dataBase.models;

//*un producto puede tener una categoria y una categoria puede tener varios productos 1:N
Category.hasMany(Product, { foreignKey: 'id_category' });
Product.belongsTo(Category, { foreignKey: 'id_category' });

//*Un usuario puede comprar varios productos, y un producto puede ser comprado por varios usuarios N:N
Product.belongsToMany(User, {through: 'user_product'});
User.belongsToMany(Product, {through: 'user_product'});

//*Un usuario puede tener varios productos de favoritos, y un producto puede ser favorito de varios usuarios N:N
User.belongsToMany(Product, {through: 'favorites'});
Product.belongsToMany(User, {through: 'favorites'});

//*Un usuario puede tener una sola card, y una card puede ser de solo un usuario 1:1
User.hasOne(Cart, { onDelete: 'CASCADE'});
Cart.belongsTo(User);

//*un usuario puede comprar varios productos y un producto puede ser comprado por varios usuarios N:N
Cart.belongsToMany(Product, {through: 'cart_product', onDelete: 'CASCADE'});
Product.belongsToMany(Cart, {through: 'cart_product', onDelete: 'CASCADE'});

//*Un pedido puede tener varios productos, y varios productos pueden tener al mismo tiempo varios pedidos N:N
Product.belongsToMany(Request, {through: 'request_product', onDelete: 'CASCADE'});
Request.belongsToMany(Product, {through: 'request_product', onDelete: 'CASCADE'});

//*Un usuario puede tener varios pagos, pero un pago solo puede pertenecer a un solo usuario N:1
User.hasMany(Payment, {foreignKey: "uid", onDelete: 'CASCADE'});
Payment.belongsTo(User, {foreignKey: "uid", onDelete: 'CASCADE'});

//*Un usuario puede hacer varios pedidos, y cada pedido pertenece a un solo usuario N:1
User.hasMany(Request, {foreignKey: "uid", onDelete: 'CASCADE'});
Request.belongsTo(User, {foreignKey: "uid", onDelete: 'CASCADE'});







module.exports = {
    ...dataBase.models,
    dataBase
}