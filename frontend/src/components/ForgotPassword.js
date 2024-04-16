// components/ForgotPassword.js

import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendVerificationCode = async () => {
    try {
      await axios.post('http://localhost:5002/api/send-verification-code', { email });
      setMessage('Verification code sent to your email');
    } catch (error) {
      console.error('Error sending verification code:', error);
      setMessage('Failed to send verification code');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={sendVerificationCode}>Send Verification Code</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
