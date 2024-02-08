const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
    dataBase.define('Send' , {
        id_send: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        id_user: {
            type: DataTypes.UUID,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false    
        },
        dispatch_method: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shipping: {
            type: DataTypes.NUMERIC,
            allowNull: false    
        }
    })
}