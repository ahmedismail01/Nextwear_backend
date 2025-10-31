const orderQuery = require("../queries/orderQuery");
const orderCommand = require("../commands/orderCommand");
const AppError = require("../utils/appError");
class OrderService {
  async changeOrderStatus(orderId, status) {
    // check if order exists
    const order = await orderQuery.getRecord({ _id: orderId });
    if (!order) {
      throw new AppError("Order not found", 404, true);
    }

    if (order.status === status) {
      throw new AppError("Order status is already " + status, 400, true);
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
