class SessionDto {
  constructor(session) {
    this.ipAddress = session.ipAddress;
    this.userAgent = session.userAgent;
    this.lastLoginAt = session.lastLoginAt;
  }
}

export { SessionDto };
