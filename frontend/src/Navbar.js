import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import AccountMenu from './AccountMenu';
import Input from '@mui/joy/Input';
import SendIcon from '@mui/icons-material/Send';


const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" style={{ backgroundColor: '#FF5733' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Input
          variant="soft"
          placeholder="Search.."
          type="text"
          name="search"
          endDecorator={
            <IconButton variant="soft" aria-label="subscribe">
              <SendIcon />
            </IconButton>
          }
          sx={{ ml: 'auto',marginRight:'600px', display: { xs: 'none', md: 'flex' } }}
        />
       
        <div className="navbar" >
          <Button color="inherit" href="#" className="active">
            Home
          </Button>
          
          <Button color="inherit" href="#">
            Gems
          </Button>
          <Button color="inherit" href="#">
            Jewllary
          </Button>
          <Button color="inherit" href="#">
            About us
          </Button>
          <Button color="inherit" href="#">
            Support team
          </Button>

          
        </div>
        <div className="sublog">
          <AccountMenu/>
        </div>
      </Toolbar>

      
    </AppBar>
    
    
  );
};

export default Navbar;
