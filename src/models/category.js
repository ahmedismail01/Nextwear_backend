const mongoose = require("mongoose");
const slugify = require("slugify");

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  slug: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

CategorySchema.pre(["save", "update"], function (next) {
  if (!this.isModified("name")) return next();

  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
    trim: true,
  });

  next();
});

CategorySchema.pre("findOneAndUpdate", function (next) {
  if (this._update.name) {
    this._update.slug = slugify(this._update.name, {
      lower: true,
      strict: true,
      trim: true,
    });
  }
  next();
});

module.exports = mongoose.model("Category", CategorySchema);
