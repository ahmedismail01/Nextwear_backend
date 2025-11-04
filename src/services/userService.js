const userQuery = require("../queries/userQuery");
const userCommand = require("../commands/userCommand");
const AppError = require("../utils/appError");

class UserService {
  async getUser(userId) {
    const user = await userQuery.getRecord({ _id: userId });
    if (!user) {
      throw new AppError("User not found", 404, true);
    }
    return user;
  }

  async updateUser(userId, data) {
    // check if the user exists
    const user = await userQuery.getRecord({ _id: userId });

    if (!user) {
      throw new AppError("User not found", 404, true);
    }

    // check if the email is unique
    if (data.email) {
      const existingUser = await userQuery.getRecord({ email: data.email });
      if (existingUser) {
        throw new AppError("Email already exists", 400, true);
      }
    }

    const updatedUser = await userCommand.updateRecord({ _id: userId }, data);

    return updatedUser;
  }

  async addAddress(userId, address) {
    const user = await userQuery.getRecord({ _id: userId });
    if (!user) {
      throw new AppError("User not found", 404, true);
    }
    const updatedUser = await userCommand.updateRecord(
      { _id: userId },
      { $push: { addresses: address } }
    );
    return updatedUser;
  }

  async updateAddress(userId, addressId, address) {
    const user = await userQuery.getRecord({
      _id: userId,
    });
    if (!user) {
      throw new AppError("User not found", 404, true);
    }

    const addressSubDoc = user.addresses.id(addressId)?.toObject();
    if (!addressSubDoc) {
      throw new AppError("Address not found", 404, true);
    }

    const updatedUser = await userCommand.updateRecord(
      { _id: userId, "addresses._id": addressId },
      { $set: { "addresses.$": { ...addressSubDoc, ...address } } }
    );
    return updatedUser;
  }

  async removeAddress(userId, addressId) {
    const user = await userQuery.getRecord({ _id: userId });
    if (!user) {
      throw new AppError("User not found", 404, true);
    }

    const addressSubDoc = user.addresses.id(addressId)?.toObject();
    if (!addressSubDoc) {
      throw new AppError("Address not found", 404, true);
    }

    const updatedUser = await userCommand.updateRecord(
      { _id: userId },
      { $pull: { addresses: { _id: addressId } } }
    );
    return updatedUser;
  }
}

module.exports = new UserService();
