const User = require("../models/user");

const createRecord = async (data) => {
  try {
    const user = new User(data);
    await user.save();
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const updateRecord = async (query, updateData) => {
  try {
    const user = await User.findOneAndUpdate(query, updateData, { new: true });
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
const deleteRecord = async (query) => {
  try {
    const result = await User.findOneAndDelete(query);
    return result;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
module.exports = { createRecord, updateRecord, deleteRecord };
