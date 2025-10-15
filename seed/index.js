const { seedAdminUser } = require("./adminUsers");
const connectDB = require("../src/config/db");
connectDB();
seedAdminUser();
