const { Category } = require("../db");

const fetchCategory = async () => {

    const categories = [
        {name: 'Todas'},
        {name: 'Classic'},
        {name: 'Grey'},
        {name: 'Black'},
        {name: 'Blue'},
    ]

    try {
        for (const category of categories) {
            const existingCategory = await Category.findOne({
                where: {
                    name: category.name
                }
            });
            if (!existingCategory) {
                await Category.create(category)
            }
        }

        console.log('Nueva categoría creada con éxito.');
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = { fetchCategory };