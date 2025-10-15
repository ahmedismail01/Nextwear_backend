const app = require("express").Router();
const authenticate = require("../../middlewares/authenticate");
const asyncHandler = require("../../middlewares/asyncHandler");
const userController = require("../../controllers/userController");

// Get all users
app.get("/", authenticate("Admin"), asyncHandler(userController.getAllUsers));

module.exports = app;
