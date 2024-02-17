import React from 'react';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import item from '../img/item.jpeg'

const TrendPage = () => {
  // Sample jewelry items data
  const jewelryItems = [
    { id: 1, name: 'Diamond Necklace', imageUrl: item, price: '$500' },
    { id: 2, name: 'Gold Earrings', imageUrl: item, price: '$200' },
    { id: 3, name: 'Silver Bracelet', imageUrl: item, price: '$100' },
    { id: 1, name: 'Diamond Necklace', imageUrl: item, price: '$500' },
    { id: 2, name: 'Gold Earrings', imageUrl: item, price: '$200' },
    { id: 3, name: 'Silver Bracelet', imageUrl: item, price: '$100' },
    { id: 1, name: 'Diamond Necklace', imageUrl: item, price: '$500' },
    { id: 2, name: 'Gold Earrings', imageUrl: item, price: '$200' }
    // Add more jewelry items as needed
  ];

  return (
    <div>
      <h2>Trending Jewelry Items</h2>
      <Grid container spacing={2}>
        {jewelryItems.map(item => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300"
                  image={item.imageUrl}
                  alt={item.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Price: {item.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TrendPage;
