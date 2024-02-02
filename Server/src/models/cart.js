const { DataTypes } = require('sequelize');

module.exports = (dataBase) => {
    dataBase.define('Cart', {
        id_Cart: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        products: {
            type: DataTypes.JSON,
            defaultValue: [],
            allowNull: true
        },
        product_quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        total_price: {
            type: DataTypes.NUMERIC,
            defaultValue: 0
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
    )
};