import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../img/logo.png';
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    Grid,
    Paper,
    CssBaseline,
    FormHelperText,
    ThemeProvider,
    createTheme,
    CircularProgress,
} from '@mui/material';

const defaultTheme = createTheme();

const OTPVerificationPage = () => {
    const { state } = useLocation(); // Retrieve state (email, OTP)
    const navigate = useNavigate();
    const [inputOTP, setInputOTP] = useState(['', '', '', '']);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Handles OTP input change for each box
    const handleOTPChange = (index, value) => {
        const newOTP = [...inputOTP];
        newOTP[index] = value;
        setInputOTP(newOTP);

        // Focus on the next input box when one is filled
        if (value && index < 3) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    // Handles OTP verification
    const handleVerifyOTP = async () => {
        const enteredOTP = inputOTP.join('');
        if (enteredOTP === state.OTP.toString()) {
            // OTP is correct, navigate to password update page
            navigate('/update-password', { state: { email: state.email } });
        } else {
            setError('Incorrect OTP. Please try again.');
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
                                    <Typography component="h1" variant="h5" align="center" sx={{ marginTop: 10,mb:6, color: 'white' }}>
                                            OTP Verification
                                        </Typography>
                                    </Box>
                                    <Box sx={{mb:7}}>
                                        <img src={logo} alt="Company Logo" style={{ height: '120px', display: 'block', margin: 'auto' }} />
                                    </Box>
                                   
                                </Grid>
                            </Grid>

                            {/* Right Side (OTP Input Fields and Verification Button) */}
                            <Grid
                                item
                                xs={8}
                                sx={{
                                    borderTopRightRadius: 20,
                                    borderBottomRightRadius: 20,
                                    padding: 4,
                                }}
                            >
                                <Box sx={{mt:12}}>
                                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1, textAlign: 'center' }}>
                                        Please enter the 4-digit OTP sent to your email.
                                    </Typography>
                                    <Grid container spacing={2} justifyContent="center">
                                        {inputOTP.map((value, index) => (
                                            <Grid item key={index} xs={3}>
                                                <TextField
                                                    inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                                                    id={`otp-input-${index}`}
                                                    type="text"
                                                    variant="outlined"
                                                    value={value}
                                                    onChange={(e) => handleOTPChange(index, e.target.value)}
                                                    fullWidth
                                                    required
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                    {error && (
                                        <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: 'center' }}>
                                            {error}
                                        </Typography>
                                    )}
                                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleVerifyOTP}
                                            disabled={inputOTP.includes('')}
                                            sx={{
                                                color: 'black',
                                                fontStyle: 'bold',
                                                mt:6,
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
                                                'Verify OTP'
                                            )}
                                        </Button>
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

export default OTPVerificationPage;
