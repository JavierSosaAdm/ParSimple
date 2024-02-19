const { Type } = require("../db");

const types = [
    {name: 'Zapatillas'},
    {name: 'Ojotas'}
];
const fetchTypes = async () => {

    try {

        for (const type of types) {
            const typeName = await Type.findOne({
                where: {
                    name: type.name
                }
            })
            if (!typeName) {
                 await Type.create(type)
            }
        };
        console.log('nuevo tipo de calzado creado con éxito.');
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = fetchTypes;
