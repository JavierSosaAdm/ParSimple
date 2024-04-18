const { getTypesController } = require("../controllers/typeControllers");

const getTypes = async (req, res) => {
    try {
        const allTypes = await getTypesController();
        res.status(200).json(allTypes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {getTypes};