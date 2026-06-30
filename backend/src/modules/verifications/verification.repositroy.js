import Verification from "./verification.model.js";
import { VerificationSelect } from "./verification.select.js";

class VerificationRepository {
  async findById(userId, id) {
    return await Verification.findOne({
      _id: id,
      userId,
    }).select(VerificationSelect);
  }

  async findByToken(token, type) {
    return await Verification.findOne({
      token,
      type,
    }).select(VerificationSelect);
  }

  async findByUserIdAndType(userId, type) {
    return await Verification.findOne({
      userId,
      type,
    }).select(VerificationSelect);
  }

  async create(data) {
    return await Verification.create(data);
  }

  async update(userId, id, data) {
    return await Verification.findOneAndUpdate(
      {
        _id: id,
        userId,
      },
      {
        $set: data,
      },
      {
        new: true,
        returnDocument: "after",
        runValidators: true,
      },
    ).select(VerificationSelect);
  }

  async delete(userId, id) {
    return await Verification.findOneAndDelete({
      _id: id,
      userId,
    }).select(VerificationSelect);
  }

  async deleteByUserIdAndType(userId, type) {
    return await Verification.findOneAndDelete({
      userId,
      type,
    }).select(VerificationSelect);
  }

  async deleteByUserId(userId) {
    return await Verification.deleteMany({
      userId,
    }).select(VerificationSelect);
  }
}

export { VerificationRepository };
