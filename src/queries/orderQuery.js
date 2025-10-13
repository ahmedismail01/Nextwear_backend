const Order = require("../models/order");

const getRecord = async (query) => {
  try {
    const order = await Order.findOne(query);
    return order;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

const getRecords = async (query) => {
  try {
    const orders = await Order.find(query);
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

module.exports = { getRecord, getRecords };
