const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} = require("../controllers/cartController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.get("/", verifyToken, getCart);
router.post("/add", verifyToken, addToCart);
router.delete("/remove/:itemId", verifyToken, removeFromCart);
router.put("/increase/:itemId", verifyToken, increaseQuantity);
router.put("/decrease/:itemId", verifyToken, decreaseQuantity);
router.delete("/clear", verifyToken, clearCart);

module.exports = router;
