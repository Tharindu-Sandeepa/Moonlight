import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment >

<Link to="/admin">
    <ListItemButton > 
      <ListItemIcon sx={{padding:'12%'}}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    </Link>

    <Link to="/admin/users">
    <ListItemButton >

    <ListItemIcon sx={{padding:'12%'}}>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>  
    </Link>
    

    <Link to="/admin/Orders">
    <ListItemButton >
    <ListItemIcon sx={{padding:'12%'}}>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    </Link>
    
    <ListItemButton > 
    <ListItemIcon sx={{padding:'12%'}}>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Gems" />
    </ListItemButton>

    <ListItemButton >
    <Link to="/users">
    <ListItemIcon sx={{padding:'12%'}}>
        <PeopleIcon />
      </ListItemIcon>
      </Link>
      <Link to="/users">
      <ListItemText primary="Jewellery" />
      </Link>
    </ListItemButton>

    <ListItemButton >
    <ListItemIcon  sx={{padding:'12%'}}>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Inventory" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon sx={{padding:'12%'}}>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Suppliers" />
    </ListItemButton>

    <ListItemButton >
      <ListItemIcon sx={{padding:'12%'}}>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Employees" />
    </ListItemButton>

    <ListItemButton >
      <ListItemIcon sx={{padding:'12%'}}>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Customer Service" />
    </ListItemButton>
  </React.Fragment>
);


