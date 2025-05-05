import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    Paper,
    Grid,
    CssBaseline,
    ThemeProvider,
    createTheme,
    CircularProgress,
} from '@mui/material';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../img/logo.png';

const defaultTheme = createTheme();

const PasswordUpdatePage = () => {
    const { state } = useLocation(); // Retrieve email from state
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Password validation function
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    };

    // Validate the new password and confirm password fields
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (newPassword === '') {
            setPasswordError('');
        } else if (!validatePassword(newPassword)) {
            setPasswordError('Password must be at least 8 characters long and contain letters and numbers.');
        } else {
            setPasswordError('');
        }

        if (newPassword !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);

        if (newConfirmPassword === '') {
            setConfirmPasswordError('');
        } else if (newConfirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match.');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleUpdatePassword = async () => {
        // Prevent updating password if there are validation errors
        if (passwordError || confirmPasswordError) {
            return;
        }

        setLoading(true);
        try {
            // Update password request
            await axios.post('http://localhost:5002/api/users/update-password', {
                email: state.email,
                password,
            });
            // Redirect to login page after updating password
            navigate('/login');
            toast.success('Password updated successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            toast.error('Failed to update password. Please try again.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.error(error);
        } finally {
            setLoading(false);
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
                            {/* Left Side (Header) */}
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
                                        <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 10,mb:6, color: 'white' }}>
                                            Change Password
                                        </Typography>
                                    </Box>
                                    <Box sx={{mb:7}}>
                                        <img src={logo} alt="Company Logo" style={{ height: '120px', display: 'block', margin: 'auto' }} />
                                    </Box>
                                  
                                </Grid>
                            </Grid>

                            {/* Right Side (Form) */}
                            <Grid
                                item
                                xs={8}
                                sx={{
                                    borderTopRightRadius: 20,
                                    borderBottomRightRadius: 20,
                                    padding: 4,
                                }}
                            >
                                <Box sx={{ mt: 8 }}>
                                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2, textAlign: 'center' }}>
                                        For your email : {state.email}
                                    </Typography>
                                    <Box>
                                        <TextField
                                            label="New Password"
                                            type="password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            fullWidth
                                            margin="normal"
                                            required
                                            error={!!passwordError}
                                            helperText={passwordError}
                                        />
                                        <TextField
                                            label="Confirm Password"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={handleConfirmPasswordChange}
                                            fullWidth
                                            margin="normal"
                                            required
                                            error={!!confirmPasswordError}
                                            helperText={confirmPasswordError}
                                        />
                                        <Box sx={{ mt: 3, textAlign: 'center' }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleUpdatePassword}
                                                disabled={loading || !!passwordError || !!confirmPasswordError || !password || !confirmPassword}
                                                sx={{
                                                    color: 'black',
                                                    fontStyle: 'bold',
                                                    borderRadius: '40px',
                                                    width: '30%',
                                                    backgroundColor: '#B2BFFF',
                                                    '&:hover': {
                                                        backgroundColor: '#0d47a1',
                                                    },
                                                }}
                                            >
                                                {loading ? (
                                                    <CircularProgress size={24} color="inherit" />
                                                ) : (
                                                    'Change'
                                                )}
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default PasswordUpdatePage;
