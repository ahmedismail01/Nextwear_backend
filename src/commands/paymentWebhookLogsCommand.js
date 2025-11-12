const PaymentWebhookLogs = require("../models/paymentWebhookLogs");
const AppError = require("../utils/appError");

const createRecord = async (data) => {
  try {
    const rec = new PaymentWebhookLogs(data);
    await rec.save();
    return rec;
  } catch (error) {
    console.error("Error creating payment webhook log:", error);
    throw error;
  }
};

const updateRecord = async (query, updateData) => {
  try {
    const rec = await PaymentWebhookLogs.findOneAndUpdate(query, updateData, {
      new: true,
    });

    if (!rec) {
      throw new AppError("Payment webhook log not found", 404, true);
    }

    return rec;
  } catch (error) {
    console.error("Error updating payment webhook log:", error);
    throw error;
  }
};

const deleteRecord = async (query) => {
  try {
    const result = await PaymentWebhookLogs.findOneAndDelete(query);

    if (!result) {
      throw new AppError("Payment webhook log not found", 404, true);
    }

    return result;
  } catch (error) {
    console.error("Error deleting payment webhook log:", error);
    throw error;
  }
};

module.exports = { createRecord, updateRecord, deleteRecord };
