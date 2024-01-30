const { DataTypes } = require('sequelize');

module.exports = (dataBase) => {
    dataBase.define(
        'Product', {
            id_product:{
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true 
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            price: {
                type: DataTypes.NUMERIC,
                allowNull: false,
            },
            size: {
                type: DataTypes.STRING,
                allowNull: true
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
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
                allowNull:true
              },
            is_Delete: {
                type:DataTypes.BOOLEAN,
                defaultValue: false
            }

        },
        {
            freezeTableName: true,
            timestamps: false,
            createdAt:false,
            updatedAt:false
        }
    )
};