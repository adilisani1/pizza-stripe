const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  customer: { type: Object, required: true },
  items: { type: Array, required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: [
      "pending",
      "preparing",
      "out_for_delivery",
      "delivered",
      "cancelled",
    ],
    default: "pending", 
  },
});

module.exports = mongoose.model("Order", orderSchema);
