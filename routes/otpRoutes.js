const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Otp = require('../models/Otp');

// Nodemailer Configuration (Update with your email provider)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ritesh.digiblocks@gmail.com', // Your email address
    pass: 'bejhhyhsojeecvra', // Your email password --> bejhhyhsojeecvra
  },
});

// Generate and send OTP with an attractive email template
router.post('/generate-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP

    // Customize the email template with your company name and logo
    const mailOptions = {
      from: 'ritesh.digiblocks@gmail.com',
      to: email,
      subject: 'Digiblocks OTP Verification', // Modify the email subject
      html: `
          <html>
            <body>
              <img src="https://curious-bubblegum-f47d3e.netlify.app/Digiblocks%20(2).png" alt="Digiblocks Logo"> 
              <h1>Welcome to Digiblocks</h1>
              <p>Your One-Time Password (OTP) for admin login is:</p>
              <h2>${otp}</h2>
              <p>Please use this OTP to verify your identity.</p>
              <p>If you didn't request this OTP, please ignore this email.</p>
            </body>
          </html>
        `,
    };

    await transporter.sendMail(mailOptions);

    // Save OTP to the database
    await Otp.create({ email, otp });

    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the OTP document in the database
    const otpDoc = await Otp.findOne({ email, otp });

    if (otpDoc) {
      // OTP is valid, delete the OTP record
      await Otp.deleteOne({ _id: otpDoc._id });
      res.json({ success: true, message: 'OTP is valid' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP' });
  }
});

module.exports = router;
