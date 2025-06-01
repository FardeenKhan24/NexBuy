const express = require('express');
const router = express.Router();
const { createProducts, getAllProducts } = require('../controllers/productController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', createProducts);

router.get('/', getAllProducts);

module.exports = router;
