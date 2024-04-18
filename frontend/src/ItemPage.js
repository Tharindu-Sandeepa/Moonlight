import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Typography, Button, Grid, IconButton, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from './Auth/AuthContext';


const ItemPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  const { userRole, addItemToCart } = useAuth();

  useEffect(() => {
    if (itemId) {
      getItem(itemId);
    }
  }, [itemId]);

  const getItem = async (itemId) => {
    try {
      const result = await axios.get(`http://localhost:5002/get-item/${itemId}`);
      setItem(result.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = () => {
    // Implement your add to cart logic here
    console.log("Item added to cart:", item);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Box sx={{mt:16}}>
      {item && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={require(`./images/${item.image}`)}
              alt={item.name}
              style={{ width: '100%', maxWidth: '300px', borderRadius: '8px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div>
                <Typography variant="h4" gutterBottom>{item.name}</Typography>
                <Typography variant="body1" gutterBottom>Type: {item.type}</Typography>
                <Typography variant="body1" gutterBottom>Price: Rs {item.price}</Typography>
                <Typography variant="body1" gutterBottom>Description: {item.description}</Typography>
              </div>
              <Button onClick={()=>addItemToCart(item)} variant="contained" color="primary" startIcon={<ShoppingCartIcon />}>
                Add to Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}</Box>
    </div>
  );
};

export default ItemPage;
