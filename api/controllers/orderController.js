const Order = require("../models/order");
const orderQueue = require("../utils/orderQueue");
const createOrder = async (req, res, next) => {
  const { customer, items, totalPrice } = req.body;
  if (
    customer.email !== req.user.email
  ) {
    return res.status(400).json({
      message: "Customer email do not match the logged-in user.",
    });
  }

  try {
    const order = new Order({
      userId: req.user.id,
      customer,
      items,
      totalPrice,
      status: "pending",
    });

    await order.save();

    await orderQueue.add(
      { orderId: order._id, nextStatus: "Preparing" },
      { delay: 5000 } 
    );
    await orderQueue.add(
      { orderId: order._id, nextStatus: "Out for Delivery" },
      { delay: 15000 }
    );
    await orderQueue.add(
      { orderId: order._id, nextStatus: "Delivered" },
      { delay: 30000 }
    );

    res.status(201).json({ message: "Order placed successfully!", order });
  } catch (error) {
    next(error);
  }
};



const getOrderById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order status updated", updatedOrder });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createOrder,
  getOrderById,
  updateOrderStatus,};

