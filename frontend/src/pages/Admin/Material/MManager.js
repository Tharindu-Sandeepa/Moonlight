import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, MenuItem, Paper, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import DescriptionIcon from '@mui/icons-material/Description';
import Dashboard from '../Dashboard';
import Axios from 'axios'; // corrected import
import { useEffect, useState } from 'react';
import NewMaterialForm from './newMaterialform';
import NewMaterialTable from './newMaterialTable';
import ReorderIcon from '@mui/icons-material/Reorder';
import axios from 'axios';

const MManager = () => {
    const [newMaterials, setNewMaterials] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [selectedNewMaterial, setSelectedNewMaterial] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [materialNamesWeight, setmaterialNamesWeight] = useState([]);

    const navigate = useNavigate();



    






    useEffect(() => {
        getNewMaterials();
    }, []);

    const getNewMaterials = () => {
        Axios.get('http://localhost:5002/api/newmaterials')
            .then(response => {
                setNewMaterials(response.data?.response || []);
            })
            .catch(error => {
                console.error("Axios Error: ", error);
            });
    };

    const addNewMaterials = (data) => {
        setSubmitted(true);
        const payload = {
            id: data.id,
            name: data.name,
            weight: data.weight,
        };
        Axios.post('http://localhost:5002/api/addnewmaterial', payload)
            .then(() => {
                getNewMaterials();
                setSubmitted(false);
                setShowForm(false);
            })
            .catch(error => {
                console.error("Axios Error: ", error);
            });
    };

    const updateNewMaterial = (data) => {
        setSubmitted(true);
        const payload = {
            id: data.id,
            name: data.name,
            weight: data.weight,
        };
        Axios.post('http://localhost:5002/api/updatenewmaterial', payload)
            .then(() => {
                getNewMaterials();
                setSubmitted(false);
                setIsEdit(false);
                setShowForm(false);
            })
            .catch(error => {
                console.error("Axios Error: ", error);
            });
    };

    const deleteNewMaterial = (data) => {
        Axios.post('http://localhost:5002/api/deletenewmaterial', data)
            .then(() => {
                getNewMaterials();
            })
            .catch(error => {
                console.error("Axios Error: ", error);
            });
    };

    return (
        <Dashboard title="Material Management">
            <Box
                sx={{
                    width: 'calc(100% - 100px)',
                    margin: 'auto',
                    marginTop: '15px',
                    display: 'flex',
                    justifyContent: 'space-evenly'
                }}
            >
                  

                                        

                <Paper elevation={3} sx={{
                    marginBottom: 3,
                    borderRadius: '20px',
                    width: 1000,
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    
                }}>
                    
                    {!showForm && (
                        <Paper elevation={3} sx={{
                            marginBottom: 5,
                            borderRadius: '20px',
                            width: 250,
                            height: 180,
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <ReorderIcon sx={{ marginBottom: '10px', fontSize: 40, color: '#1565c0' }} />
                            <Button
                                onClick={() => { setShowForm(true); setSelectedNewMaterial(null); }}
                                sx={{
                                    justifySelf: 'center',
                                    alignSelf: 'center',
                                    color: "white",
                                    fontWeight: 'bold',
                                    fontSize: 14,
                                    borderRadius: '10px',
                                    backgroundColor: '#1565c0',
                                    '&:hover': {
                                        backgroundColor: '#0d47a1',
                                    },
                                }}
                            >
                                Add New Material
                            </Button>
                        </Paper>
                    )}

                    {showForm && (
                        <NewMaterialForm
                        addNewMaterials={addNewMaterials}
                        updateNewMaterial={updateNewMaterial}
                            submitted={submitted}
                            data={selectedNewMaterial}
                            isEdit={isEdit}
                        />
                    )}

<Typography variant="h5" sx={{ marginBottom: '15px' }}>
                        Available Material Stock
                    </Typography>

                    <NewMaterialTable
                        rows={newMaterials}
                        selectedNewMaterial={data => {
                            setSelectedNewMaterial(data);
                            setIsEdit(true);
                            setShowForm(true);
                        }}
                        deleteNewMaterial={data => window.confirm('Are you Sure? ') && deleteNewMaterial(data)}
                    />
                </Paper>

                <div className="App">
                    <header className="App-header">
                        <div style={{ display: "flex", flexDirection: "column", marginLeft: '25px', alignItems: 'center', justifyContent: 'center' }}>
                            <Paper elevation={3} sx={{
                                marginBottom: 3,
                                borderRadius: '20px',
                                width: 250,
                                height: 180,
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <AddCircleIcon sx={{ marginBottom: '10px', fontSize: 40, color: '#1565c0' }} />
                                <Button
                                    onClick={() => navigate('/Materials')}
                                    sx={{
                                        width: 200,
                                        color: "white",
                                        fontWeight: 'bold',
                                        fontSize: 14,
                                        borderRadius: '40px',
                                        backgroundColor: '#1565c0',
                                        '&:hover': {
                                            backgroundColor: '#0d47a1',
                                        },
                                    }}
                                >
                                    Add Material Entry
                                </Button>
                            </Paper>

                            <Paper elevation={3} sx={{
                                marginBottom: 3,
                                borderRadius: '20px',
                                width: 250,
                                height: 180,
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <InventoryIcon sx={{ marginBottom: '10px', fontSize: 40, color: '#1565c0' }} />
                                <Button
                                    onClick={() => navigate('/useMaterial')}
                                    sx={{
                                        width: 200,
                                        color: "white",
                                        fontWeight: 'bold',
                                        fontSize: 14,
                                        borderRadius: '40px',
                                        backgroundColor: '#1565c0',
                                        '&:hover': {
                                            backgroundColor: '#0d47a1',
                                        },
                                    }}
                                >
                                    Use Material Entry
                                </Button>
                            </Paper>

                            {/* <Paper elevation={3} sx={{
                                marginBottom: 3,
                                borderRadius: '20px',
                                width: 250,
                                height: 180,
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <DescriptionIcon sx={{ marginBottom: '10px', fontSize: 40, color: '#1565c0' }} />
                                <Button
                                    onClick={() => console.log('Generate Report clicked')}
                                    sx={{
                                        width: 200,
                                        color: "white",
                                        fontWeight: 'bold',
                                        fontSize: 14,
                                        borderRadius: '40px',
                                        backgroundColor: '#1565c0',
                                        '&:hover': {
                                            backgroundColor: '#0d47a1',
                                        },
                                    }}
                                >
                                    Generate Report
                                </Button>
                            </Paper> */}
                        </div>
                    </header>
                </div>
            </Box>
        </Dashboard>
    );
}

export default MManager;
