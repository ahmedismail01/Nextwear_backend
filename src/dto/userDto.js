module.exports.santizeUser = (user) => {
  return {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };
};

module.exports.santizeUsers = (users) => {
  return users.map((user) => this.santizeUser(user));
};
