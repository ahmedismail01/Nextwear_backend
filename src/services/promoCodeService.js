const promocodeCommand = require("../commands/promoCodeCommand");
const promocodeQuery = require("../queries/promoCodeQuery");
const AppError = require("../utils/appError");
class PromoCodeService {
  async redeem(code) {
    return await promocodeCommand.redeem(code);
  }

  async create(data) {
    const existingPromocode = await promocodeQuery.getRecord({
      code: data.code,
    });
    if (existingPromocode) {
      throw new AppError("Promo code already exists", 400, true);
    }

    return await promocodeCommand.createRecord(data);
  }
}

module.exports = new PromoCodeService();
