import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Typography, Button, Grid, IconButton, Box, CircularProgress } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useAuth } from '../../Auth/AuthContext';

import FeedbackIcon from '@mui/icons-material/Feedback';
import { Link } from 'react-router-dom';

const ItemPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State variable for loading
  const { user, userRole, addItemToCart } = useAuth();

  useEffect(() => {
    if (itemId) {
      getItem(itemId);
    }
  }, [itemId]);

  const getItem = async (itemId) => {
    try {
      setIsLoading(true); // Start loading
      const result = await axios.get(`http://localhost:5002/get-item/${itemId}`);
      setItem(result.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div style={{ padding: '0px', backgroundColor: '#f5f5f5' }}>
      <Box sx={{ mt: 16 }}>
        {/* Render loader if isLoading is true */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          item && (
            <Grid container spacing={4} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
              <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  src={require(`../../images/${item.image}`)}
                  alt={item.name}
                  style={{ width: '100%', maxWidth: '400px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <div>
                    <Typography variant="h4" gutterBottom style={{ color: '#007BFF' }}>{item.name}</Typography>
                    <Typography variant="body2" gutterBottom style={{ color: '#555' }}>
                      Type: {item.type}
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ color: '#333' }}>
                      Price: Rs {item.price}
                    </Typography>
                    <Typography variant="body2" gutterBottom style={{ color: '#777' }}>
                      Description: {item.description}
                    </Typography>
                  </div>
                  <Box style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <Button
                      onClick={() => addItemToCart(item)}
                      variant="contained"
                      color="primary"
                      startIcon={<ShoppingCartIcon />}
                      style={{ marginRight: '10px' }}
                    >
                      Add to Cart
                    </Button>
                    <IconButton color="secondary">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton color="primary">
                    <Button
      variant="contained"
      color="primary"
      startIcon={<FeedbackIcon />} // Add the Feedback icon to the start of the button
      component={Link} // Use Link from react-router-dom to handle navigation
      to="/feedback" // The route to navigate to
      sx={{
        padding: '8px 16px', // Padding for the button
        borderRadius: '8px', // Rounded corners
      }}
    >
      Add Feedback
    </Button>
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )
        )}
      </Box>
    </div>
  );
};

export default ItemPage;
