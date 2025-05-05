import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../img/logo.png';
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

import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress

const defaultTheme = createTheme();

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state for both API calls
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true before API call

        try {
            const response = await axios.post('http://localhost:5002/api/login', {
                email,
                password,
            });

            const { token, username, type } = response.data;

            Cookies.set('token', token); // Set token as cookie

            onLogin({ token, type });

            if (type === 'Admin') {
                toast.success('Welcome Manager', {
                    position: 'top-right',
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
                    position: 'top-right',
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
        } finally {
            setLoading(false); // Set loading state back to false after API call
        }
    };

    const handleForgotPassword = async () => {
        if (email) {
            const OTP = Math.floor(Math.random() * 9000) + 1000; // Generate OTP
            setLoading(true); // Set loading state to true before API call

            try {
                await axios.post('http://localhost:5002/api/email/send_recovery_email', {
                    OTP,
                    recipient_email: email,
                });

                // Show success toast message
                toast.success('Recovery email sent successfully!');

                // Navigate to OTP verification page with email and OTP as state
                navigate('/otp-verification', { state: { email, OTP } });
            } catch (error) {
                // Show error toast message
                toast.error('Failed to send recovery email.');
                console.error(error);
            } finally {
                // Set loading state back to false
                setLoading(false);
            }
        } else {
            alert('Please enter your email');
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
                            <Grid
                                item
                                xs={4}
                                sx={{
                                    borderTopLeftRadius: 20,
                                    borderBottomLeftRadius: 20,
                                    background: '#B2BFFF',
                                    padding: 5,
                                }}
                            >
                                <Grid container direction="column" justifyContent="space-between" alignItems="center" style={{ height: '100%' }}>
                                    <Box>
                                    <Typography component="h1" variant="h7" align="center" sx={{ marginTop: 10,mb:6, color: 'white' }}>
                                            Welcome 
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <img src={logo} alt="Company Logo" style={{ height: '120px', display: 'block', margin: 'auto' }} />
                                    </Box>
                                    <Box>
                                    <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 10,mb:6,  }}>
                                            Login to your Account
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                            {/* Right Side (Input Fields) */}
                            <Grid
                                item
                                xs={8}
                                sx={{
                                    borderTopRightRadius: 20,
                                    borderBottomRightRadius: 20,
                                    padding: 4,
                                }}
                            >
                               <Typography
    component="h1"
    variant="h7"
    sx={{
        fontWeight: 'bold', // Use 'bold' for bold text
        color: 'gray', // Use 'gray' for gray color
    }}
>
    Sign In
</Typography>

                                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                    {error && <FormHelperText error>{error}</FormHelperText>}
                                    <Grid container spacing={2} sx={{ marginTop: 10 }}>
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

                                        <Grid container justifyContent="center" sx={{ marginTop: 10 }}>
                                            <Grid item>
                                                <Button
                                                    onClick={handleForgotPassword}
                                                    color="primary"
                                                    variant="text"
                                                    disabled={loading} // Disable the button while loading
                                                >
                                                    {loading ? (
                                                        <CircularProgress size={16} color="inherit" />
                                                    ) : (
                                                        'Forgot Password?'
                                                    )}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{
                                                mt: 3,
                                                mb: 2,
                                                color: 'black',
                                                fontStyle: 'bold',
                                                borderRadius: '40px',
                                                width: '30%',
                                                backgroundColor: '#B2BFFF',
                                                '&:hover': {
                                                    backgroundColor: '#0d47a1',
                                                },
                                            }}
                                            disabled={loading} // Disable the button while loading
                                        >
                                            {loading ? (
                                                <CircularProgress size={24} color="inherit" />
                                            ) : (
                                                'Login'
                                            )}
                                        </Button>
                                    </Box>

                                    <Grid container justifyContent="center">
                                        <Grid item>
                                            <Link href="/register" variant="body2">
                                                If you don’t have an account, register
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
}

export default Login;
