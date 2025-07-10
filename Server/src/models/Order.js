const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ecommerce-user",
    required: true,
  },
  userName: String,
  userEmail: String,
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", 
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  subtotal: Number,
  shipping: Number,
  total: Number,
  orderDate: String,
  arrivalDate: String,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
