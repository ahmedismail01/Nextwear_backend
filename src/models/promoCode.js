const mongoose = require("mongoose");
const PromoCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true, min: 0, max: 100 },
  expirationDate: { type: Date, required: true },
  maxUses: { type: Number, required: true, min: 1 },
  uses: { type: Number, default: 0, min: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

PromoCodeSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});
module.exports = mongoose.model("Promocode", PromoCodeSchema);
