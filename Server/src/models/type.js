const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
    dataBase.define('Type', {
        id_type: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
        createdAt:false,
        updatedAt:false
    })
}