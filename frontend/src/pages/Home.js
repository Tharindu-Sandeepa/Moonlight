import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from '../components/Slider';
import Trend from '../components/trend';
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
  Button,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import gem from '../img/gems.png';
import gem2 from '../img/ff.jpeg';
import gem3 from '../img/ff.jpeg';
import { Fade, Zoom ,Bounce, Slide,JackInTheBox} from 'react-awesome-reveal';
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

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  


const Home = () => {
  const [allImage, setAllImage] = useState(null);
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

  return (
    <>
    <Fade >
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
              <Slide direction="right" >
                <img src={gem} alt="Gem Image" style={{ width: '100%' }} />
                <Typography variant="h6" sx={{ marginTop: theme.spacing(2) }}>
                  Gemstone A
                </Typography>
              </Slide>
            </Grid>

            <Grid item xs={12} md={4}>
              <Zoom >
                <img src={gem} alt="Gem Image" style={{ width: '100%' }} />
                <Typography variant="h6" sx={{ marginTop: theme.spacing(2) }}>
                  Gemstone B
                </Typography>
              </Zoom>
            </Grid>

            <Grid item xs={12} md={4}>
              <Slide direction="left" >
                <img src={gem} alt="Gem Image" style={{ width: '100%' }} />
                <Typography variant="h6" sx={{ marginTop: theme.spacing(2) }}>
                  Gemstone C
                </Typography>
              </Slide>
            </Grid>
            <Grid item xs={12} md={4}>
              <Slide direction="right" >
                <img src={gem} alt="Gem Image" style={{ width: '100%' }} />
                <Typography variant="h6" sx={{ marginTop: theme.spacing(2) }}>
                  Gemstone A
                </Typography>
              </Slide>
            </Grid>

            <Grid item xs={12} md={4}>
              <Zoom >
                <img src={gem} alt="Gem Image" style={{ width: '100%' }} />
                <Typography variant="h6" sx={{ marginTop: theme.spacing(2) }}>
                  Gemstone B
                </Typography>
              </Zoom>
            </Grid>

            <Grid item xs={12} md={4}>
              <Slide direction="left" >
                <img src={gem} alt="Gem Image" style={{ width: '100%' }} />
                <Typography variant="h6" sx={{ marginTop: theme.spacing(2) }}>
                  Gemstone C
                </Typography>
              </Slide>
            </Grid>
          </Grid>
        </Container>
        <Fade direction="down">
          <img src={gemlot} alt="Company Logo" style={{ marginTop:'90px', height: '180px', marginBottom: theme.spacing(3) }} />
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
            {allImage &&
             shuffleArray(allImage).slice(0, 8).map((data, index) => (
                <Grid item xs={112} sm={6} md={4} lg={3} key={index}>
                  <Link to={`/item/${data._id}`} style={{ textDecoration: 'none' }}>
                  <Zoom  >   <Card sx={{ margin: 3, borderRadius: '12px' ,width:270,height:270}}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          image={require(`../images/${data.image}`)}
                          alt={`Image ${index}`}
                         sx={{height:270}} // Ensures the image is square
                        />
                      
                      </CardActionArea>
                    </Card>
                    <CardContent sx={{ textAlign: 'left' , ml:1.4,mt:-2.6 }}>
    {/* Display the name */}
    <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1rem' }}>
        {data.name}
    </Typography>
    {/* Display the price below the name */}
    <Typography variant="body2" color="primary" component="div">
        Rs {data.price}
    </Typography>
</CardContent>

</Zoom  > 
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
