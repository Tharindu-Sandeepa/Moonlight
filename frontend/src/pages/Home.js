import React,{useState,useEffect} from 'react'
import Slider from '../components/Slider'
import { Link } from 'react-router-dom'
import Trend from '../components/trend'


const Home = () => {
 
    return (
        <>
         <div>
                <Slider/>
                <Trend/>
        </div>
        </>
    )
}

export default Home