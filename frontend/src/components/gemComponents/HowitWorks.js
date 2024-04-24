import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {Button , Typography} from '@mui/material';
import productHowItWorks1 from '../../img/productHowItWorks1.svg'
import productHowItWorks2 from '../../img/productHowItWorks2.svg'
import productHowItWorks3 from '../../img/productHowItWorks3.svg'
import { useNavigate } from 'react-router-dom';




const item = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
  };
  
  const number = {
    fontSize: 24,
    fontFamily: 'default',
    color: '#395886',
    fontWeight: 'medium',
  };
  
  

  function HowItWorks() {

   console.log(productHowItWorks1);
   console.log(productHowItWorks2);
   console.log(productHowItWorks3);

   const navigate = useNavigate();


    return (
      <Box
        component="section"
        sx={{ display: 'flex', bgcolor: '#fffff', overflow: 'hidden' }}
      >
        <Container
          sx={{
            mt: 10,
            mb: 15,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box                      
            alt="curvy lines"
            sx={{
              pointerEvents: 'none',
              position: 'absolute',
              top: -180,
              opacity: 0.7,
            }}
          />

          <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
            How it works
          </Typography>
          <div>

            <Grid container spacing={5}>

              <Grid item xs={12} md={4}>
                <Box sx={item}>
                  <Box sx={number}>1.</Box>
                    <br/>
                  {productHowItWorks1 && <img src={productHowItWorks1} alt="unique" style={{ height: 65,  }} />} 
                    <br/>
                  <Typography variant="h5" align="center">
                    Appointment every Wednesday 9am.
                  </Typography>
                </Box>
              </Grid>

             <Grid item xs={12} md={4}>
                <Box sx={item}>
                  <Box sx={number}>2.</Box>
                    <br/>                 
                    {productHowItWorks2 && <img src={productHowItWorks2} alt="unique" style={{ height: 65 }} />} 
                    <br/>
                  <Typography variant="h5" align="center">
                    First come, first served. Our offers are in limited quantities, so
                    be quick.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={item}>
                  <Box sx={number}>3.</Box>
                    <br/>
                  {productHowItWorks3 && <img src={productHowItWorks3} alt="unique" style={{ height: 65 }} />} 
                  <br/>
                  <Typography variant="h5" align="center">
                    {'New offers every week. New experiences, new surprises. '}
                    {'Your Sundays will no longer be alike.'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </div>
          <Button           
            size="large"
            variant="contained"
            component="a"
            href=""
            sx={{ mt: 8 ,backgroundColor: "#4643FF", color: "#FFFFF"}}
            onClick={() => navigate('../Inquiry')}
          >
            Get started
          </Button>
        </Container>
      </Box>
    );
  }
  
  export default HowItWorks;