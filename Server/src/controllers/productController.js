const Product = require('../models/Product');

exports.createProducts = async (req, res) => {
  try {
    const products = await Product.insertMany(req.body); 
    res.status(201).json(products);
  } catch (err) {
    console.error("Product insertion error:", err);
    res.status(500).json({ error: "Failed to insert products" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error("Fetch products error:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

