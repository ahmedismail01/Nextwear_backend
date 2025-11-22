module.exports.sanitizeUser = (user) => {
  return {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    phoneNumber: user.phoneNumber,
    addresses: user.addresses,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

module.exports.sanitizeUsers = (users) => {
  return users.map((user) => this.sanitizeUser(user));
};
