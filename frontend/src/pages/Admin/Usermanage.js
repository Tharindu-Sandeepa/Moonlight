import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems} from './listItems';
import Button from '@mui/material/Button';
import Deposits from './Deposits';

import Users from './Users/Users';




const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),


  
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#1565c0', // Adjust the primary color
    },
    secondary: {
      main: '#FF0000', // Adjust the secondary color
    },
  },
 
typography: {
  fontFamily: 'Tahoma, sans-serif', // Change the default font family
  fontSize: 16, // Change the default font size
  h1: {
    fontSize: '2.5rem', // Adjust the font size for heading 1
    fontWeight: 'bold', // Adjust the font weight for heading 1
    lineHeight: 1.2, // Adjust the line height for heading 1
  },
  h2: {
    fontSize: '2rem', // Adjust the font size for heading 2
    fontWeight: 'bold', // Adjust the font weight for heading 2
    lineHeight: 1.2, // Adjust the line height for heading 2
  },
  // Add more typography styles as needed for other heading levels
},
spacing: 8, // Adjust the spacing between elements, default is 8px
breakpoints: {
  values: {
    xs: 0, // Extra small devices (phones, less than 600px)
    sm: 600, // Small devices (tablets, 600px and up)
    md: 960, // Medium devices (desktops, 960px and up)
    lg: 1280, // Large devices (desktops, 1280px and up)
    xl: 1920, // Extra large devices (large desktops, 1920px and up)
  },
},
shape: {
  borderRadius: 8, // Adjust the default border radius for components
},
overrides: {
  // Add custom styles for specific components or elements
},
});

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              User Management
            </Typography>
            <IconButton color="inherit">

            <Link href="/">
    <Button sx={{color:'#B5E8FC'}}>Home</Button>
  </Link>
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
           
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
            {/* 
              
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits /> show Users.js file  
                </Paper>
              </Grid>*/}
              

              {/* users */}
              <Grid item xs={12}>
                
                  <Users />   {/* show Users.js file  */}
               
              </Grid>
            </Grid>
            
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

