class RoomDto {
  constructor(room) {
    this.id = room._id;
    this.roomCode = room.roomCode;
    this.roomName = room.roomName;
    this.hostId = room.hostId;
    this.participants = (room.participants ?? []).map((participant) => ({
      participantId: participant.participantId,
      participantName: participant.participantName,
      participantHandle: participant.participantHandle ?? null,
      isActive: participant.isActive,
      joinedAt: participant.joinedAt,
      lastSeenAt: participant.lastSeenAt,
    }));
    this.documentId = room.documentId ?? null;
    this.isActive = room.isActive;
    this.createdAt = room.createdAt;
    this.updatedAt = room.updatedAt;
  }
}

export { RoomDto };
