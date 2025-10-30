const PromoCode = require("../models/promoCode");

const createRecord = async (data) => {
  try {
    const rec = new PromoCode(data);
    await rec.save();
    return rec;
  } catch (error) {
    console.error("Error creating promocode:", error);
    throw error;
  }
};

const updateRecord = async (query, updateData) => {
  try {
    const rec = await PromoCode.findOneAndUpdate(query, updateData, {
      new: true,
    });
    return rec;
  } catch (error) {
    console.error("Error updating promocode:", error);
    throw error;
  }
};

const deleteRecord = async (query) => {
  try {
    const result = await PromoCode.findOneAndDelete(query);
    return result;
  } catch (error) {
    console.error("Error deleting promocode:", error);
    throw error;
  }
};

const redeem = async (code) => {
  try {
    const pc = await PromoCode.findOne({ code }).exec();
    if (!pc) {
      const error = new Error("Promo code not found");
      error.statusCode = 404;
      error.isCustom = true;
      throw error;
    }
    if (!pc.isActive) {
      const error = new Error("Promo code is not active");
      error.statusCode = 400;
      error.isCustom = true;
      throw error;
    }
    if (pc.expirationDate && pc.expirationDate < new Date()) {
      const error = new Error("Promo code has expired");
      error.statusCode = 400;
      error.isCustom = true;
      throw error;
    }
    if (pc.maxUses && pc.uses >= pc.maxUses) {
      const error = new Error("Promo code has reached its maximum uses");
      error.statusCode = 400;
      error.isCustom = true;
      throw error;
    }
    pc.uses = (pc.uses || 0) + 1;
    await pc.save();
    return pc;
  } catch (error) {
    console.error("Error redeeming promocode:", error);
    throw error;
  }
};

module.exports = { createRecord, updateRecord, deleteRecord, redeem };
