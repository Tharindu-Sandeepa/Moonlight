import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Box, TextField, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const ImageGridPage = () => {
  const [allImage, setAllImage] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      const result = await axios.get("http://localhost:5002/get-images");
      setAllImage(result.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Utility function to check if an image file exists
  const imageExists = (path) => {
    try {
      require(`../../images/${path}`);
      return true;
    } catch (error) {
      console.warn(`Image file not found: ../../images/${path}`);
      return false;
    }
  };

  // Filter images based on the search query and check if image file exists
  const filteredImages = allImage.filter(data => 
    (data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    data.type.toLowerCase().includes(searchQuery.toLowerCase())) &&
    imageExists(data.image)
  );

  return (
    <div>
      <Box sx={{ mt: 12, padding: 2, display: 'flex', justifyContent: 'center' }}>
        {/* Search input field with icon */}
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          sx={{
            width: '50%', // Adjust the width as desired
            borderRadius: '8px', // Rounded corners
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Grid container spacing={4}>
        {filteredImages.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Link to={`/item/${data._id}`} style={{ textDecoration: 'none' }}>
              <Card sx={{ margin: 3, borderRadius: '12px', width: 270, height: 270 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={require(`../../images/${data.image}`)}
                    alt={`Image ${index}`}
                    sx={{ height: 270 }} // Ensures the image is square
                  />
                </CardActionArea>
              </Card>
              <CardContent sx={{ textAlign: 'left', ml: 1.4, mt: -2.6 }}>
                {/* Display the name */}
                <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1rem' }}>
                  {data.name}
                </Typography>
                {/* Display the price below the name */}
                <Typography variant="body2" color="primary" component="div">
                  Rs {data.price}
                </Typography>
              </CardContent>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ImageGridPage;
