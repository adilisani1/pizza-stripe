const Queue = require("bull");
const Order = require("../models/order");

const orderQueue = new Queue("orderQueue", {
  redis: { host: "127.0.0.1", port: 6379 },
});

orderQueue.process(async (job) => {
  const { orderId, nextStatus } = job.data;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: nextStatus },
      { new: true }
    );
    return updatedOrder;
  } catch (error) {
    console.error(`Error updating order ${orderId} status:`, error);
    throw error;
  }
});

module.exports = orderQueue;
