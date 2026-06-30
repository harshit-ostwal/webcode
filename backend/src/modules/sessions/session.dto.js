class SessionDto {
  constructor(session) {
    this.id = session._id;
    this.userId = session.userId;
    this.ipAddress = session.ipAddress;
    this.userAgent = session.userAgent;
    this.lastLoginAt = session.lastLoginAt;
    this.createdAt = session.createdAt;
    this.updatedAt = session.updatedAt;
  }
}

export { SessionDto };