// seed for admin user
const bcrypt = require("bcryptjs");
const userCommand = require("../src/commands/userCommand");
const userQuery = require("../src/queries/userQuery");

require("dotenv").config();

module.exports.seedAdminUser = async () => {
  try {
    const adminData = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: "Admin",
      firstName: "Admin",
      lastName: "User",
      phoneNumber: "213213",
    };
    const existingAdmin = await userQuery.getRecord({
      email: adminData.email,
    });
    if (existingAdmin) {
      console.log("Admin user already exists. Exiting...");
      process.exit(0);
    }
    const adminUser = await userCommand.createRecord(adminData);
    console.log("Admin user created:", adminUser);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin user:", error.message);
    process.exit(1);
  }
};
