import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {Box,Typography,Paper,Grid,TextField,Button} from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract checkout data from the state
  const { userId, cart, total } = location.state || {};

  // State variables to store payment details
  const [amount, setAmount] = useState('');
  const [slip, setSlip] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        userId,
        cart,
        total,
        paymentDetails: {
          amount,
          slip,
          paymentDate,
        },
      }
      const response = await axios.post('http://localhost:5002/api/orders/createorder', payload);
      console.log('Checkout successful:', response.data);
      navigate('/admin/Orders');
    } catch (error) {
      console.error('Checkout failed:', error);
    }
    
  };

  return (
    <Box sx={{ padding: '20px', mt: 10 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ textAlign: 'center', marginBottom: '20px', color: '#1E88E5' }}
      >
        <ShoppingBagIcon sx={{ color: '#1E88E5', fontSize: '1.4rem' }} /> Checkout
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Review Your Order
            </Typography>

            {/* Display the cart items */}
            {cart.map((item, index) => (
              <div key={index} style={{ marginTop: '10px' }}>
                <Typography variant="body1">
                  {item.name} (x{item.qty}): Rs. {item.price * item.qty}
                </Typography>
              </div>
            ))}

            <Typography variant="body1" sx={{ marginTop: '20px' }}>
              Total: Rs. {total}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Payment Details
            </Typography>

            <form onSubmit={handleSubmit}>
              {/* Amount Input */}
              <TextField
                fullWidth
                label="Amount"
                variant="outlined"
                margin="normal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />

              {/* Slip Input */}
              <TextField
                fullWidth
                label="Slip"
                variant="outlined"
                margin="normal"
                value={slip}
                onChange={(e) => setSlip(e.target.value)}
                required
              />

              {/* Payment Date Input */}
              <TextField
                fullWidth
                //label="Payment Date"
                variant="outlined"
                margin="normal"
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                required
              />

              {/* Submit Button */}
            
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ marginTop: '20px' }}
                >
                  Place Order
                </Button>
              

              {paymentSubmitted && (
                <Typography variant="body1" sx={{ marginTop: '20px' }}>
                  Payment Submitted Successfully!
                </Typography>
              )}
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;
