const { Router } = require("express");

const {
    getReview,
    createReview,
    updateReview,
    deleteReview
} = require("../hadlers/reviewHandler");

const reviewRouter = Router();

reviewRouter.get('/:productID', getReview)
            .post('/:productID', createReview)
            .put('/:productID', updateReview)
            .delete('/:productID', deleteReview);

module.exports = reviewRouter;