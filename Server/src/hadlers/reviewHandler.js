const {
    getReviewController,
    getReviewIDController,
    putReviewController,
    deleteReviewController,
    postReviewController
} = require("../controllers/reviewController");

const getReview = async (req, res) => {
    const {productID} = req.params;
    const {reviewID} = req.query;
    try {
        const response = id_review? await getReviewIDController(productID, reviewID) : await getReviewController(productID);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
};

const createReview= async (req, res) => {
    const {productID} = req.params;
    const {userID} = req.query;
    const { rating, coment } = req.body;
    try {
        
        const response = await postReviewController(rating, coment, userID, productID);
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
};

const updateReview= async (req, res) => {
    const {productID} = req.params;
    const {reviewID} = req.query;
    const { rating, coment } = req.body;
    try {
        const updReview = await putReviewController(productID, reviewID, rating, coment)
        res.status(200).json(updReview)
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
};

const deleteReview = async (req, res) => {
    const {productID} = req.params;
    const {reviewID} = req.query;

    try {
        const response = await deleteReviewController(productID, reviewID);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
};

module.exports = {
    getReview,
    createReview,
    updateReview,
    deleteReview
};