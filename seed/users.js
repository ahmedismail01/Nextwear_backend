// seed for regular users
const userCommand = require("../src/commands/userCommand");
const userQuery = require("../src/queries/userQuery");

require("dotenv").config();

const sampleUsers = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "1234567890",
    password: "Password123!",
    addresses: [
      {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
        isDefault: true,
      },
    ],
    verified: true,
    role: "User",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phoneNumber: "9876543210",
    password: "Password123!",
    addresses: [
      {
        street: "456 Oak Ave",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90001",
        country: "USA",
        isDefault: true,
      },
    ],
    verified: true,
    role: "User",
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.j@example.com",
    phoneNumber: "5555555555",
    password: "Password123!",
    addresses: [
      {
        street: "789 Pine St",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
        country: "USA",
        isDefault: true,
      },
    ],
    verified: true,
    role: "User",
  },
];

module.exports.seedUsers = async () => {
  try {
    for (const userData of sampleUsers) {
      const existing = await userQuery.getRecord({ email: userData.email });
      if (existing) {
        console.log(`User exists, skipping: ${userData.email}`);
        continue;
      }
      const user = await userCommand.createRecord(userData);
      console.log("User created:", user.email);
    }
  } catch (error) {
    console.error("Error seeding users:", error.message);
  }
};