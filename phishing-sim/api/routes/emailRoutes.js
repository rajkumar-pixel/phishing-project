const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

// Sample emails
const emails = [
  {
    id: 1,
    title:"Sample Email 1",
    subject: "Update your password. This is a Phishing Simulator Test.",
    body:"This is the Body of the phishing email",
    status: "Phishing",
  },
  {
    id: 2,
    title:"Sample Email 2",
    subject: "Your account is secure. This is a Phishing Simulator Test.",
    body:"This is the Body of the Safe email",
    status: "Safe",
  },
];

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email provider, e.g., Gmail, Outlook, etc.
  auth: {
    user: "qriocity.helpdesk@gmail.com", // Replace with your email address
    pass: "lnfy nvvv ooel qita", // Replace with your email password or app password
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Email transporter error:", error);
  } else {
    console.log("Email transporter is ready!");
  }
});

// Get all emails
router.get("/", (req, res) => {
  res.json(emails);
});

// Send an email (real implementation)
router.post("/send", async (req, res) => {
  const { to, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ error: "Missing required fields (to, subject, body)" });
  }

  try {
    // Send the email using Nodemailer
    const info = await transporter.sendMail({
      from: "your-email@gmail.com", // Replace with your email address
      to, // Recipient email address
      subject, // Subject of the email
      text: body, // Plain text body
      html: `<p>${body}</p>`, // HTML body
    });

    console.log("Email sent:", info.response);
    res.json({ message: `Email sent successfully to ${to}`, info });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email", details: error.message });
  }
});

module.exports = router;
