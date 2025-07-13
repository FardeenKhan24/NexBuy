const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ecommerce-user",
    required: true,
  },
  userName: String,
  userEmail: String,
  items: Array,
  subtotal: Number,
  shipping: Number,
  total: Number,
  orderDate: String,
  arrivalDate: String,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
