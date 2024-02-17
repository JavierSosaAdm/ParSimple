const { Review, Product } = require("../models/review");

const getReviewController = async (productID) => {
    const allReviews = await Review.findAll({
        where: {
            id_product: productID
        }
    });
    if (allReviews || allReviews.length > 0) return allReviews
    else return [];
    
};

const getReviewIDController = async (productID, reviewID) => {
    const review = await Review.findOne({
        where: {
            id_review: reviewID,
            id_product: productID
        }
    })
    if (review !== null) return review
    else return 'No se encontró ninguna reseña con ese ID';
};

const putReviewController = async (rating, coment, reviewID, productID) => {
    const reviewData = {
        rating: rating,
        coment: coment
    };
    const updateRev = await Review.update(reviewData, {where: {id_review: reviewID}});
    if (updateRev) {
        await updateProducRating(productID)
        return await Review.findOne({
            where: {
                id_product: productID,
                id_review: reviewID
            }
        })
    }
    else return 'Hubo un problema al actualizar';

};

const deleteReviewController = async (productID, reviewID) => {
    const deleteReview = await Review.destroy({
        where: {
            id_review: reviewID,
            id_product: productID
        }
    })
    if (deleteReview) {
        await updateProducRatingController(productID);
        return 'Review eliminado con éxito'
    }
    else return 'Error al eliminar Review'
};

const updateProducRatingController = async (productID) => {
    const review = await getReviewController(productID);
    let suma = 0;
    for (let i = 0; i < review.length; i++) {
        suma += review[i].rating;
    }
    const averageRating = review.length > 0 ? Math.round(suma/review.length) : 0;

    const product = await Product.findByPk(productID);
    product.rating = averageRating;
    await product.save();
};

const postReviewController = async (rating, coment, userID, productID) => {
    const reviewData = {
        rating: rating,
        coment: coment,
        uid: userID,
        id_product: productID
    };
    const newReview = await Review.create(reviewData);
    if (newReview) {
        await updateProductRating(productID)
        return newReview;
    }
    else return 'Hubo un problema al crear la review'
};

module.exports = {
    getReviewController,
    getReviewIDController,
    putReviewController,
    deleteReviewController,
    updateProducRatingController,
    postReviewController
};