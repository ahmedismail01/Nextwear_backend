// seed for orders
const orderCommand = require("../src/commands/orderCommand");
const orderQuery = require("../src/queries/orderQuery");
const userQuery = require("../src/queries/userQuery");
const productQuery = require("../src/queries/productQuery");
const promoCodeQuery = require("../src/queries/promoCodeQuery");

require("dotenv").config();

async function createSampleOrders() {
  try {
    // Get seeded users
    const users = await userQuery.getRecords({ role: "User" });
    if (!users || users.length === 0) {
      console.log("No users found. Please run user seed first.");
      return;
    }

    // Get seeded products
    const { products } = await productQuery.getRecords({}, 0, 10, {});
    if (!products || products.length === 0) {
      console.log("No products found. Please run product seed first.");
      return;
    }

    // Get a promo code
    const promoCode = await promoCodeQuery.getRecord({ code: "WELCOME2023" });

    const sampleOrders = [
      {
        user: users[0]._id,
        products: [
          {
            product: products[0]._id,
            name: products[0].name,
            purchasePrice: products[0].variants[0].price,
            quantity: 2,
            sku: "SKU123",
          },
          {
            product: products[1]._id,
            name: products[1].name,
            purchasePrice: products[1].variants[0].price,
            quantity: 1,
            sku: "SKU456",
          },
        ],
        finalPrice: 119.97, // (19.99 * 2) + 79.99
        status: "Delivered",
        promocode: promoCode ? promoCode._id : null,
      },
      {
        user: users[1]._id,
        products: [
          {
            product: products[2]._id,
            name: products[2].name,
            purchasePrice: products[2].variants[0].price,
            quantity: 1,
            sku: "SKU789",
          },
        ],
        finalPrice: 49.99,
        status: "Pending",
      },
      {
        user: users[2]._id,
        products: [
          {
            product: products[3]._id,
            name: products[3].name,
            purchasePrice: products[3].variants[0].price,
            quantity: 2,
            sku: "SKU101",
          },
        ],
        finalPrice: 79.98, // 39.99 * 2
        status: "Shipped",
      },
    ];

    return sampleOrders;
  } catch (error) {
    console.error("Error creating sample orders:", error.message);
    return null;
  }
}

module.exports.seedOrders = async () => {
  try {
    const sampleOrders = await createSampleOrders();
    if (!sampleOrders) {
      return;
    }

    for (const orderData of sampleOrders) {
      // Check if order exists (using user and creation date as unique identifier)
      const existing = await orderQuery.getRecord({
        user: orderData.user,
        createdAt: orderData.createdAt,
      });
      
      if (existing) {
        console.log(`Order exists for user ${orderData.user}, skipping`);
        continue;
      }

      const order = await orderCommand.createRecord(orderData);
      console.log("Order created for user:", orderData.user);
    }
  } catch (error) {
    console.error("Error seeding orders:", error.message);
  }
};