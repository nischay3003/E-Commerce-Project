const express=require("express");
const { getProductReviews, addReview, updateReview, deleteReview } = require('../controllers/reviewController');
const router=express();
router.get('/:productId',getProductReviews);
router.post('/',addReview);
router.put('/:reviewId',updateReview);
router.delete('/:reviewId',deleteReview);


module.exports=router;