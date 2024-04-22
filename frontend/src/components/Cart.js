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
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const { user, cart, addItemToCart, removeItemFromCart, addQty, removeQty } = useAuth();

  const total = cart.reduce((total, item) => total + item.price * item.qty, 0);
  const navigate = useNavigate();
  // Function to handle checkout button click
  const handleCheckout = () => {
    const username = user.name;

    // Prepare data to be sent to the checkout page
    const checkoutData = {
      username,
      cart,
      total,
    };

    // Navigate to the checkout page and pass the data using the state option
    navigate('/checkout', { state: checkoutData });
  };

  return (
    <Box sx={{ padding: '20px', mt: 10 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ textAlign: 'center', marginBottom: '20px', color: '#1E88E5' }}
      >
        <ShoppingCartIcon sx={{ color: '#1E88E5', fontSize: '1.4rem' }} /> My Cart
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
                  width:700,
                  height:200,
                  ml:15,
                  mt:4,
                  padding: '20px',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '8px',
                  backgroundColor: '#f5f5f5',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Box
                    sx={{
                      width: '180px',
                      height: '180px',
                      marginRight: '250px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={require(`../images/${item.image}`)}
                      alt={item.title}
                      style={{ height: '100%' }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.desc}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                      <IconButton
                        onClick={() => (item.qty > 1 ? removeQty(item._id) : removeItemFromCart(item))}
                        color="primary"
                      >
                        <RemoveIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                      <InputBase
                        value={item.qty}
                        sx={{
                          width: '30px',
                          textAlign: 'center',
                          border: '1px solid #B0BEC5',
                          borderRadius: '4px',
                          padding: '5px',
                          mx: '10px',
                        }}
                        inputProps={{ min: 1, readOnly: true }}
                      />
                      <IconButton onClick={() => addQty(item._id)} color="primary">
                        <AddIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    </Box>
                    <Typography variant="body2" color="textSecondary" sx={{ marginTop: '10px' }}>
                      Rs. {item.price * item.qty}
                    </Typography>
                  </Box>
                  <IconButton color="error" onClick={() => removeItemFromCart(item)}>
                    <DeleteIcon sx={{ fontSize: 20, ml: 2 }} />
                  </IconButton>
                </Box>
              </Paper>
            ))
          )}
        </Grid>
        {cart.length > 0 && (
          <Grid item xs={12} md={4} sx={{mt:4}}>
            <Paper elevation={2} sx={{ padding: '20px', borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
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
                  sx={{ marginTop: '20px', borderRadius: '8px' }}
                  onClick={handleCheckout}
                  startIcon={<ShoppingBagIcon />}
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
