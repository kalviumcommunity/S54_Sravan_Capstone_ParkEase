const nodemailer = require('nodemailer');
const express = require("express")
const router = express.Router();
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

router.post('/send', async (req, res) => {
  const { to, subject, html } = req.body;

  const mailOptions = {
    from: {name : "Parkez" , address : process.env.APP_PASSWORD},
    to,
    subject,
    html
  };

   try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email.');
  }
});

module.exports = router;
