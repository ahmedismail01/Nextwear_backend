const { seedAdminUser } = require("./adminUsers");
const { seedProducts } = require("./products");
const { seedUsers } = require("./users");
const { seedPromoCodes } = require("./promoCodes");
const { seedOrders } = require("./orders");
const { seedReviews } = require("./reviews");
const connectDB = require("../src/config/db");

connectDB()
  .then(async () => {
    await seedAdminUser();
    await seedUsers();
    await seedProducts();
    await seedPromoCodes();
    await seedOrders();
    await seedReviews();
  })
  .catch((error) => console.log(error))
  .finally(() => {
    process.exit(0);
  });
