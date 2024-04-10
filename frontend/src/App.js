import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Admin/AdminDashboard';
import Login from './components/Login';
import NewLogin from './components/NewLogin';

import Register from './components/Register';

import MyAccount from './components/MyAccount';
import Userinfotest from './components/UserInfotest';
import Usermanage from './pages/Admin/Usermanage';
import Ordermanage from './pages/Admin/Ordermanage';
import LoadingScreen from './components/LoadingScreen';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true); // State to control loading screen
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in (e.g., by having a token in localStorage)
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (storedToken && storedUsername) {
      setToken(storedToken);
      setUsername(storedUsername);
      setLoggedIn(true);
    }
    // Simulate loading for 3 seconds
    setTimeout(() => {
      setLoading(false);
    }, 4300);
  }, []);

  const handleLogin = (userData) => {
    setUsername(userData.username);
    setToken(userData.token);
    setLoggedIn(true);
    // Store token and username in localStorage for persistent login
    localStorage.setItem('token', userData.token);
    localStorage.setItem('username', userData.username);
  };

  const handleLogout = () => {
    setUsername('');
    setToken('');
    setLoggedIn(false);
    // Clear token and username from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  // Render Navbar conditionally based on current route
  const renderNavbar = () => {
    const adminRoutes = ['/admin', '/admin/users', '/admin/Orders']; //  admin routes
    if (!adminRoutes.includes(location.pathname)) {
      return <Navbar loggedIn={loggedIn} username={username} onLogout={handleLogout} token={token} />;
    }
    return null;
  };

  return (
    <div>
      {loading ? ( // Render LoadingScreen if loading state is true
        <LoadingScreen />
      ) : (
        <>
          {renderNavbar()}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} setUsername={setUsername} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/userinfotest" element={<Userinfotest />} />
            <Route path="/newLogin" element={<NewLogin onLogin={handleLogin}/>} />
          
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/users" element={<Usermanage />} />
            <Route path="/admin/Orders" element={<Ordermanage />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
