const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ReviewSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});
module.exports = mongoose.model("Review", ReviewSchema);
