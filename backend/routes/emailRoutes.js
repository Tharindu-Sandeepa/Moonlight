const express = require('express');
const nodemailer = require('nodemailer');
const emailRoutes = express.Router();


emailRoutes.post('/send-email', async (req, res) => {
  const { email, subject, text } = req.body;

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: 'nisadimithara01@gmail.com',
      pass: 'dcpj fvpd itai rplp'
    }
  });

  const mailOptions = {
    from: '0820sani12@gmail.com',
    to: email,
    subject: subject,
    text: text
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

module.exports = emailRoutes;
