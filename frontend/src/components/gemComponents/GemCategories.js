import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import gem2 from '../../img/sapphirelot.jpeg';
import gem3 from '../../img/aquamarinelot.jpeg';
import gem6 from '../../img/Topazlot.jpeg';
import redlot from '../../img/redlot.jpeg';
import gem7 from '../../img/opallot.jpeg';
import gem8 from '../../img/tormalinelot.jpeg';



const ImageBackdrop = styled('div')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: '#000',
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  }));

  const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    [theme.breakpoints.down('md')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover .imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover .imageMarked': {
      opacity: 0,
    },
    '&:hover .imageTitle': {
      border: '4px solid currentColor',
    },
    '& .imageTitle': {
      position: 'relative',
      padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
    },
    '& .imageMarked': {
      height: 3,
      width: 18,
      background: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
  }));

  const images = [
    {

        
      url:gem2,
      title: 'Sapphire',
      width: '35%',
      linkTo: '/components/Sapphirepage',
    },
    {
      url: gem3,
      title: '  Aquamarine',
      width: '30%',
      linkTo: '/components/Aquamarinepage',
    },
    {
      url: gem6,
      title: 'Topaz',
      width: '35%',
    },
    {
      url: redlot,
      title: 'Ruby',
      width: '35%',
    },
    {
      url: gem7,
      title: 'Opal',
      width: '30%',
    },
    {
      url: gem8,
      title: 'Tormaline',
      width: '35%',
    },
    
  ];

  export default function ProductCategories() {
    const navigate = useNavigate();

    const handleImageClick = (linkTo) => {
      navigate(linkTo);
    };


    return (
      <Container component="section" sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" marked="center" align="center" component="h2">
          For all tastes and all desires
        </Typography>
        <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
          {images.map((image) => (
           
            <ImageIconButton
              key={image.title}
              style={{
                width: image.width,
              }}
              onClick={() => handleImageClick(image.linkTo)}
            >
                
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 40%',
                  backgroundImage: `url(${image.url})`,
                }}
              />
              <ImageBackdrop className="imageBackdrop" />
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'common.white',
                }}
              >
                <Typography
                  component="h3"
                  variant="h6"
                  color="inherit"
                  className="imageTitle"
                >
                  {image.title}
                  <div className="imageMarked" />
                </Typography>
              </Box>
            </ImageIconButton>
           
          ))}
        </Box>
      </Container>
    );
  }
