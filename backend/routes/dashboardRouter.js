const express = require('express');
const  getDashboard  = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET /dashboard
router.get("/", authMiddleware, getDashboard);

module.exports = router;
