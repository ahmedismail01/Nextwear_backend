const PromoCode = require("../models/promoCode");
const AppError = require("../utils/appError");

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
      throw new AppError("Promo code not found", 404, true);
    }
    if (!pc.isActive) {
      throw new AppError("Promo code is not active", 400, true);
    }
    if (pc.expirationDate && pc.expirationDate < new Date()) {
      throw new AppError("Promo code has expired", 400, true);
    }
    if (pc.maxUses && pc.uses >= pc.maxUses) {
      throw new AppError("Promo code has reached its maximum uses", 400, true);
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
