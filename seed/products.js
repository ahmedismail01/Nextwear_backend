// seed for products
const productCommand = require("../src/commands/productCommand");
const productQuery = require("../src/queries/productQuery");

require("dotenv").config();

const sampleProducts = [
  {
    name: "Classic White Tee",
    description: "A comfortable classic white t-shirt made from breathable cotton.",
    materials: ["Cotton"],
    variants: [
      {
        images: ["https://example.com/images/white-tee-front.jpg"],
        size: "S",
        color: "White",
        price: 19.99,
        quantity: 150,
      },
      {
        images: ["https://example.com/images/white-tee-front.jpg"],
        size: "M",
        color: "White",
        price: 19.99,
        quantity: 200,
      },
    ],
    discount: 0,
    featured: true,
  },
  {
    name: "Blue Denim Jacket",
    description: "Stylish denim jacket with a relaxed fit and durable stitching.",
    materials: ["Denim", "Cotton"],
    variants: [
      {
        images: ["https://example.com/images/denim-jacket.jpg"],
        size: "M",
        color: "Blue",
        price: 79.99,
        quantity: 40,
      },
    ],
    discount: 10,
    featured: false,
  },
  {
    name: "Slim Fit Chinos",
    description: "Versatile slim-fit chinos suitable for casual and semi-formal wear.",
    materials: ["Cotton", "Elastane"],
    variants: [
      {
        images: ["https://example.com/images/chinos-tan.jpg"],
        size: "32",
        color: "Tan",
        price: 49.99,
        quantity: 80,
      },
      {
        images: ["https://example.com/images/chinos-navy.jpg"],
        size: "32",
        color: "Navy",
        price: 49.99,
        quantity: 60,
      },
    ],
    discount: 5,
    featured: false,
  },
  {
    name: "Black Hoodie",
    description: "Soft fleece hoodie with a clean silhouette and kangaroo pocket.",
    materials: ["Cotton", "Polyester"],
    variants: [
      {
        images: ["https://example.com/images/black-hoodie.jpg"],
        size: "L",
        color: "Black",
        price: 39.99,
        quantity: 120,
      },
    ],
    discount: 15,
    featured: true,
  },
  {
    name: "Striped Summer Dress",
    description: "Lightweight summer dress with vertical stripes and adjustable straps.",
    materials: ["Rayon"],
    variants: [
      {
        images: ["https://example.com/images/striped-dress.jpg"],
        size: "S",
        color: "Red/White",
        price: 59.99,
        quantity: 35,
      },
    ],
    discount: 0,
    featured: false,
  },
  {
    name: "Running Sneakers",
    description: "Lightweight running shoes with breathable mesh upper and cushioned sole.",
    materials: ["Mesh", "Rubber"],
    variants: [
      {
        images: ["https://example.com/images/sneakers.jpg"],
        size: "9",
        color: "Grey",
        price: 89.99,
        quantity: 55,
      },
    ],
    discount: 20,
    featured: true,
  },
];

module.exports.seedProducts = async () => {
  try {
    for (const p of sampleProducts) {
      const existing = await productQuery.getRecord({ name: p.name });
      if (existing) {
        console.log(`Product exists, skipping: ${p.name}`);
        continue;
      }
      const created = await productCommand.createRecord(p);
      console.log("Product created:", created.name);
    }
  } catch (error) {
    console.error("Error seeding products:", error.message || error);
  }
};
