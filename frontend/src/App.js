import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Home from './pages/Home'



const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Update Route declaration */}
        <Route path="/signup" element={<SignUp />} /> {/* Update Route declaration */}
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;