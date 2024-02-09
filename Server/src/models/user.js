const { DataTypes } = require('sequelize');

module.exports = (dataBase) => {
    dataBase.define(
        'User', {
            uid: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true
            },
            phone: {
                type: DataTypes.NUMERIC,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false
            },
            is_Admin: {
                type: DataTypes.BOOLEAN,
                defaultvalue: false
            },
            is_Delete: {
                type: DataTypes.BOOLEAN,
                defaultvalue: false
            },
            isBlocked:{
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            payment_code:{
                type:DataTypes.STRING,
                allowNull: true,
            }
        },
        {
            freezeTableName: true,
            timestamps: false,
            createdAt: false,
            updatedAt: false
        }
    )
};