/**
 * In-memory presence store.
 *
 * Structure:
 *   #roomPresence: Map<roomCode, Map<socketId, { userId, username, isTyping }>>
 *
 * This is intentionally NOT a database — presence state is ephemeral.
 * It auto-clears when a socket disconnects or the server restarts.
 */
class PresenceStore {
  #roomPresence = new Map();

  /**
   * Add a participant to a room's presence map.
   * @param {string} roomCode
   * @param {string} socketId
   * @param {{ id: string, username: string }} user
   */
  addParticipant(roomCode, socketId, user) {
    if (!this.#roomPresence.has(roomCode)) {
      this.#roomPresence.set(roomCode, new Map());
    }

    this.#roomPresence.get(roomCode).set(socketId, {
      userId: user.id,
      username: user.username,
      isTyping: false,
    });
  }

  /**
   * Remove a participant from a room by socket ID.
   * Cleans up the room entry if it becomes empty.
   * @param {string} roomCode
   * @param {string} socketId
   */
  removeParticipant(roomCode, socketId) {
    const room = this.#roomPresence.get(roomCode);
    if (!room) return;

    room.delete(socketId);

    if (room.size === 0) {
      this.#roomPresence.delete(roomCode);
    }
  }

  /**
   * Set or clear the typing flag for a socket.
   * @param {string} roomCode
   * @param {string} socketId
   * @param {boolean} isTyping
   */
  setTyping(roomCode, socketId, isTyping) {
    const room = this.#roomPresence.get(roomCode);
    if (!room) return;

    const participant = room.get(socketId);
    if (participant) {
      participant.isTyping = isTyping;
    }
  }

  /**
   * Returns a deduplicated array of unique participants.
   * A user on multiple tabs is only listed once.
   * @param {string} roomCode
   * @returns {{ userId: string, username: string }[]}
   */
  getParticipants(roomCode) {
    const room = this.#roomPresence.get(roomCode);
    if (!room) return [];

    const seen = new Set();
    const result = [];

    for (const [, participant] of room) {
      if (!seen.has(participant.userId)) {
        seen.add(participant.userId);
        result.push({
          userId: participant.userId,
          username: participant.username,
        });
      }
    }

    return result;
  }

  /**
   * Returns usernames of all participants currently typing.
   * @param {string} roomCode
   * @returns {string[]}
   */
  getTypingUsers(roomCode) {
    const room = this.#roomPresence.get(roomCode);
    if (!room) return [];

    return [...room.values()]
      .filter((p) => p.isTyping)
      .map((p) => p.username);
  }

  /**
   * Returns all room codes a given socket ID is present in.
   * Used for cleanup on disconnect.
   * @param {string} socketId
   * @returns {string[]}
   */
  getRoomsForSocket(socketId) {
    const rooms = [];
    for (const [roomCode, participants] of this.#roomPresence) {
      if (participants.has(socketId)) {
        rooms.push(roomCode);
      }
    }
    return rooms;
  }
}

export default new PresenceStore();
