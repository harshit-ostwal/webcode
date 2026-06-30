import baseLayout from "../layouts/base.layout.js";

const welcomeTemplate = ({ name }) => {
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
        Welcome Aboard!
      </h2>

      <p>
        Hi <strong>${name}</strong>,
      </p>

      <p>
        Your email has been successfully verified.
      </p>

      <p>
        Welcome to our platform! Your account is now fully activated, and you can start exploring all the available features.
      </p>

      <p>
        We're excited to have you with us and hope you enjoy your experience.
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
            padding:14px 28px;
            background:#10b981;
            color:#ffffff;
            border-radius:8px;
            font-size:18px;
            font-weight:bold;
          "
        >
          Welcome!
        </span>
      </div>

      <p>
        If you have any questions, feel free to contact our support team.
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
        Thank you for choosing us.
      </p>
    </div>
  `);
};

export default welcomeTemplate;
