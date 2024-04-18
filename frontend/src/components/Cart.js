import { useAuth } from '../Auth/AuthContext';
import { Link } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  IconButton,
  InputBase,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
  const { user, cart, addItemToCart, removeItemFromCart, addQty, removeQty } = useAuth();

  const total = cart.reduce((total, item) => total + item.price * item.qty, 0);

  // Function to handle checkout button click
  const handleCheckout = () => {
    // Log item names, quantities, and total
     

     const userId = user._id;
    console.log({userId});
    console.log('Checkout clicked');
    console.log('Cart Items:');
    cart.forEach((item) => {
      console.log(`Item: ${item.name}, Quantity: ${item.qty}`);
    });
    console.log(`Total: Rs. ${total}`);
    // Navigate to checkout page
  };

  return (
    <Box sx={{ padding: '20px' , mt:10 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: 'center', marginBottom: '20px', color: '#37474F' }}
      >
        <ShoppingCartIcon sx={{ color: '#1E88E5', fontSize: '2rem' }} /> My Cart
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {cart.length === 0 ? (
            <Typography variant="body1" align="center" color="textSecondary">
              Cart is empty
            </Typography>
          ) : (
            cart.map((item, index) => (
              <Paper
                key={index}
                elevation={2}
                sx={{
                  padding: '20px',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Box sx={{ width: '100px', height: '100px', marginRight: '20px' }}>
                  <img
  src={require(`../images/${item.image}`)}
  alt={item.title}
  style={{ width: '100%', height: '100%', borderRadius: '4px' }}
/>

                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.desc}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                      <IconButton onClick={() => (item.qty > 1 ? removeQty(item._id) : removeItemFromCart(item))}>
                        <RemoveIcon sx={{fontSize:20}} />
                      </IconButton>
                      <InputBase
                        value={item.qty}
                        sx={{
                          width: '30px',
                          height:'30px',
                          textAlign: 'center',
                          border: '1px solid #B0BEC5',
                          borderRadius: '4px',
                          padding: '5px',
                          marginX: '10px',
                        }}
                        inputProps={{ min: 1, readOnly: true }}
                      />
                      <IconButton onClick={() => addQty(item._id)}>
                        <AddIcon sx={{fontSize:20}}/>
                      </IconButton>
                    </Box>
                    <Typography variant="body2" color="textSecondary" sx={{ marginTop: '10px' }}>
                      Rs. {item.price * item.qty}
                    </Typography>
                  </Box>
                  <IconButton color="error" onClick={() => removeItemFromCart(item)}>
                    <DeleteIcon sx={{fontSize:20,ml:30}}/>
                  </IconButton>
                </Box>
              </Paper>
            ))
          )}
        </Grid>
        {cart.length > 0 && (
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ padding: '20px' }}>
              <Box>
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '10px' }}>
                  Subtotal: Rs. {total}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '10px' }}>
                  Discount: Rs. 0.00
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '10px' }}>
                  Shipping: Free
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                  Total: Rs. {total}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Including VAT
                </Typography>
                
                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    sx={{ marginTop: '20px' }}
                    onClick={handleCheckout}
                  >
                    Check out
                  </Button>
              
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Cart;
