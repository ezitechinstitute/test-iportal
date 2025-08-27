const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAILHOST, // Your SMTP server host
  port: process.env.MAILPORT, // Your SMTP server port (default is usually 587)
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.REGMAIL, // Your email address
    pass: process.env.MAILPASS, // Your email password or application-specific password
  },
});

const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `http://localhost:8088/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.REGMAIL, // Sender email address
    to: email,
    subject: "Password Reset Request",
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #e9f0f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #3275db;
      color: white;
      padding: 20px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      border-radius: 8px 8px 0 0;
    }
    .body {
      padding: 20px;
      color: #333;
      line-height: 1.6;
    }
    .footer {
      background-color: #f6f6f6;
      text-align: center;
      padding: 15px;
      color: #777;
      font-size: 14px;
      border-top: 1px solid #e0e0e0;
    }
    .footer a {
      color: #3275db;
      text-decoration: none;
    }
    .button {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 20px;
      background-color: #3275db;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
    }
    .button:hover {
      background-color: #255bb5;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      Reset Your Password
    </div>
    <div class="body">
      <p>You recently requested to reset your password for your Ezitech account.</p>
      <p>Click the button below to proceed:</p>

      <p style="text-align: center;">
        <a href="${resetToken}" class="button" style="color: white;">Reset Password</a>
      </p>

      <p>This link is valid for 30 minutes. If you did not request a password reset, you can ignore this email.</p>
    </div>
    <div class="footer">
      <p>For help, contact <a href="mailto:help@ezitech.org">help@ezitech.org</a></p>
      <p>Ezitech Institute</p>
    </div>
  </div>
</body>
</html>

    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendPasswordResetEmail };
