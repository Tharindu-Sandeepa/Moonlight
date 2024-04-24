import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract checkout data from the state
  const { username, cart, total } = location.state || {};

  // State variables to store payment details
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [slip, setSlip] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Create an order object
    const orderData = {
      userID: username, // Assuming username is used as the userID
      orderID: Date.now().toString(), // Generate a unique order ID
      items: cart,
      total,
      date: new Date().toISOString(),
      slip: '', // If you have slip data, you can add it here
      status: 'Pending', // Assuming a default status for the order
    };

    try {
      // Send the order data to the backend API to store it in the database
      const response = await axios.post('http://localhost:5002/api/orders/createorder', orderData);

      if (response.status === 200) {
        // If the order is successfully stored, navigate to a confirmation page
        navigate('/order-confirmation');
      } else {
        // Handle any errors
        console.error('Error storing order:', response.statusText);
      }
    } catch (error) {
      console.error('Error storing order:', error);
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
            <Typography>User Name : {username}</Typography>
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
              {/* Card Number Input */}
              <TextField
                fullWidth
                label="Amount"
                variant="outlined"
                margin="normal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />

              {/* Expiration Date Input */}
              <TextField
                fullWidth
                label="Expiration Date (MM/YY)"
                variant="outlined"
                margin="normal"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                required
              />

              {/* CVV Input */}
              <TextField
                fullWidth
                label="CVV"
                variant="outlined"
                margin="normal"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
                type="password"
              />

              {/* Billing Address Input */}
              <TextField
                fullWidth
                label="Billing Address"
                variant="outlined"
                margin="normal"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
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
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;
