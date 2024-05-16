import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Grid, TextField, Button, InputLabel } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract checkout data from the state
  const { username, cart, total } = location.state || {};

  // State variables to store payment details
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [slip, setSlip] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result;
        setSlip(base64String);
      };

      reader.readAsDataURL(file);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};

    if (!amount.trim()) {
      errors.amount = 'Amount is required';
    } else if (isNaN(amount)) {
      errors.amount = 'Amount must be a number';
    } else if (Number(amount) < 1000) {
      errors.amount = 'Amount must be greater than Rs.1000.00';
    }

    if (!paymentDate) {
      errors.paymentDate = 'Payment Date is required';
    }

    if (!slip) {
      errors.slip = 'Slip is required';
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Create an order object
      const orderData = {
        userID: username,
        orderID: Date.now().toString(),
        items: cart,
        total,
        amount,
        date: new Date().toISOString(),
        slip: slip || '', // Include the slip data if available, otherwise empty string
      };

      try {
        // Send the order data to the backend API to store it in the database
        const response = await axios.post('http://localhost:5002/api/orders/createorder', orderData);

        if (response.status === 200) {
          // If the order is successfully stored, navigate to a confirmation page
          navigate('/');

          // Reload the page
          window.location.reload();

          // Show success message
          toast.success('Order placed successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          });
        } else {
          // Handle any errors
          console.error('Error storing order:', response.statusText);
          toast.error('Failed to place order. Please try again later.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          });
        }
      } catch (error) {
        console.error('Error storing order:', error);
        toast.error('Failed to place order. Please try again later.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }
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
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h6" margin="20px" sx={{ fontWeight: 'bold' }}>
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
            <Typography variant="h6" margin="20px" sx={{ fontWeight: 'bold' }}>
              Payment Details
            </Typography>

            <Box>
              <Typography variant="body1" gutterBottom>
                Name: U.K.Sunandha
              </Typography>
              <Typography variant="body1" gutterBottom>
                Account Number: 1050 5226 2750
              </Typography>
              <Typography variant="body1" gutterBottom>
                Bank Name: SAMPATH BANK PLC
              </Typography>
              <Typography variant="body1" gutterBottom>
                Branch Name: KALUTARA BRANCH
              </Typography>
              
              <Typography variant="body2">
                The amount should be more than Rs.1000 .00 
              </Typography>
              <Typography variant="body2">
                Transfer the deposit amount to the provided bank account details.
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h6" margin="20px" sx={{ fontWeight: 'bold' }}>
              Payment Form
            </Typography>

            <form onSubmit={handleSubmit}>
              {/* Amount Input */}
              <TextField
                fullWidth
                margin="normal"
                label="Amount"
                variant="outlined"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                error={Boolean(errors.amount)}
                helperText={errors.amount}
                required
              />

              {/* Payment Date Input */}
              <TextField
                fullWidth
                margin="normal"
                type="date"
                variant="outlined"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                error={Boolean(errors.paymentDate)}
                helperText={errors.paymentDate}
                required
              />

              {/* Upload Slip Input */}
              <InputLabel>Upload Slip</InputLabel>
              <TextField
                margin="normal"
                type="file"
                accept="image/*"
                onChange={handleChange}
                error={Boolean(errors.slip)}
                helperText={errors.slip}
                fullWidth
                variant="outlined"
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
