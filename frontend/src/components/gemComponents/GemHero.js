import * as React from 'react';
import {Button ,Typography,}from '@mui/material';
import GemHeroLayout from './GemHeroLayout';
import gem1 from '../../img/gem1.jpg'
import { useNavigate } from 'react-router-dom';





  export default function ProductHero() {

    const navigate = useNavigate();
    return (
      <GemHeroLayout
        sxBackground={{
          backgroundImage: `url(${gem1})`,
          backgroundColor: '#4643FF', // Average color of the background image.
          backgroundPosition: 'center',
        }}
      >
       
        <img
          style={{ display: 'none' }}
          src={gem1}
          alt="top"
        />
        <Typography color="inherit" align="center" variant="h2" marked="center"  sx={{ fontFamily: 'Roboto ' }}>
        Elevate Your Gemstone Experience Today
        </Typography>
        <Typography
          color="inherit"
          align="center"
          variant="h5"
          sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
        >
            Your gateway to exquisite beauty awaits!        </Typography>
            <Button
                variant="contained"
                size="large"
                href=""
                sx={{
                  minWidth: 200,
                  color: '#ffffff',
                  backgroundColor: 'rgba(0, 0, 100, 0.2)', 
                  border: '2px solid transparent', // Transparent border
                  boxShadow: '0 0 10px 2px #ffffff',
                  backdropFilter: 'blur(5px)', // Apply blur effect
                  transition: 'background-color 0.2s ease', // Smooth transition on hover
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker background on hover
                  },
                }}
                onClick={() => navigate('/image-grid')}
              >
                View Gems
              </Button>
        <Typography variant="body2" color="iwhite" sx={{ mt: 2 }}>
          Discover the experience
        </Typography>
      </GemHeroLayout>
    );
  }