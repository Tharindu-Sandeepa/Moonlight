import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Home from './pages/Home';
import Dashboard from './pages/Admin/AdminDashboard';

const App = () => {

  const openDashboardInNewWindow = () => {
    window.open('/admin', '_blank');
  };

  return (
    <div>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
     
     
    
    </div>
  );
};




export default App;
