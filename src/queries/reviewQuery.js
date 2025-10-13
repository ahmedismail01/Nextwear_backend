const Review = require("../models/reviews");

const getRecord = async (query) => {
  try {
    const review = await Review.findOne(query);
    return review;
  } catch (error) {
    console.error("Error fetching review:", error);
    throw error;
  }
};

const getRecords = async (query) => {
  try {
    const reviews = await Review.find(query);
    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

module.exports = { getRecord, getRecords };
