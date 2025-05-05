import React from 'react';
import InquiryForm from './InquiryForm';
import {  useState } from "react";
import Axios from "axios";
import backgroundImage from "../../img/rocks-8153665_1280.png"


const Inquiry = () => {
   
    const [submitted ,setSubmitted] = useState(false);


    const enterInquiry = (data) => {
        setSubmitted(true);
        Axios.post('http://localhost:5002/api/enterInquiry',data)
        .then((response) => {
            console.log(response.data);
            
            setSubmitted(true);
            
        })
        .catch((error) => {
            console.error('Error submitting inquiry:', error);
        });


    }

   




    

    return (
        <div style={{  backgroundImage: `url(${backgroundImage})`, minHeight: '100vh', alignItems: 'center', padding: '20px 500px', display: 'flex' }}>
            <InquiryForm
            enterInquiry= {enterInquiry} 
            submitted={submitted}
            
            />
        </div>
    );
};

export default Inquiry;
