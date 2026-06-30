import Session from "./session.model.js";
import { SessionSelect } from "./session.select.js";

class SessionRepository {
  async findById(userId, id) {
    return await Session.findOne({
      userId,
      _id: id,
    }).select(SessionSelect);
  }

  async findByUserId(userId) {
    return await Session.find({
      userId,
    }).select(SessionSelect);
  }

  async create(data) {
    return await Session.create(data);
  }

  async update(userId, id, data) {
    return await Session.findOneAndUpdate(
      {
        _id: id,
        userId,
      },
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
        returnDocument: "after",
      },
    ).select(SessionSelect);
  }

  async delete(userId, id) {
    return await Session.findOneAndDelete({
      _id: id,
      userId,
    }).select(SessionSelect);
  }

  async deleteByUserId(userId) {
    return await Session.deleteMany({
      userId,
    }).select(SessionSelect);
  }
}

export { SessionRepository };
