// seed for product reviews
const reviewCommand = require("../src/commands/reviewCommand");
const reviewQuery = require("../src/queries/reviewQuery");
const userQuery = require("../src/queries/userQuery");
const productQuery = require("../src/queries/productQuery");

require("dotenv").config();

async function createSampleReviews() {
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

    const sampleReviews = [
      {
        userId: users[0]._id,
        email: users[0].email,
        comment: "Great quality t-shirt, very comfortable and fits perfectly!",
        rating: 5,
        product: products[0]._id, // Classic White Tee
      },
      {
        userId: users[1]._id,
        email: users[1].email,
        comment: "Nice denim jacket, but runs a bit large. Consider sizing down.",
        rating: 4,
        product: products[1]._id, // Blue Denim Jacket
      },
      {
        userId: users[2]._id,
        email: users[2].email,
        comment: "The chinos are perfect for work. Good material and comfortable fit.",
        rating: 5,
        product: products[2]._id, // Slim Fit Chinos
      },
      {
        userId: users[0]._id,
        email: users[0].email,
        comment: "Warm and cozy hoodie, but the price is a bit high.",
        rating: 4,
        product: products[3]._id, // Black Hoodie
      },
    ];

    return sampleReviews;
  } catch (error) {
    console.error("Error creating sample reviews:", error.message);
    return null;
  }
}

module.exports.seedReviews = async () => {
  try {
    const sampleReviews = await createSampleReviews();
    if (!sampleReviews) {
      return;
    }

    for (const reviewData of sampleReviews) {
      // Check if review exists (using user and product as unique identifier)
      const existing = await reviewQuery.getRecord({
        userId: reviewData.userId,
        product: reviewData.product,
      });
      
      if (existing) {
        console.log(`Review exists for user ${reviewData.email} on product ${reviewData.product}, skipping`);
        continue;
      }

      const review = await reviewCommand.createRecord(reviewData);
      console.log("Review created for product:", reviewData.product);
    }
  } catch (error) {
    console.error("Error seeding reviews:", error.message);
  }
};