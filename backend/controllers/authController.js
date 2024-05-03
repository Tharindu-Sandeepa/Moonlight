// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const nodemailer = require('nodemailer');
// const randomstring = require('randomstring')

const { sendWelcomeEmail } = require('./emailController');

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

    // Send a welcome email to the user
    await sendWelcomeEmail({ recipient_email: email, username: username });
    
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

  