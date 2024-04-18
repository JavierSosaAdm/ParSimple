const {
    getAllCategoriesController,
    // postCategorieController,
    // getCategorieByIDController,
    // deleteCategorieController,
    // putCategorieController
} = require('../controllers/categorieController');

const getAllCategories = async (req, res) => {
    try {
        const result = await getAllCategoriesController();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
};

// const postCategory = async (req, res) => {
//     const { id_category, name } = req.body;
//     try {
//         const data = { id_category, name };
//         const newCategory = await postCategoryController(data);
//         return res.status(200).json(newCategory);
//     } catch (error) {
//         return res.status(400).json({error: error.message});
//     }
// };

// const getCategoryByID = async (req, res) => {
//     const { id_category } = req.params;
    
//     try {
//         const categoryById = await getCategoryByIDController(id_category);
//         return res.status(200).json(categoryById);
//     } catch (error) {
//         return res.status(400).json({error: error.message});
//     }
// };

// const deleteCategory = async (req, res) => {
//     const { id_category } = req.params;
//     try {
//         const deleteCategory = await deleteCategoryController(id_category);
//         return res.status(200).json({message: `${deleteCategory} ha sido eliminada con éxito`});
//     } catch (error) {
//         return res.status(400).json({error: error.message});
//     }
// };

// const putCategory = async (req, res) => {
//     const { id_category } = req.params;
//     const { name } = req.body;
//     try {
//         const data = { name };
//         const putCategory = await putCategoryController(id_category, data);
//         return res.status(200).json(putCategory);
//     } catch (error) {
//         return res.status(400).json({error: error.message});
//     }
// };

module.exports = {
    getAllCategories,
    // postCategory,
    // getCategoryByID,
    // deleteCategory,
    // putCategory
};