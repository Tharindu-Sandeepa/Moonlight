import { useNavigate } from 'react-router-dom';

import Stocktable from './stocktable';
import { Box, Button, Paper } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import DescriptionIcon from '@mui/icons-material/Description';
import Dashboard from '../Dashboard';



  const MManager = () =>{
    
    const navigate = useNavigate();

    const reMaterial = [
        { id: "M001", name: 'Gold', weight: "" },
        { id: "M002", name: 'Silver', weight: "" },
        { id: "M003", name: 'Gold', weight: "" },
        { id: "M004", name: 'Palladium', weight: "" },
        { id: "M005", name: 'Copper', weight: "" },
        { id: "M006", name: 'Alloy(for Silver) ', weight: "" },
        { id: "M007", name: 'Alloy(for Gold)', weight: "" },
       
    ];

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
                flexDirection : 'column',
                justifyContent: 'center' // Center content vertically and horizontally
            }}>
                <h1>Available Material In Stock</h1>
                <Stocktable reMaterial={reMaterial} />
            </Paper>

            <div className="App" >
                <header className="App-header">
                    <div style={{ display: "flex", flexDirection: "column", marginLeft: '25px',alignItems:'center', justifyContent:'center' }}>
                        <Paper elevation={3} sx={{
                            marginBottom: 3,
                            borderRadius: '20px',
                            width: 250,
                            height: 180,
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column', // Set flex direction to column
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            
                                <AddCircleIcon  sx={{ marginBottom: '10px',fontSize:40, color: '#1565c0' }} />
                                <Button
                                    onClick={() => navigate('/Materials')}
                                    sx={{
                                        width:200,
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
                               flexDirection: 'column', // Set flex direction to column
                               alignItems: 'center',
                               justifyContent: 'center'
                           
                        }}>
                            
                                <InventoryIcon sx={{ marginBottom: '10px',fontSize:40, color: '#1565c0' }}  />
                                <Button
                                    onClick={() => navigate('/useMaterial')}
                                    sx={{
                                        width:200,

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

                        <Paper elevation={3} sx={{
                           marginBottom: 3,
                           borderRadius: '20px',
                           width: 250,
                           height: 180,
                           padding: '20px',
                           display: 'flex',
                           flexDirection: 'column', // Set flex direction to column
                           alignItems: 'center',
                           justifyContent: 'center'
                        }}>
                           
                                <DescriptionIcon sx={{ marginBottom: '10px',fontSize:40, color: '#1565c0' }}  />
                                <Button
                                    onClick={() => console.log('Generate Report clicked')}
                                    sx={{
                                        width:200,

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
                            
                        </Paper>
                    </div>
                </header>
            </div>
        </Box>
        </Dashboard>
    );
}

export default MManager;
