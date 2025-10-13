const PromoCode = require("../models/promoCode");

const getRecord = async (query) => {
  try {
    const promocode = await PromoCode.findOne(query);
    return promocode;
  } catch (error) {
    console.error("Error fetching promocode:", error);
    throw error;
  }
};

const getRecords = async (query) => {
  try {
    const promocodes = await PromoCode.find(query);
    return promocodes;
  } catch (error) {
    console.error("Error fetching promocodes:", error);
    throw error;
  }
};

module.exports = { getRecord, getRecords };
