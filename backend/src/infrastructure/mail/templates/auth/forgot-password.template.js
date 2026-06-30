import baseLayout from "../layouts/base.layout.js";

const forgotPasswordTemplate = ({ name, otp }) => {
  return baseLayout(`
    <div
      style="
        max-width:600px;
        margin:0 auto;
        padding:32px;
        font-family:Arial,sans-serif;
        color:#111827;
      "
    >
      <h2 style="margin-bottom:8px;">
        Reset Your Password
      </h2>

      <p>
        Hi <strong>${name}</strong>,
      </p>

      <p>
        We received a request to reset your password.
      </p>

      <p>
        Use the following One Time Password (OTP) to continue.
      </p>

      <div
        style="
          margin:32px 0;
          text-align:center;
        "
      >
        <span
          style="
            display:inline-block;
            padding:16px 32px;
            font-size:32px;
            font-weight:bold;
            letter-spacing:8px;
            background:#f3f4f6;
            border-radius:8px;
          "
        >
          ${otp}
        </span>
      </div>

      <p>
        This OTP will expire in
        <strong>15 minutes</strong>.
      </p>

      <p>
        If you didn't request a password reset,
        you can safely ignore this email.
      </p>

      <hr
        style="
          margin:32px 0;
          border:none;
          border-top:1px solid #e5e7eb;
        "
      />

      <p
        style="
          color:#6b7280;
          font-size:14px;
        "
      >
        This is an automated email.
        Please do not reply.
      </p>
    </div>
  `);
};

export default forgotPasswordTemplate;
