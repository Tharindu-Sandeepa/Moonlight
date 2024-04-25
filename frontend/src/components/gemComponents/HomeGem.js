import React from 'react'; 
import GemCategories from './GemCategories';
import GemSmokingHero from './GemSmokingHero';
import GemHero from './GemHero';
import GemValues from './GemValue';
import HowItWorks from './HowitWorks';
import { Box } from '@mui/material';

//import Navbar from '../Navbar';



const MyComponent = () => {
    return (
      <div>
        {/* <Navbar/> */}
        <Box sx={{mt:7}}>
        <GemHero/>
        <GemValues/>
        <GemCategories/>
        <HowItWorks/>
        <GemSmokingHero/></Box>
       
      </div>
    );
  };
  
  export default MyComponent;