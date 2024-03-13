import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Badge, useScrollTrigger, Hidden, Menu, MenuItem } from '@mui/material';
import { ShoppingCart, Menu as MenuIcon } from '@mui/icons-material';
import AccountMenu from './AccountMenu';
import logo from '../img/logo.png';
import { Link } from 'react-router-dom';

const Navbar = ({ loggedIn, username, onLogout, token }) => {
  const [isScrolled, setIsScrolled] = useState(false); //setting nav bar invisible when scroll to top
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
        backdropFilter: isScrolled ? 'blur(8px)' : 'none', 
        transition: 'background-color 0.3s ease-out',
        boxShadow: isScrolled ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none'
      }}
    >
      <Toolbar>
        {/* Company Logo */}
        <img src={logo} alt="Company Logo" style={{ height: '60px', marginRight: 'auto' }} />

        {/* Navigation Buttons - Visible on Desktop */}
        <Hidden mdDown>
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
        </Hidden>

        {/* Menu Icon - Visible on Mobile */}
        <Hidden lgUp>
          <IconButton
            color="black"
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMobileMenuClose}
          >
            <MenuItem onClick={handleMobileMenuClose}>
              <Link to="/">
                <Button color="inherit" sx={{ color: 'black', fontWeight: 'bold' }}>
                  Home
                </Button>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMobileMenuClose}>
              <Button color="inherit" href="#" style={{ color: 'black', fontWeight: 'bold' }}>
                Gems
              </Button>
            </MenuItem>
            <MenuItem onClick={handleMobileMenuClose}>
              <Button color="inherit" href="#" style={{ color: 'black', fontWeight: 'bold' }}>
                Jewelry
              </Button>
            </MenuItem>
            <MenuItem onClick={handleMobileMenuClose}>
              <Button color="inherit" href="#" style={{ color: 'black', fontWeight: 'bold' }}>
                About us
              </Button>
            </MenuItem>
          </Menu>
        </Hidden>

        {/* Sign In, Sign Out Buttons */}
        {loggedIn ? (
          <>
            <p>Welcome, {username}!</p>
            <li><a href="/myaccount">My Account</a></li>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button color="inherit" sx={{ color: 'black', fontWeight: 'bold' }}>
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button color="inherit" sx={{ color: 'black', fontWeight: 'bold' }}>
                Register
              </Button>
            </Link>
          </>
        )}

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
