import GemForm from "./GemForm";
import { Box, Typography,  } from "@mui/material";
import GemTable from "./gemtable"; 
import Axios from "axios";
import { useEffect, useState } from "react";

import backgroundimage from '../../../img/line1.png'
import Dashboard from '../Dashboard';


const User = () => {
    const [gemtableData, setGem] = useState([]);
    const [submitted, setSubmitted] = useState([]);
    const [selectedGem, setSelectedGem] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        getGem();
    }, []);

    const getGem = () => {
        Axios.get('http://localhost:5002/api/gems')
            .then(response => {
                console.log(response.data.response);
                setGem(response.data?.response || []);
            })
            .catch(error => {
                console.log("Axios Error: ", error);
            });
    }

    const addGem = (data) => {
        setSubmitted(true);
        const payload = { ...data };
        Axios.post('http://localhost:5002/api/addGem', payload)
            .then(response => {
                getGem();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error => {
                console.log("Axios Error: ", error);
            });
    }

    const updateGem = (data) => {
        setSubmitted(true);

        const payload = { ...data };
        Axios.post('http://localhost:5002/api/updateGem', payload)
            .then(() => {
                getGem();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error => {
                console.log("Axios Error: ", error);
            });
    }

    const deleteGem = (data) => {
        Axios.post('http://localhost:5002/api/deleteGem', data)
            .then(() => {
                getGem();
            })
            .catch(error => {
                console.log("Axios Error: ", error);
            });
    }

    return (
        <Dashboard title="Gem Management">
        <div style={{
           backgroundImage: `url(${backgroundimage})`,
           //backgroundColor:'#CBCBCB',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            overflow: 'hidden',
        }}>
          
            <Box sx={{
                width: 'calc(100% - 60px)',
                margin: 'auto',
                marginTop: '100px',
                padding: '20px',
            }}>
                
                    
                    <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    minHeight: '100vh',
                                    
                                }}>
                        <GemForm
                            addGem={addGem}
                            updateGem={updateGem}
                            submitted={submitted}
                            data={selectedGem}
                            isEdit={isEdit}
                        />

                    </div>

                    
                    
                
                <Box sx={{
                    marginTop: '50px',
                    //background: 'transparent', 
                    backgroundColor:'#a1a1aa' ,
                    backdropFilter: 'blur(5px)', // Blur effect
                    borderRadius: '8px',
                    padding: '20px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Box shadow        
                }}>
                    <Typography variant="h5" align="center" sx={{ marginBottom: '20px',color:'#ffffff' }}>All Gems</Typography>
                    <GemTable
                        rows={gemtableData}
                        setSelectedGem={setSelectedGem}
                        deleteGem={deleteGem}
                        setIsEdit={setIsEdit}
                    />
                </Box>
            </Box>
        </div>
        </Dashboard>
    );
}

export default User;
