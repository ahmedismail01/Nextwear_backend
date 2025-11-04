const orderQuery = require("../queries/orderQuery");
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

const getMyOrders = async (req, res) => {
  const userId = req.user.id;
  const { page, limit, sort, ...query } = req.query;
  const { offset } = paginate(req.query.page, req.query.limit);
  const orders = await orderQuery.getRecords(
    { ...query, user: userId },
    offset,
    limit
  );
  const pagination = paginationResponse(page, orders.count, limit);
  res
    .status(200)
    .json({ success: true, data: orders.orders, pagination: pagination });
};

const getMyOrder = async (req, res) => {
  const userId = req.user.id;
  const orderId = req.params.id;
  const order = await orderQuery.getRecord({ _id: orderId, user: userId });
  res.status(200).json({ success: true, data: order });
};

const createOrder = async (req, res) => {
  const userId = req.user.id;
  const order = await orderService.createOrder(userId, req.body);
  res.status(200).redirect(order.paymentLink);
};

const cancelOrder = async (req, res) => {
  const orderId = req.params.id;
  const order = await orderCommand.cancelOrder(orderId);
  res.status(200).json({ success: true, data: order });
};

module.exports = {
  getAllOrders,
  getOrder,
  changeOrderStatus,
  getMyOrders,
  getMyOrder,
  createOrder,
  cancelOrder,
};
