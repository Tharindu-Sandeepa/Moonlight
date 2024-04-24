import React from 'react'; 
import GemCategories from './GemCategories';
import GemSmokingHero from './GemSmokingHero';
import GemHero from './GemHero';
import GemValues from './GemValue';
import HowItWorks from './HowitWorks';

//import Navbar from '../Navbar';



const MyComponent = () => {
    return (
      <div>
        {/* <Navbar/> */}
        
        <GemHero/>
        <GemValues/>
        <GemCategories/>
        <HowItWorks/>
        <GemSmokingHero/>
       
      </div>
    );
  };
  
  export default MyComponent;