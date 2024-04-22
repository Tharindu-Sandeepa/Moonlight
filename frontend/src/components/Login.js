
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../img/logo.png';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const defaultTheme = createTheme();

function Login ({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5002/api/login', {
        email,
        password,
      });

      const { token, username, type } = response.data;

      Cookies.set('token', token); // Set token as cookie
      
      
      onLogin({ token ,type }); 

      if (type === 'Admin') {

        toast.success('Welcome Manager', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
        navigate('/newum'); 
      } else {
        toast.success('Welcome Customer', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
        navigate('/'); 
      } 
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Server error');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper elevation={3} sx={{  borderRadius: 10,  width:'200%', }}>
            <Grid container spacing={0}  >
              {/* Left Side (Logo) */}
              
  <Grid item xs={4} sx={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20, background:'#B2BFFF', padding:5 }}>
  <Grid container direction="column" justifyContent="space-between" alignItems="center" style={{ height: '100%' }}>
    <Box>
      <Typography component="h1" variant="h7" align="center" sx={{marginTop:10, color:'white'}}>
      Welcome Back
      </Typography>
    </Box>
    <Box>
    <img src={logo} alt="Company Logo" style={{ height: '120px', display: 'block', margin: 'auto' }} />
    </Box>
    <Box>
      <Typography component="h1" variant="h5" align="center" sx={{marginBottom:10}}>
      Login to your Account

      </Typography>
      
    </Box>
  </Grid>
</Grid>



              {/* Right Side (Input Fields) */}
              <Grid item xs={8} sx={{  borderTopRightRadius: 20, borderBottomRightRadius: 20, padding:4}}>
                <Typography component="h1" variant="h7">
                  Sign In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                {error && <FormHelperText error>{error}</FormHelperText>}
                  <Grid container spacing={2} sx={{marginTop:10}}>
                    
                    <Grid item xs={12}>
                    
                    <TextField
              label="Email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />

      
                    </Grid>
                    
                    <Grid item xs={12}>
                   
            <TextField
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
         </Grid>
                   
                    <Grid container justifyContent="center" sx={{marginTop:10}}>
                    <Grid item>
                      <Link href="#" variant="body2">
                      Forgot Password ?
                      </Link>
                    </Grid>
                  </Grid>
                  </Grid>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
  <Button type="submit" 
   
    variant="contained"
    sx={{
      mt: 3,
      mb: 2,
      color:"black",
      fontStyle:'bold',
      borderRadius: '40px', 
      width: '30%', 
      backgroundColor: '#B2BFFF', 
      '&:hover': {
        backgroundColor: '#0d47a1', 
      },
    }}
  >
    Login
  </Button>
</Box>

                  <Grid container justifyContent="center">
                    <Grid item>
                      <Link href="#" variant="body2">
                      If Doesn’t have an account ?  Register
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  
  );
};

export default Login;
