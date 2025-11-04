const { seedAdminUser } = require("./adminUsers");
const connectDB = require("../src/config/db");

connectDB()
  .then(async () => {
    await seedAdminUser();
  })
  .catch((error) => console.log(error))
  .finally(() => {
    process.exit(0);
  });
