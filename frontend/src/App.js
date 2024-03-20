import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar'
import Home from './pages/Home';
import Dashboard from './pages/Admin/AdminDashboard';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = (userData) => {
    setUsername(userData.username);
    setToken(userData.token);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setUsername('');
    setToken('');
    setLoggedIn(false);
  };


  const openDashboardInNewWindow = () => {
    window.open('/admin', '_blank');
  };

  return (
    <div>
     <Navbar loggedIn={loggedIn} username={username} onLogout={handleLogout} token={token} />
      <Routes>
      
        <Route path="/" element={<Home />}   />
      
        <Route path="/login" element={<Login onLogin={handleLogin} setUsername={setUsername} />} />
         <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
     
     
    
    </div>
  );
};




export default App;
