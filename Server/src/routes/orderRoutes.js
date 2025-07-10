const express = require('express');
const router = express.Router();
const { sendOrderEmail, getOrder } = require('../controllers/orderController');
const { verifyToken } = require("../middlewares/authMiddleware");

router.post('/send-order-email', verifyToken,sendOrderEmail);
router.get('/get-orders',verifyToken, getOrder);

module.exports = router;
