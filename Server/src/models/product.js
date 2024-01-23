const { DataTypes } = require('sequelize');

module.exports = (dataBase) => {
    dataBase.define(
        'Product', {
            id_product: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true 
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            size: {
                type: DataTypes.STRING,
                allowNull: true
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true
            },
            phone: {
                type: DataTypes.NUMERIC,
                allowNull: true
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false
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