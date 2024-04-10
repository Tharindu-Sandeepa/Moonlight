import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Badge, useScrollTrigger, Hidden, Menu, MenuItem } from '@mui/material';
import { ShoppingCart, Menu as MenuIcon, ForkLeft } from '@mui/icons-material';
import AccountMenu from './AccountMenu';
import logo from '../img/logo.png';
import { Link } from 'react-router-dom';

const Navbar = ({ loggedIn, username, onLogout, token }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: 0,
  });

  React.useEffect(() => {
    setIsScrolled(trigger);
  }, [trigger]);

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar 
      position="fixed" 
      style={{ 
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent', 
        backdropFilter: isScrolled ? 'blur(0.5px)' : 'none', 
        transition: 'background-color 0.3s ease-out',
        boxShadow: isScrolled ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none'
      }}
    >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Company Logo" style={{ height: '60px' }} />
          {/* Visible on Desktop */}
          <Hidden mdDown>
            <div className="navbar" style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
              <Link to="/">
                <Button color="inherit" sx={{ color: 'black', fontWeight: 'bold' }}>Home</Button>
              </Link>
              <Button color="inherit" href="#" sx={{ color: 'black', fontWeight: 'bold', marginLeft: "17px" }}>Gems</Button>
              <Button color="inherit" href="#" sx={{ color: 'black', fontWeight: 'bold', marginLeft: "17px" }}>Jewelry</Button>
              <Button color="inherit" href="#" sx={{ color: 'black', fontWeight: 'bold' }}>About us</Button>
            </div>
          </Hidden>
        </div>

        {/* Visible on Mobile */}
        <Hidden lgUp >
          <IconButton color="black" onClick={handleMobileMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={mobileMenuAnchor} open={Boolean(mobileMenuAnchor)} onClose={handleMobileMenuClose}>
            <MenuItem onClick={handleMobileMenuClose}><Link to="/"><Button color="inherit" sx={{ color: 'black', fontWeight: 'bold' }}>Home</Button></Link></MenuItem>
            <MenuItem onClick={handleMobileMenuClose}><Button color="inherit" href="#" sx={{ color: 'black', fontWeight: 'bold' }}>Gems</Button></MenuItem>
            <MenuItem onClick={handleMobileMenuClose}><Button color="inherit" href="#" sx={{ color: 'black', fontWeight: 'bold' }}>Jewelry</Button></MenuItem>
            <MenuItem onClick={handleMobileMenuClose}><Button  color="inherit" href="#" sx={{ color: 'black', fontWeight: 'bold' }}>About us</Button></MenuItem>
          </Menu>
        </Hidden>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          {loggedIn ? (
            <>
              <Button onClick={onLogout}>Logout</Button>
              <IconButton color="inherit" href="#" sx={{ color: 'black', fontWeight: 'bold' }}>
                <Badge badgeContent={1} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <AccountMenu />
            </>
          ) : (
            <>
              <Button component={Link} to="/login" style={{ color: 'black' }}>Login</Button>
              <Button component={Link} to="/register" style={{ color: 'black' }}>Register</Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;