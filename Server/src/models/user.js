const { DataTypes } = require('sequelize');

module.exports = (dataBase) => {
    dataBase.define(
        'User', {
            uid: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
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