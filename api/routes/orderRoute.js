const express = require("express");
const {createOrder, getOrderById, updateOrderStatus} = require("../controllers/orderController");
const verifyToken = require("../utils/verifyUser");


const router = express.Router();
// Create a new order
router.post("/orders", verifyToken, createOrder);

// Get order by ID
router.get("/orders/:id", verifyToken, getOrderById);

// // Update order status
router.put("/orders/:id", verifyToken, updateOrderStatus);

// // Delete order
// router.delete("/orders/:orderId", verifyToken, deleteOrder);
module.exports = router;
