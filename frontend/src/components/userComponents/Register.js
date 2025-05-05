import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../img/logo.png';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultTheme = createTheme();

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const type = "User";
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({}); // for validation errors
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const formErrors = {};
    if (!name) {
      formErrors.name = 'Name is required';
    }
    if (!username) {
      formErrors.username = 'Username is required';
    }
    if (!validateEmail(email)) {
      formErrors.email = 'Invalid email format';
    }
    if (!validatePassword(password)) {
      formErrors.password = 'Password must be at least 8 characters long and include at least one letter and one number';
    }
    if (password !== confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }
    if (!validatePhoneNumber(phone)) {
      formErrors.phone = 'Phone number must be 10 digits long';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; 
  };

  const handleRegister = async () => {
    
    const isFormValid = validateForm();
    if (!isFormValid) {
      return; // dont form submission if validation fails
    }

    try {
      const payload = {
        name,
        username,
        email,
        tp: phone,
        type,
        password,
      };
      const response = await axios.post('http://localhost:5002/api/register', payload);
      console.log('Registration successful:', response.data);

      toast.success('Registered', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response && error.response.status === 500) {
        setError('That email is already in use');
      } else {
        setError(error.response?.data?.message || 'An unexpected error occurred');
      }
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
          <Paper elevation={3} sx={{ borderRadius: 10, width: '200%' }}>
            <Grid container spacing={0}>
              {/* Left Side (Logo) */}
              <Grid item xs={4} sx={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20, background: '#B2BFFF', padding: 5 }}>
                <Grid container direction="column" justifyContent="space-between" alignItems="center" style={{ height: '100%' }}>
                  <Box>
                    <Typography component="h1" variant="h7" align="center" sx={{ marginTop: 10, color: 'white' }}>
                      Welcome
                    </Typography>
                  </Box>
                  <Box>
                    <img src={logo} alt="Company Logo" style={{ height: '120px', display: 'block', margin: 'auto' }} />
                  </Box>
                  <Box>
                    <Typography component="h1" variant="h5" align="center" sx={{ marginBottom: 10 }}>
                      Let’s Get you setup
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Right Side (Input Fields) */}
              <Grid item xs={8} sx={{ borderTopRightRadius: 20, borderBottomRightRadius: 20, padding: 4 }}>
              <Typography
    component="h1"
    variant="h7"
    sx={{
        fontWeight: 'bold', // Use 'bold' for bold text
        color: 'gray', // Use 'gray' for gray color
    }}
>
                  Sign up
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        type="text"
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="text"
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        error={!!errors.username}
                        helperText={errors.username}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            setEmail(newValue);
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              email: validateEmail(newValue) ? '' : 'Invalid email format',
                            }));
                        }}
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            setPassword(newValue);
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              password: validatePassword(newValue) ? '' : 'Password must be at least 8 characters long and include at least one letter and one number',
                            }));
                        }}
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="password"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            setConfirmPassword(newValue);
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              confirmPassword: password === newValue ? '' : 'Passwords do not match',
                            }));
                        }}
                        fullWidth
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="text"
                        label="Phone Number"
                        value={phone}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            setPhone(newValue);
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              phone: validatePhoneNumber(newValue) ? '' : 'Phone number must be 10 digits long',
                            }));
                        }}
                        fullWidth
                        error={!!errors.phone}
                        helperText={errors.phone}
                      />
                    </Grid>
                  
                  </Grid>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      onClick={handleRegister}
                      variant="contained"
                      sx={{ mt: 3, mb: 2, color: 'black', fontStyle: 'bold', borderRadius: '40px', width: '30%', backgroundColor: '#B2BFFF', '&:hover': { backgroundColor: '#0d47a1' } }}
                    >
                      Register
                    </Button>
                  </Box>
                  {error && <Typography sx={{ color: 'red', textAlign: 'center', marginTop: 1 }}>{error}</Typography>}
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Link href="/login" variant="body2">
                        Already have an account? Sign in
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

export default Register;
