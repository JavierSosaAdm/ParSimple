const { Category } = require('../db');

const getAllCategoriesController = async () => {
    const allCategories = await Category.findAll();
    return allCategories;
};

// const postCategorieController = async (data) => {
//     try {
//         const [ category, newCategory ] = await Category.findOrCreate({
//             where: {
//                 name: data.name
//             },
//             defaults: data
//         })
//         console.log('Esta es la nueva categoría: ', newCategorie);
//         if (newCategorie) {
//             return newCategorie;
//         }
//         return categorie;

//     } catch (error) {
//         console.error('Error en postCategorieController: ', error);

//         throw error;
//     }
// };


// const getCategorieByIDController = async (id_categorie) => {
//     const categorieById = await Category.findByPk(id_categorie);
//     console.log('esto es catégorybyId:', categorieById);
//     return categorieById;
// };

// const deleteCategorieController = async (id_categorie) => {
//     const categorieById = await Category.findByPk(id_categorie);
//     const deleteCat = await categorieById.destroy();
//     return deleteCat;
// };

// const putCategorieController = async (id_categorie, data) => {
//     try {
//         const categorieId = await Category.findByPk(id_categorie);
//         const updateCategorie = await categorieId.update(data);
//         return updateCategorie;
//     } catch (error) {
//         console.error('Error en putCategorieController:', error);
        
//         throw error;
//     }

// };

module.exports = {
    getAllCategoriesController,
    // postCategorieController,
    // getCategorieByIDController,
    // deleteCategorieController,
    // putCategorieController
}