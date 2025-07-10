const nodemailer = require("nodemailer");

const sendRegisterEmail = async (userName, userEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"NexBuy" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "🎉 Welcome to NexBuy!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #ff9900;">Welcome to NexBuy, ${userName}!</h2>
          <p>We're thrilled to have you join our community of smart shoppers. 🚀</p>
          <p>Start exploring a wide range of handpicked products made just for you.</p>
          <p>Need any help? Feel free to reach out. Happy shopping! 🛍️</p>
          <p style="margin-top: 20px; font-size: 14px; color: gray;">This is an automated email – no need to reply.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending registration email:", error);
  }
};

module.exports = sendRegisterEmail;
