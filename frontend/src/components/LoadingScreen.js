import React, { useEffect } from 'react';
import logo from '../img/logo2.svg';

const LoadingScreen = () => {
    

    return (
        <div class="loading-page">
        <div class="light"></div> 
        <div class="logo-container">
        <img src={logo} alt="Logo" /> 
        </div>
        <div class="name-container">
            <span class="letter">M </span>
            <span class="letter"> O</span>
            <span class="letter"> O</span>
            <span class="letter"> N</span>
            <span class="letter"> L</span>
            <span class="letter"> I</span>
            <span class="letter"> G</span>
            <span class="letter"> H</span>
            <span class="letter"> T</span>
        </div>
    </div>
    );
};

export default LoadingScreen;
