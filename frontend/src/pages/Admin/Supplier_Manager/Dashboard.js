import React from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidenav from '../../../src/component/Sidenav';

function Dashboard() {
  const navigate = useNavigate();


  return (
    <Sidenav>
      <Typography variant="h4" gutterBottom>Welcome to Supplier Manager Dashboard</Typography>
      <Button variant="contained" onClick={() => navigate('/supplyorder')}>
        Supplier Manager
      </Button>

      
    </Sidenav>
  );
}

export default Dashboard;
