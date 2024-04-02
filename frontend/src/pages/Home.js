import React,{useState,useEffect} from 'react'
import Slider from '../components/Slider'
import { Link } from 'react-router-dom'
import Trend from '../components/trend'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const Home = () => {
 
    return (
        <>
         <div>
           
                <Slider/>
                <Trend/>
                <Footer/>
        </div>
        </>
    )
}

export default Home