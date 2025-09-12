const Review = require("../models/reviewsModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");


async function addReview(req, res) {
    try {
        const { rating, comment, productId, userId } = req.body;
        //check product exist
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        //check user has reviewed this product earlier
        const existingReview = await Review.findOne({ where: { productId, userId } });
        if (existingReview) {
            return res.status(400).json({ message: "You already reviewed this product" });
        }

        const review = await Review.create({
            rating,
            comment,
            productId,
            userId,
        });

        return res.status(201).json({ message: "Review added successfully", review });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to add review" });
    }
}


async function deleteReview(req, res) {
    try {
        const {reviewId}=req.params;
        const {  userId } = req.body;

        const review = await Review.findByPk(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        //check whether the review which is asked to be deleted belongs to particular user
        if (review.userId !== userId) {
            return res.status(403).json({ message: "You are not allowed to delete this review" });
        }

        await review.destroy();
        return res.status(200).json({ message: "Review deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to delete review" });
    }
}


async function updateReview(req, res) {
    try {
        const {reviewId}=req.params;
        const {  userId, rating, comment } = req.body;

        const review = await Review.findByPk(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        // Check ownership
        if (review.userId !== userId) {
            return res.status(403).json({ message: "You are not allowed to update this review" });
        }

        review.rating = rating || review.rating;
        review.comment = comment || review.comment;

        await review.save();
        return res.status(200).json({ message: "Review updated successfully", review });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to update review" });
    }
}


async function getProductReviews(req, res) {
    try {
        const { productId } = req.params;

        const reviews = await Review.findAll({
            where: { productId },
            include: [{ model: User, attributes: ["id", "first_name","last_name"] }], //  reviewer info
            order: [["createdAt", "DESC"]],
        });

        return res.status(200).json({ reviews });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to fetch reviews" });
    }
}

module.exports = {
    addReview,
    deleteReview,
    updateReview,
    getProductReviews,
};
