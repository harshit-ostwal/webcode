class AuthDto {
  constructor(user) {
    this.fullName = user.fullName;
    this.username = user.username;
    this.email = user.email;
    this.emailVerifiedAt = user.emailVerifiedAt;
  }
}

export { AuthDto };
