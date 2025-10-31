const { getRecord, getRecords } = require("../queries/userQuery");
const { updateRecord, deleteRecord } = require("../commands/userCommand");
const { santizeUser, santizeUsers } = require("../dto/userDto");
const userService = require("../services/userService");

const getAllUsers = async (req, res) => {
  const users = await getRecords({});
  const santizedUsers = santizeUsers(users) || [];
  res.status(200).json({ success: true, data: santizedUsers });
};

const getUser = async (req, res) => {
  const userId = req.params.id;
  const user = await getRecord({ _id: userId });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  res.status(200).json({ success: true, data: user });
};

const getCurrentUser = async (req, res) => {
  const userId = req.user.id;
  const user = await getRecord({ _id: userId });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  const santizedUser = santizeUser(user);
  res.status(200).json({ success: true, data: santizedUser });
};

const deleteUser = async (req, res) => {
  const userId = req.user.id;
  const user = await getRecord({ _id: userId });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  await deleteRecord({ _id: userId });
  res.status(200).json({ success: true, message: "User deleted successfully" });
};

const getProfile = async (req, res) => {
  const userId = req.user.id;
  const user = await getRecord({ _id: userId });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  const santizedUser = santizeUser(user);
  res.status(200).json({ success: true, data: santizedUser });
};

const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const updates = req.body;

  const updatedUser = await userService.updateUser(userId, updates);

  const santizedUser = santizeUser(updatedUser);

  res.status(200).json({ success: true, data: santizedUser });
};

const addAddress = async (req, res) => {
  const userId = req.user.id;
  const address = req.body;
  const updatedUser = await userService.addAddress(userId, address);
  const santizedUser = santizeUser(updatedUser);
  res.status(200).json({ success: true, data: santizedUser });
};

const removeAddress = async (req, res) => {
  const userId = req.user.id;
  const addressId = req.params.addressId;
  const updatedUser = await userService.removeAddress(userId, addressId);
  const santizedUser = santizeUser(updatedUser);
  res.status(200).json({ success: true, data: santizedUser });
};

const updateAddress = async (req, res) => {
  const userId = req.user.id;
  const addressId = req.params.addressId;
  const address = req.body;
  const updatedUser = await userService.updateAddress(
    userId,
    addressId,
    address
  );
  const santizedUser = santizeUser(updatedUser);
  res.status(200).json({ success: true, data: santizedUser });
};

module.exports = {
  getAllUsers,
  getUser,
  getCurrentUser,
  deleteUser,
  getProfile,
  updateProfile,
  addAddress,
  removeAddress,
  updateAddress,
};
