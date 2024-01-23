const { DataTypes } = require('sequelize');

module.exports = (dataBase) => {
    dataBase.define(
        'User', {
            uid:{
                type:DataTypes.STRING,
                primaryKey:true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            price: {
                type: DataTypes.NUMERIC,
                allowNull: false,
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