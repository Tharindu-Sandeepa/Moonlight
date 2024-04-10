import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, FormControl, FormHelperText, Grid } from '@mui/material';

function NewLogin({ onLogin }) {
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

      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('type', type);
      onLogin({ username, token  }); 
      if (type === 'Admin') {
        navigate('/admin/users'); 
      } else {
        navigate('/'); 
      } 
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Server error');
    }
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5 }}> {/* Add margin top for spacing */}
        {error && <FormHelperText error>{error}</FormHelperText>}
        <Grid container spacing={2}>
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
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default NewLogin;
