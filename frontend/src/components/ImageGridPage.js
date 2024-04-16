import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ImageGridPage = () => {
  const [allImage, setAllImage] = useState(null);

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      const result = await axios.get("http://localhost:5003/get-images");
      setAllImage(result.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      
      <Grid container spacing={2} sx={{mt:13}}> 
        {allImage &&
          allImage.map((data, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Link to={`/item/${data._id}`} style={{ textDecoration: 'none' }}>
                <Card sx={{ margin: 2 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="300"
                      image={require(`../images/${data.image}`)}
                      alt={`Image ${index}`}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {data.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        Price: Rs {data.price}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default ImageGridPage;
