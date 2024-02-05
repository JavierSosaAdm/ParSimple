const { DataTypes } = require("sequelize"); 

module.exports = (dataBase) => {
    dataBase.define('Review', {
        id_review: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        coment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
        createdAt:false,
        updatedAt:false
    })
}