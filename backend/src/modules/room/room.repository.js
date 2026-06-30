import Room from "./room.model.js";
import { RoomSelect } from "./room.select.js";

class RoomRepository {
  async findById(userId, id) {
    return await Room.findOne({
      _id: id,
      hostId: userId,
    }).select(RoomSelect);
  }

  async findByCode(roomCode) {
    return await Room.findOne({ roomCode }).select(RoomSelect);
  }

  async create(data) {
    return await Room.create(data);
  }

  async update(userId, id, data) {
    return await Room.findOneAndUpdate(
      {
        _id: id,
        hostId: userId,
      },
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
        returnDocument: "after",
      },
    ).select(RoomSelect);
  }

  async updateById(id, data) {
    return await Room.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
        returnDocument: "after",
      },
    ).select(RoomSelect);
  }

  async delete(userId, id) {
    return await Room.findOneAndDelete({
      _id: id,
      hostId: userId,
    }).select(RoomSelect);
  }
}

export { RoomRepository };
