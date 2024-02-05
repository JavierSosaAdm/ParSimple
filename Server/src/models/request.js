const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
    dataBase.define('Request', {
        id_request: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        products: {
            type: DataTypes.JSON,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "pending"
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_payment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        total_amount: {
            type: DataTypes.NUMERIC,
            allowNull: false
        }
    }, 
    {
        freezeTableName: true,
        timestamps: false,
        createdAt:false,
        updatedAt:false
    })
};