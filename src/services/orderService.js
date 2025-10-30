const orderQuery = require("../queries/orderQuery");
const orderCommand = require("../commands/orderCommand");
class OrderService {
  async changeOrderStatus(orderId, status) {
    // check if order exists
    const order = await orderQuery.getRecord({ _id: orderId });
    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      error.isCustom = true;
      throw error;
    }

    if (order.status === status) {
      const error = new Error("Order status is already " + status);
      error.statusCode = 400;
      error.isCustom = true;
      throw error;
    }

    // change order status
    const changedOrder = await orderCommand.updateRecord(
      { _id: orderId },
      { status }
    );

    // send notification to the user

    return changedOrder;
  }
}

module.exports = new OrderService();
