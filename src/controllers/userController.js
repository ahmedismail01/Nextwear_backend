const { getRecord, getRecords } = require("../queries/userQuery");
const { updateRecord, deleteRecord } = require("../commands/userCommand");
const { santizeUser, santizeUsers } = require("../dto/userDto");

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

const updateUser = async (req, res) => {
  const userId = req.user.id;
  const updates = req.body;
  const user = await getRecord({ _id: userId });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  const updatedUser = await updateRecord({ _id: userId }, updates);

  const santizedUser = santizeUser(updatedUser);

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

module.exports = {
  getAllUsers,
  getUser,
  getCurrentUser,
  updateUser,
  deleteUser,
};
