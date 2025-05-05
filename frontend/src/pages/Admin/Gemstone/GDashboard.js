import React from 'react';
import { Typography, Button, Grid, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DiamondIcon from '@mui/icons-material/Diamond';
import { useNavigate } from 'react-router-dom';
import EditNotificationsRoundedIcon from '@mui/icons-material/EditNotificationsRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import Dashboard from '../Dashboard';
function App() {
  const navigate = useNavigate();

  return (

<Dashboard title="Gem Management">

    <div style={{ background: '#f2f2f2', minHeight: '100vh', padding: '20px' }}>
      <Typography variant='h4' align='left' sx={{ fontFamily: 'Nunito Sans', color: '#333', display: 'flex', alignItems: 'center' }}>
        <span>Gem Catalogue Dashboard</span>
        <DiamondIcon sx={{ marginLeft: '10px' }} />
      </Typography>
      <br /><br />
      <Grid container spacing={3} justifyContent="center">
        {dashboardItems.map((item, index) => (
          <Grid key={index} item xs={12} sm={3}>
            <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', borderRadius: '20px', padding: '20px', backgroundColor: '#fff' }}>
              {item.icon && <item.icon sx={{ fontSize: 40, color: '#1565c0', marginBottom: '10px' }} />}
              <Typography variant="h6" sx={{ textAlign: 'left', marginBottom: '20px' }}>{item.title}</Typography>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => navigate(item.route)}
                startIcon={<AddIcon />}
                sx={{
                  borderRadius: '55px',
                  boxShadow: '0 0 10px 5px rgba(70, 67, 255, 0.5), 0 0 0 3px #ffffff',
                  backgroundImage: 'linear-gradient(45deg, #0000ff, #0066ff, #0099ff, #00ccff, #000080)',
                  backgroundSize: '200% 200%',
                  transition: 'background-position 0.5s',
                  '&:hover': {
                    backgroundPosition: 'right center',
                  },
                }}
              >
                {item.buttonText}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
    </Dashboard>
  );
}

const dashboardItems = [
  { title: 'Add to stock', route: '/Gem', buttonText: 'View Gems', icon: InventoryRoundedIcon },
  { title: 'All Inquiries', route: '/Allinquiry', buttonText: 'Manage Inquiries', icon: EditNotificationsRoundedIcon },
  { title: 'Display ', route: '/GemItemlist', buttonText: 'Displayed Gems', icon: DiamondIcon },
  { title: 'Add', route: '/AddGemItem', buttonText: 'New Display', icon: AddAPhotoRoundedIcon },
];

export default App;
