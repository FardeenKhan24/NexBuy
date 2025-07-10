const nodemailer = require("nodemailer");

const sendLoginEmail = async (userName, userEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: `"NexBuy" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "🔐 Login Notification - NexBuy",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #ff9900;">🛍️ NexBuy</h2>
          <h3 style="color: #333;">Hello, <span style="color: #703BF7;">${userName}</span>! 👋</h3>
          <p>We just noticed a <strong>login</strong> to your NexBuy account. ✅</p>
          <p>If this was <strong>you</strong>, enjoy exploring amazing products and deals! 🛒</p>
          <p>If this <strong>wasn’t you</strong>, we strongly recommend updating your password immediately. 🔒</p>
          <hr style="margin: 20px 0;">
          <p style="font-size: 13px; color: gray;">This is an automated message from NexBuy. Please do not reply.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Login email sent to:", userEmail);
  } catch (error) {
    console.error("Error sending login email:", error);
  }
};

module.exports = sendLoginEmail;
