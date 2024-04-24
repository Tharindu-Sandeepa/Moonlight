import React from "react";
import SapphireHero from './SapphireHero';
import SapphireDescription from "./SapphireDescription";
import SapphireGrid from './SapphireGrid';

const SapphirePage =()=>{
    return (

        <div>
           
            <SapphireHero/>
            <SapphireDescription/>
            <SapphireGrid/>
        </div>
    );
};

export default SapphirePage;