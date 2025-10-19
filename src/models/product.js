const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  materials: [{ type: String }],
  variants: [
    {
      images: [{ type: String }],
      size: { type: String },
      color: { type: String },
      price: { type: Number, required: true, min: 0 },
      quantity: { type: Number, required: true, min: 0 },
    },
  ],
  discount: { type: Number, min: 0, max: 100, default: 0 },
  featured: { type: Boolean, default: false },
  averageRating: { type: Number, min: 0, max: 5, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ProductSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Product", ProductSchema);
