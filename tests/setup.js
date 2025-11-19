require("dotenv").config();

const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect(process.env.DB_STRING_TEST);
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});
