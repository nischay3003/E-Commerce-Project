const Banner = require('../models/bannersModel');


async function createBanner(req, res) {
    try {
        const { imageUrl, title, link } = req.body;
        const banner = await Banner.create({ imageUrl, title, link });
        return res.status(201).json({ message: "Banner created successfully", banner });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Banner creation failed" });
    }
}

async function getBanners(req, res) {
    try {
        const banners = await Banner.findAll({ order: [["createdAt", "DESC"]] });
        return res.status(200).json(banners);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to fetch banners" });
    }
}


async function getBannerById(req, res) {
    try {
        const { id } = req.params;
        const banner = await Banner.findByPk(id);
        if (!banner) return res.status(404).json({ message: "Banner not found" });
        return res.status(200).json(banner);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to fetch banner" });
    }
}


async function updateBanner(req, res) {
    try {
        const { id } = req.params;
        const { imageUrl, title, link } = req.body;

        const banner = await Banner.findByPk(id);
        if (!banner) return res.status(404).json({ message: "Banner not found" });

        await banner.update({ imageUrl, title, link });
        return res.status(200).json({ message: "Banner updated successfully", banner });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Banner update failed" });
    }
}

async function deleteBanner(req, res) {
    try {
        const { id } = req.params;
        const banner = await Banner.findByPk(id);
        if (!banner) return res.status(404).json({ message: "Banner not found" });

        await banner.destroy();
        return res.status(200).json({ message: "Banner deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Banner deletion failed" });
    }
}

module.exports = {
    createBanner,
    getBanners,
    getBannerById,
    updateBanner,
    deleteBanner
};
