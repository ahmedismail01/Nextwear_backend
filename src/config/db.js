const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_STRING);
    console.log("DB connected successfully!");
  } catch (error) {
    console.error("Error connecting DB:", error);
  }
}

module.exports = connectDB;
