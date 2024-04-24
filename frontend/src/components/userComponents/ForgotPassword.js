import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Container, TextField, Typography, Box } from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const sendVerificationCode = () => {
    // Display a toast message indicating that the function is not complete yet
    toast.info('This function is not completed yet', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // Navigate to the login page
    navigate('/login');
  };

  return (
    <Container component="main" maxWidth="xs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Box sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 1 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Forgot Password
        </Typography>
        <TextField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          fullWidth
          margin="normal"
          variant="outlined"
          label="Email"
        />
        <Button
          onClick={sendVerificationCode}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Send Verification Code
        </Button>
       
      </Box>
    </Container>
  );
};

export default ForgotPassword;
