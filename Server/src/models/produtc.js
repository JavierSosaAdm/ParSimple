const { DataTypes } = require('sequelize');

module.exports = (dataBase) => {
    dataBase.define(
        'Product', {
            id_product:{
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            size: {
                type: DataTypes.STRING,
                allowNull: false
            },
            rating: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            reviewsCount: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            stock_quantity: {
                type:DataTypes.INTEGER,
                allowNull: true
              },
            is_Delete: {
                type:DataTypes.BOOLEAN,
                defaultValue: false
            },

        },
        {
            freezeTableName: true,
            timestamps: false,
            createdAt:false,
            updatedAt:false
        }
    )
};