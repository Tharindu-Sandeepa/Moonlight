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
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DiamondIcon from '@mui/icons-material/Diamond';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import Groups2Icon from '@mui/icons-material/Groups2';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export const mainListItems = (
  <React.Fragment >

<Link to="/admin">
    <ListItemButton > 
      <ListItemIcon >
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    </Link>

    <Link to="/newum">
    <ListItemButton >

    <ListItemIcon >
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>  
    </Link>
    

    <Link to="/admin/Orders">
    <ListItemButton >
    <ListItemIcon >
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    </Link>
    
    <Link to ="/itemlist">
    <ListItemButton > 
    <ListItemIcon >
        <AutoAwesomeIcon />
      </ListItemIcon>
      <ListItemText primary="Jewellery" />
    </ListItemButton>
    </Link>

    <Link to="/GDashboard" >
 <ListItemButton >
    
    <ListItemIcon >
        <DiamondIcon />
      </ListItemIcon>
      
      <ListItemText primary="Gems" />
     
    </ListItemButton>
    </Link>


    <ListItemButton >
    <ListItemIcon  >
        <WarehouseIcon />
      </ListItemIcon>
      <ListItemText primary="Inventory" />
    </ListItemButton>

    <Link to="/supplyorder">
    <ListItemButton>
      <ListItemIcon >
        <Groups2Icon />
      </ListItemIcon>
      <ListItemText primary="Suppliers" />
    </ListItemButton>
    </Link>
  
    <ListItemButton >
      <ListItemIcon >
        <EngineeringIcon />
      </ListItemIcon>
      <ListItemText primary="Employees" />
    </ListItemButton>

<Link to="/AdminFeedbackView">
    <ListItemButton >
      <ListItemIcon >
        <SupportAgentIcon />
      </ListItemIcon>
      <ListItemText primary="Manage Feedback" />
    </ListItemButton></Link>
  </React.Fragment>
);


