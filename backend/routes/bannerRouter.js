const express = require('express');
const router = express();
const {
    createBanner,
    getBanners,
    getBannerById,
    updateBanner,
    deleteBanner
} = require('../controllers/bannerController');
console.log("Helllllllooooooo")

router.post('/add', createBanner);
router.get('/', getBanners);
router.get('/:id', getBannerById);
router.put('/:id', updateBanner);
router.delete('/:id', deleteBanner);

module.exports = router;
