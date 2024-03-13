import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      const userData = { email, password, username };
      const response = await axios.post('http://localhost:5002/api/register', userData);
      console.log('Registration successful:', response.data);
      // Handle successful registration, e.g., redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error.response.data.message); // Set error message from server response
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {error && <p>{error}</p>} {/* Display error message if exists */}
    </div>
  );
};

export default Register;
