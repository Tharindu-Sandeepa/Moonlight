// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const nodemailer = require('nodemailer');
// const randomstring = require('randomstring');

exports.register = async (req, res) => {
  const { name, username, email, tp, password,type } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

     user = new User({
       
      name: name,
      username: username,
      email: email,
      tp: tp,
      type :type,
      password: password
      
  });


    await user.save();
    

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      token,
      username: user.username,
    });
    
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      token,
      username: user.username,
      type: user.type
    });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};



exports.logout = (req, res) => {
    
    res.status(200).json({ message: 'Logout successful' });
  };
  
 

  
  

// Get user details
exports.getUserDetails = async (req, res) => {
  try {
   
    const user = await User.findById(req.user.userId);
    
    
    if (!user) {
      return res.status(404).json({ success: user, message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

  //new 
  // exports.sendVerificationCode = async (req, res) => {
  //   const { email } = req.body;
  
  //   try {
  //     const user = await User.findOne({ email });
  
  //     if (!user) {
  //       return res.status(404).json({ message: 'User not found' });
  //     }
  
  //     // Generate random 4-digit code
  //     const verificationCode = randomstring.generate({
  //       length: 4,
  //       charset: 'numeric'
  //     });
  
  //     // Update user with verification code and expiration time
  //     user.verificationCode = verificationCode;
  //     user.verificationCodeExpires = Date.now() + 600000; // 10 minutes
  
  //     await user.save();
  
  //     // Send email with verification code
  //     const transporter = nodemailer.createTransport({
  //       service: 'gmail',
  //       auth: {
  //         user: 'katharindusandeepa@gmail.com',
  //         pass: 'kathari1234'
  //       }
  //     });
  
  //     const mailOptions = {
  //       from: 'katharindusandeepa@gmail.com',
  //       to: email,
  //       subject: 'Verification Code for Password Reset',
  //       text: `Your verification code is: ${verificationCode}`
  //     };
  
  //     transporter.sendMail(mailOptions, (error, info) => {
  //       if (error) {
  //         console.error('Email sending failed:', error);
  //         return res.status(500).json({ message: 'Email sending failed' });
  //       } else {
  //         console.log('Email sent:', info.response);
  //         res.status(200).json({ message: 'Verification code sent successfully' });
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error sending verification code:', error);
  //     res.status(500).json({ message: 'Server Error' });
  //   }
  // };