import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Badge, useScrollTrigger } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import AccountMenu from './AccountMenu';
import logo from '../img/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: 0,
  });

  React.useEffect(() => {
    setIsScrolled(trigger);
  }, [trigger]);

  return (
    <AppBar 
      position="fixed" 
      style={{ 
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent', 
        backdropFilter: isScrolled ? 'blur(8px)' : 'none', 
        transition: 'background-color 0.3s ease-out',
        boxShadow: isScrolled ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none'
      }}
    >
      <Toolbar>
        {/* Company Logo */}
        <img src={logo} alt="Company Logo" style={{ height: '60px', marginRight: 'auto' }} />

        {/* Navigation Buttons */}
        <div className="navbar" style={{ marginRight: '50%' }}>
          <Link to="/">
          <Button color="inherit" href="#" sx={{ color: 'black', fontWeight: 'bold' }}>
            Home
          </Button>
          </Link>

          <Button color="inherit" href="#" style={{ color: 'black', fontWeight: 'bold', marginLeft: "17px" }}>
            Gems
          </Button>

          <Button color="inherit" href="#" style={{ color: 'black', fontWeight: 'bold', marginLeft: "17px" }}>
            Jewelry
          </Button>

          <Button color="inherit" href="#" style={{ color: 'black', fontWeight: 'bold' }}>
            About us
          </Button>

          
        </div>

        {/* Sign In, Sign Out Buttons */}
        <Link to="/signup" >
            <Button color="inherit" sx={{ color: 'black',fontWeight: 'bold', marginRight: '10px' }}>
              Sign Up
            </Button>
          </Link>
        

        {/* Cart Icon */}
        <IconButton color="inherit" href="#" sx={{ color: 'black', fontWeight: 'bold' }}>
          <Badge badgeContent={1} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>

        {/* AccountMenu - Positioned to the right */}
        <div className="sublog">
          <AccountMenu />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
