const Order = require("../models/order");

const createRecord = async (data) => {
  try {
    const rec = new Order(data);
    await rec.save();
    return rec;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

const updateRecord = async (query, updateData) => {
  try {
    const rec = await Order.findOneAndUpdate(query, updateData, { new: true });
    return rec;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

const deleteRecord = async (query) => {
  try {
    const result = await Order.findOneAndDelete(query);
    return result;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

module.exports = { createRecord, updateRecord, deleteRecord };
