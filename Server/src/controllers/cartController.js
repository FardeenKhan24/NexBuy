const Cart = require("../models/Cart");

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.product');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  const { productId } = req.body; 
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [] });
    }

    const existingItem = cart.items.find(item =>
      item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ product: productId, quantity: 1 });
    }

    await cart.save();
    const populatedCart = await Cart.findOne({ userId: req.user.id }).populate('items.product');
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);

    await cart.save();
    cart = await Cart.findOne({ userId: req.user.id }).populate('items.product');
    res.json({ items: cart.items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const increaseQuantity = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(item => item._id.toString() === req.params.itemId);
    if (item) {
      item.quantity += 1;
    } else {
      return res.status(404).json({ message: "Item not found in the cart" });
    }

    await cart.save();
    const updatedCart = await Cart.findOne({ userId: req.user.id }).populate('items.product');
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const decreaseQuantity = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(item => item._id.toString() === req.params.itemId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
    } else {
      return res.status(400).json({ message: "Quantity cannot be less than 1" });
    }

    await cart.save();
    const updatedCart = await Cart.findOne({ userId: req.user.id }).populate('items.product');
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
};
