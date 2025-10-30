const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: { type: String, required: true },
      purchasePrice: { type: Number, required: true, min: 0 },
      quantity: { type: Number, required: true, min: 1 },
      sku: { type: String },
    },
  ],
  finalPrice: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  reasonOfCancellation: { type: String },
  promocode: { type: mongoose.Schema.Types.ObjectId, ref: "Promocode" },
  canceledAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

OrderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Order", OrderSchema);
