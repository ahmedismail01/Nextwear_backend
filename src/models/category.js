const mongoose = require("mongoose");
const slugify = require("slugify");

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  slug: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

function generateSlug(name) {
  return slugify(name, { lower: true, strict: true, trim: true });
}

CategorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = generateSlug(this.name);
  }
  next();
});

const updateSlugMiddleware = function (next) {
  if (this._update.name) {
    this._update.slug = generateSlug(this._update.name);
  }
  next();
};

CategorySchema.pre("findOneAndUpdate", updateSlugMiddleware);
CategorySchema.pre("updateOne", updateSlugMiddleware);

CategorySchema.pre("insertMany", function (next, docs) {
  docs.forEach((doc) => {
    if (doc.name) {
      doc.slug = generateSlug(doc.name);
    }
  });
  next();
});

module.exports = mongoose.model("Category", CategorySchema);
