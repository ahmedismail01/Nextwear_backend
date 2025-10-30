const promocodeCommand = require("../commands/promoCodeCommand");
const promocodeQuery = require("../queries/promoCodeQuery");
class PromoCodeService {
  async redeem(code) {
    return await promocodeCommand.redeem(code);
  }

  async create(data) {
    const existingPromocode = await promocodeQuery.getRecord({
      code: data.code,
    });
    if (existingPromocode) {
      const error = new Error("Promo code already exists");
      error.statusCode = 400;
      error.isCustom = true;
      throw error;
    }

    return await promocodeCommand.createRecord(data);
  }
}

module.exports = new PromoCodeService();
