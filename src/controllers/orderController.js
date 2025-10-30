const orderQuery = require("../queries/orderQuery");
// const orderCommand = require("../commands/orderCommand");
const { paginate, paginationResponse } = require("../utils/paginate");
const parseSortParam = require("../utils/parseSortParam");
const orderService = require("../services/orderService");

const getAllOrders = async (req, res) => {
  const { page, limit, sort, ...query } = req.query;

  const { offset } = paginate(page, limit);

  const sortObj = parseSortParam(sort);

  const orders = await orderQuery.getRecords(query, offset, limit, sortObj);

  const paginatedResponse = paginationResponse(page, orders.count, limit);
  res.status(200).json({
    success: true,
    data: orders?.orders || [],
    pagination: paginatedResponse,
  });
};

const getOrder = async (req, res) => {
  const orderId = req.params.id;
  const order = await orderQuery.getRecord({ _id: orderId });
  res.status(200).json({ success: true, data: order });
};

const changeOrderStatus = async (req, res) => {
  const orderId = req.params.id;
  const order = await orderService.changeOrderStatus(orderId, req.body.status);
  res.status(200).json(order);
};

module.exports = {
  getAllOrders,
  getOrder,
  changeOrderStatus,
};
