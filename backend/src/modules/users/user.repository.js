import User from "./user.model.js";
import { UserSelect } from "./user.select.js";

class UserRepository {
  async findAll() {
    return await User.find().select(UserSelect);
  }

  async findById(id) {
    return await User.findById(id).select(UserSelect);
  }

  async findByUsername(username) {
    return await User.findOne({
      username,
    }).select(UserSelect);
  }

  async findByEmail(email) {
    return await User.findOne({
      email,
    }).select(UserSelect);
  }

  async findByIdentifier(identifier) {
    return await User.findOne({
      $or: [
        {
          email: identifier,
        },
        {
          username: identifier,
        },
      ],
    })
      .select(UserSelect)
      .select("+password");
  }

  async create(data) {
    return await User.create(data);
  }

  async update(id, data) {
    return await User.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
        returnDocument: "after",
      },
    ).select(UserSelect);
  }

  async delete(id) {
    return await User.findByIdAndDelete(id).select(UserSelect);
  }
}

export { UserRepository };
