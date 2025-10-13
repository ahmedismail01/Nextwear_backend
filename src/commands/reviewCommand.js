const Review = require("../models/reviews");

const createRecord = async (data) => {
  try {
    const rec = new Review(data);
    await rec.save();
    return rec;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

const updateRecord = async (query, updateData) => {
  try {
    const rec = await Review.findOneAndUpdate(query, updateData, { new: true });
    return rec;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

const deleteRecord = async (query) => {
  try {
    const result = await Review.findOneAndDelete(query);
    return result;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

module.exports = { createRecord, updateRecord, deleteRecord };
