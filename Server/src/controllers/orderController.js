const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const Order = require("../models/Order");

exports.sendOrderEmail = async (req, res) => {
  const { userId, userName, userEmail, cartItems } = req.body;

  try {
    const orderDate = new Date().toDateString();
    const arrivalDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toDateString();

    let subtotal = 0;
    let itemsList = "";
    let orderItems = [];

    cartItems.forEach((item, i) => {
      const price = item.product.price;
      const qty = item.quantity;
      const title = item.product.title;
      const productId = item.product._id;

      subtotal += price * qty;
      itemsList += `<li>${i + 1}. ${title} - Qty: ${qty} - Rs${price}</li>`;

      orderItems.push({
        productId,
        quantity: qty,
      });
    });

    const shipping = 5.0;
    const total = subtotal + shipping;

    const doc = new PDFDocument();
    let buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", async () => {
      const pdfData = Buffer.concat(buffers);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #ff9900;">NexBuy</h2>
          <p>Hello ${userName},</p>
          <p>Thank you for your order. Here's your summary:</p>
          <p><strong>Order Date:</strong> ${orderDate}</p>
          <p><strong>Estimated Arrival:</strong> ${arrivalDate}</p>
          <ul>${itemsList}</ul>
          <pre>
Subtotal:   Rs ${subtotal.toFixed(2)}
Shipping:   Rs ${shipping.toFixed(2)}
Total:      Rs ${total.toFixed(2)}
          </pre>
          <p>Your invoice is attached as PDF.</p>
        </div>
      `;

      const mailOptions = {
        from: `"NexBuy" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: "🧾 Order Confirmation - NexBuy",
        html: htmlContent,
        attachments: [
          {
            filename: "Order_Summary.pdf",
            content: pdfData,
            contentType: "application/pdf",
          },
        ],
      };

      await transporter.sendMail(mailOptions);

      const order = new Order({
        userId,
        userName,
        userEmail,
        items: orderItems,
        subtotal,
        shipping,
        total,
        orderDate,
        arrivalDate,
      });

      await order.save();

      res.status(200).json({ message: "Order email sent and order saved" });
    });

    doc.fontSize(20).text("NexBuy - Order Summary", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Customer Name: ${userName}`);
    doc.text(`Email: ${userEmail}`);
    doc.text(`Order Date: ${orderDate}`);
    doc.text(`Estimated Arrival: ${arrivalDate}`);
    doc.moveDown().fontSize(16).text("Items:");
    doc.fontSize(12);
    cartItems.forEach((item, i) => {
      doc.text(`${i + 1}. ${item.product.title} - Qty: ${item.quantity} - Rs${item.product.price}`);
    });
    doc.moveDown().fontSize(16).text("Billing:");
    doc.fontSize(12).text(`Subtotal: Rs ${subtotal.toFixed(2)}`);
    doc.text(`Shipping: Rs ${shipping.toFixed(2)}`);
    doc.text(`Total: Rs ${total.toFixed(2)}`);
    doc.end();

  } catch (error) {
    console.error("Order email error:", error);
    res.status(500).json({ error: "Failed to send order email or save order" });
  }
};


exports.getOrder = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized - User not found" });
    }

    const orders = await Order.find({ userId }).populate("items.productId");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

