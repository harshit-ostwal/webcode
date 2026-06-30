import mailProvider from "./mail.provider.js";

import verifyEmailTemplate from "./templates/auth/verify-email.template.js";
import forgotPasswordTemplate from "./templates/auth/forgot-password.template.js";
import welcomeTemplate from "./templates/auth/welcome.template.js";

class MailService {
  async verifyConnection() {
    return await mailProvider.verifyConnection();
  }

  async sendMail(payload) {
    return await mailProvider.sendMail(payload);
  }

  async sendVerificationEmail(user, otp) {
    return await this.sendMail({
      to: user.email,
      subject: "Verify Your Email",
      html: verifyEmailTemplate({
        name: user.username,
        otp,
      }),
    });
  }

  async sendForgotPasswordEmail(user, otp) {
    return await this.sendMail({
      to: user.email,
      subject: "Reset Your Password",
      html: forgotPasswordTemplate({
        name: user.username,
        otp,
      }),
    });
  }

  async sendWelcomeEmail(user) {
    return await this.sendMail({
      to: user.email,
      subject: "Welcome!",
      html: welcomeTemplate({
        name: user.username,
      }),
    });
  }
}

export default new MailService();
