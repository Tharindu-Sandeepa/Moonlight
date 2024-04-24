import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

import gemicon from '../../img/gemicon.jpeg';
import quality from '../../img/quality.jpeg';
import Competitive from '../../img/Competitive.jpeg';


const item = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
  };

  function GemValues() {

    console.log(gemicon);
    console.log(quality);
    console.log(Competitive);
    
    return (

      
      <Box
        component="section"
        sx={{ display: 'flex', overflow: 'hidden', bgcolor: '#fffff' }}
      >
        <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
          <Box
            component="img"
            src="../Img/"
            alt="curvy lines"
            sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
          />
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box/>
                   {quality && <img src={quality} alt="unique" style={{ height: 55 }} />} 
                
                
               
                <Typography variant="h5" sx={{ my: 5 }}>
                  Quality Gemstones
                </Typography>
                <Typography variant="h5" sx={{fontFamily:'Moon Dance'}}>
                  {
                    'Discover the finest gemstones sourced from around the world, meticulously selected for their brilliance and rarity.'
                  }
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box />   

                      {gemicon && <img src={gemicon} alt="unique" style={{  height: 55 }} />}                          
                <Typography variant="h5" sx={{ my: 5 }}>
                  Natural Gemstones
                </Typography>
                <Typography variant="h5" sx={{fontFamily:'Moon Dance'}}>
                  {
                    'Explore a curated collection of unique gemstones, each with its own story and character, perfect for your next jewelry masterpiece.'
                  }
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box/>                                  
                 {Competitive && <img src={Competitive} alt="unique" style={{ height: 55 }} />} 
                <Typography variant="h5" sx={{ my: 5 }}>
                  Competitive Prices
                </Typography>
                <Typography variant="h5" sx={{fontFamily:'Moon Dance'}}>
                  {
                    'Enjoy exclusive rates on our gemstones, ensuring you get the best value without compromising on quality.'
                  }
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }
  
  export default GemValues;
  