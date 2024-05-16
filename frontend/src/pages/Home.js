import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from '../components/Slider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Container,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Zoom, Slide, Fade } from 'react-awesome-reveal';

import Zircon from '../img/Zircon.png';
import GreenSapphire from '../img/Green Sapphire.png';
import PadparadschaSapphire from '../img/Padparadscha Sapphire.png';
import PinkSapphire from '../img/Pink Sapphire.png';
import Ruby from '../img/Rubyy.png';
import YellowSapphire from '../img/Yellow Sapphire.png';
import gemlot from '../img/gemm.png'
const StyledHome = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: theme.spacing(3),
  textAlign: 'center',
}));

// Function to check if an image file exists
const imageExists = (imagePath) => {
  try {
    require(`../images/${imagePath}`);
    return true;
  } catch (error) {
    console.warn(`Image file not found: ../images/${imagePath}`);
    return false;
  }
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Home = () => {
  const [allImage, setAllImage] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      const result = await axios.get('http://localhost:5002/get-images');
      setAllImage(result.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Filter images based on image existence and shuffle them
  const filteredAndShuffledImages = shuffleArray(
    allImage.filter(data => imageExists(data.image))
  ).slice(0, 8); // Display only the first 8 images

  return (
    <>
      <Fade>
        <Slider />
      </Fade>
      <StyledHome>
        {/* Larger Gem Images with Animations */}
        <Container sx={{ marginTop: 8 }}>
          <Typography variant="h4" sx={{ marginBottom: theme.spacing(4) }}>
            Gems Collection
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Slide direction="right">
                <img src={Zircon} alt="Gem Image" style={{ width: '50%' }} />
                <Typography variant="h6" sx={{ marginTop: theme.spacing(2) }}>
                  Zircon
                </Typography>
              </Slide>
            </Grid>

            <Grid item xs={12} md={4}>
              <Zoom>
                <img src={GreenSapphire} alt="Gem Image" style={{ width: '50%' }} />
                <Typography variant="h6" sx={{ marginTop: theme.spacing(2) }}>
                  Green Sapphire
                </Typography>
              </Zoom>
            </Grid>

            <Grid item xs={12} md={4}>
              <Slide direction="left">
                <img src={PadparadschaSapphire} alt="Gem Image" style={{ width: '50%' }} />
                <Typography variant="h6" sx={{ marginTop: theme.spacing(2) }}>
                  Padparadscha Sapphire
                </Typography>
              </Slide>
            </Grid>

            <Grid item xs={12} md={4}>
              <Slide direction="right">
                <img src={PinkSapphire} alt="Gem Image" style={{ width: '50%' }} />
                <Typography variant="h6" sx={{ marginTop: theme.spacing(2) }}>
                  Pink Sapphire
                </Typography>
              </Slide>
            </Grid>

            <Grid item xs={12} md={4}>
              <Zoom>
                <img src={Ruby} alt="Gem Image" style={{ width: '50%' }} />
                <Typography variant="h6" sx={{ marginTop: theme.spacing(2) }}>
                  Ruby
                </Typography>
              </Zoom>
            </Grid>

            <Grid item xs={12} md={4}>
              <Slide direction="left">
                <img src={YellowSapphire} alt="Gem Image" style={{ width: '50%' }} />
                <Typography variant="h6" sx={{ marginTop: theme.spacing(2) }}>
                  Yellow Sapphire
                </Typography>
              </Slide>
            </Grid>
          </Grid>
        </Container>

        <Fade direction="down">
          <img src={gemlot} alt="Company Logo" style={{ marginTop: '90px', height: '180px', marginBottom: theme.spacing(3) }} />
          <Typography variant="h4" sx={{ marginBottom: theme.spacing(2) }}>
            Your Ultimate Jewelry Destination
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: theme.spacing(5) }}>
            Discover the beauty and elegance of our exclusive jewelry collections that cater to your unique style and taste.
          </Typography>
        </Fade>

        <Container>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {filteredAndShuffledImages.map((data, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Link to={`/item/${data._id}`} style={{ textDecoration: 'none' }}>
                    <Zoom>
                      <Card sx={{ margin: 3, borderRadius: '12px', width: 270, height: 270 }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            image={require(`../images/${data.image}`)}
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
                    </Zoom>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </StyledHome>
    </>
  );
};

export default Home;
