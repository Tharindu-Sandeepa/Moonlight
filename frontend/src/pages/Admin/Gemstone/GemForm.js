import {Button, Grid, Input, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import { useEffect, useState } from 'react';

import CircularProgress from '@mui/joy/CircularProgress';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

const UserForm = ({ addGem ,updateGem, submitted, data ,isEdit}) => {

    const [id, setGemID] = useState(0);
    const [name, setGemName] = useState('');
    const [color, setGemColor] = useState(''); 
    const [price, setGemPrice] = useState('');
    const [weight, setGemWeight] = useState('');   
    const [category, setGemCategory] = useState('');
    const [voucherNo,  setvoucherNo] = useState('');
    const [supplierID, setGemSupplierID] = useState('');
    const [open, setOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [updateSuccessOpen, setUpdateSuccessOpen] = useState(false);
   // const [selectedFile, setSelectedFile] = useState(null);


    const handleSubmit = () => {
        // Validate required fields
        if (!name || !color || !price || !weight || !category || !voucherNo || !supplierID) {
            setOpen(true);
            return;
        }

        // Proceed with adding/updating gem
        if (isEdit) {
            updateGem({ id, name, color, price, weight, category, voucherNo, supplierId: supplierID });
            setUpdateSuccessOpen(true);  //alert
        } else {
            addGem({ id, name, color, price, weight, category, voucherNo, supplierId: supplierID });
            setSuccessOpen(true);    // alert
        }
    };

    useEffect(() => {
        if(!submitted){
            setGemID(0);
            setGemName('');
            setGemColor('');
            setGemPrice('');
            setGemWeight('');
            setGemCategory('');
            setvoucherNo('');
            setGemSupplierID('');
            
        }
    },[submitted]);

    useEffect(() => {
        if (data?.id && data.id !== 0) { 
            setGemID(data.id);
            setGemName(data.name);
            setGemColor(data.color);
            setGemPrice(data.price);
            setGemWeight(data.weight);
            setGemCategory(data.category);
            setvoucherNo(data.voucherNo);
            setGemSupplierID(data.supplierId);
          
        }
    }, [data]); 
    
   

   


    return(

        
        <Grid 
            container  // name this as a container
            spacing={1} //same as padding
            sx={{             // java script styles. sx means styles
                
                backgroundcolor:'#EDEDF2',
                marginBottom:'30px',
                display:'block',
                padding: '40px',
                borderRadius: '8px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(2px)',
                maxWidth: '1600px', // Adjust the max width as needed
                 margin: 'left', 
           

            }}
        > 

        
<Grid item xs={12}>
    <Typography
        component={'h1'}
        sx={{
            color: '#4643FF',
            padding: '15px',
            fontWeight: 'bold',
            fontSize: '24px', // Adjust font size as needed
            borderBottom: '2px solid #4643FF', // Add a bottom border for separation
            marginBottom: '20px', // Add some space below the heading
        }}
    >
        Gem Entry Form
    </Typography>
</Grid>

            
           
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography htmlFor="id" sx={{ color: '#000000', marginBottom: '5px' }}>Gem ID</Typography>
                    <Input
                        type="number"
                        id="id"
                        name="id"
                        value={id}
                        onChange={e => setGemID(e.target.value)}
                        sx={{
                            width: '50%',
                            padding: '10px',
                            borderRadius: '6px',
                            border: '2px solid #ccc',
                            fontSize: '16px',
                            color: '#333',
                            backgroundColor: '#f9f9f9',
                            transition: 'border-color 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                borderColor: '#fff',
                            },
                            '&:focus': {
                                outline: 'none', // Remove outline in focus state
                                borderColor: '#2F539B',
                                boxShadow: '0 0 0 2px rgba(47, 83, 155, 0.2)',
                            },
                        }}
                    />
                </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Typography htmlFor="name" sx={{ color: '#000000', marginBottom: '8px', display: 'block' }}>Gem Name</Typography>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={e => setGemName(e.target.value)}
                    sx={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '6px',
                        border: '2px solid #ccc',
                        fontSize: '16px',
                        color: '#333',
                        backgroundColor: '#f9f9f9',
                       transition: 'border-color 0.3s, box-shadow 0.3s',
                        '&:hover': {
                            borderColor: '#fff',
                        },
                        '&:focus': {
                            outline: 'none', // Remove outline in focus state
                            borderColor: '#2F539B',
                            boxShadow: '0 0 0 2px rgba(47, 83, 155, 0.2)',
                        },
                        
                    }}
                />
            </Grid>
            </Grid>

           

            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography  htmlFor="color" sx={{ color: '#000000', marginBottom: '5px', marginTop:'5px' }}>Gem Color</Typography>
                    <Input
                        type="text"
                        id="color"
                        name="color"
                        value={color}
                        onChange={e => setGemColor(e.target.value)}
                        sx={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '6px',
                            border: '2px solid #ccc',
                            fontSize: '16px',
                            color: '#333',
                            backgroundColor: '#f9f9f9',
                           transition: 'border-color 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                borderColor: '#fff',
                            },
                            '&:focus': {
                                outline: 'none', // Remove outline in focus state
                                borderColor: '#2F539B',
                                boxShadow: '0 0 0 2px rgba(47, 83, 155, 0.2)',
                            },
                            
                        }}
                    />
                </Box>


            </Grid>
        
            <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography htmlFor="price" sx={{ color: '#000000', marginBottom: '5px', marginTop:'5px'  }}>Price $</Typography>
                    <Input
                        type="number"
                        id="price"
                        name="price"
                        value={price}
                        onChange={e => setGemPrice(e.target.value)}
                        sx={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '6px',
                            border: '2px solid #ccc',
                            fontSize: '16px',
                            color: '#333',
                            backgroundColor: '#f9f9f9',
                           transition: 'border-color 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                borderColor: '#fff',
                            },
                            '&:focus': {
                                outline: 'none', // Remove outline in focus state
                                borderColor: '#2F539B',
                                boxShadow: '0 0 0 2px rgba(47, 83, 155, 0.2)',
                            },
                            
                        }}
                    />
                </Box>
            </Grid>
            </Grid>



            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography htmlFor="weight" sx={{ color: '#000000', marginBottom: '5px', marginTop:'5px'  }}>
                        Weight of the Gemstone</Typography>
                    <Input
                        type="number"
                        id="weight"
                        name="weight"
                        value={weight}
                        onChange={e => setGemWeight(e.target.value)}
                        sx={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '6px',
                            border: '2px solid #ccc',
                            fontSize: '16px',
                            color: '#333',
                            backgroundColor: '#f9f9f9',
                           transition: 'border-color 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                borderColor: '#fff',
                            },
                            '&:focus': {
                                outline: 'none', // Remove outline in focus state
                                borderColor: '#2F539B',
                                boxShadow: '0 0 0 2px rgba(47, 83, 155, 0.2)',
                            },
                            
                        }}
                    />
                </Box>
            </Grid>

            

            <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography htmlFor="category" sx={{ color: '#000000', marginBottom: '5px', marginTop:'5px'  }}>Category</Typography>
                    <Input
                        type="text"
                        id="category"
                        name="category"
                        value={category}
                        onChange={e => setGemCategory(e.target.value)}
                        sx={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '6px',
                            border: '2px solid #ccc',
                            fontSize: '16px',
                            color: '#333',
                            backgroundColor: '#f9f9f9',
                           transition: 'border-color 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                borderColor: '#fff',
                            },
                            '&:focus': {
                                outline: 'none', // Remove outline in focus state
                                borderColor: '#2F539B',
                                boxShadow: '0 0 0 2px rgba(47, 83, 155, 0.2)',
                            },
                            
                        }}
                    />
                </Box>
            </Grid>
            </Grid>

            
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography htmlFor="voucherNo" sx={{ color: '#000000', marginBottom: '5px', marginTop:'5px'  }}>Voucher Number</Typography>
                    <Input
                        type="text"
                        id="voucherNo"
                        name="voucherNo"
                        value={voucherNo}
                        onChange={e => setvoucherNo(e.target.value)}
                        sx={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '6px',
                            border: '2px solid #ccc',
                            fontSize: '16px',
                            color: '#333',
                            backgroundColor: '#f9f9f9',
                           transition: 'border-color 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                borderColor: '#fff',
                            },
                            '&:focus': {
                                outline: 'none', // Remove outline in focus state
                                borderColor: '#2F539B',
                                boxShadow: '0 0 0 2px rgba(47, 83, 155, 0.2)',
                            },
                            
                        }}
                    />
                </Box>
            </Grid>


            <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography htmlFor="supplierID" sx={{ color: '#000000', marginBottom: '5px', marginTop:'5px'  }}>Supplier ID</Typography>
                    <Input
                        type="text"
                        id="supplierID"
                        name="supplierID"
                        value={supplierID}
                        onChange={e => setGemSupplierID(e.target.value)}
                        sx={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '6px',
                            border: '2px solid #ccc',
                            fontSize: '16px',
                            color: '#333',
                            backgroundColor: '#f9f9f9',
                           transition: 'border-color 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                borderColor: '#fff',
                            },
                            '&:focus': {
                                outline: 'none', // Remove outline in focus state
                                borderColor: '#2F539B',
                                boxShadow: '0 0 0 2px rgba(47, 83, 155, 0.2)',
                            },
                            
                        }}
                    />
                </Box>
            </Grid>
            </Grid>

           

           
           
            <Button
                    sx={{
                        margin: 'auto',
                        marginRight: '20px', 
                        marginTop: '20px',                      
                        backgroundColor: '#4643FF', 
                        color: '#ffffff', 
                        borderRadius: '5px', 
                        padding: '10px 20px', 
                        border: 'none', 
                        cursor: 'pointer', 
                        transition: 'background-color 0.3s, color 0.3s', 
                        '&:hover': {
                            backgroundColor: '#1c2d5e', // Darker blue background color on hover
                        },
                    }}
                    onClick={handleSubmit} // Call the handleSubmit function
                     
            >
                {isEdit ? 'Update' : 'Add'}
            </Button>


            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Error</DialogTitle>
            
                <DialogContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress color="danger" sx={{ '--CircularProgress-size': '50px' }}>
                <ReportIcon color="danger" />
                </CircularProgress>
                <Typography variant="body1" sx={{ color: 'danger' }}>Please fill in all fields.</Typography>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpen(false)}  sx={{ backgroundColor: '#FF0000', color: '#FFFFFF' }}>OK</Button>
                </DialogActions>
            </Dialog>



            <Dialog open={successOpen} onClose={() => setSuccessOpen(false)}  BackdropProps={{
                                sx: {
                                    backdropFilter: 'blur(2px)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)' // Adjust the background color and opacity as needed
                                }
                            }}>
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Success
                    <CheckCircleOutlineRoundedIcon/>
                    
                    </DialogTitle>
                <DialogContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    
                    <Typography variant="body1" sx={{ color: 'success' }}> Gem added successfully!</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSuccessOpen(false)}  sx={{ backgroundColor: '#00FF00', color: '#FFFFFF' }}>OK</Button>
                </DialogActions>
            </Dialog>



            <Dialog open={updateSuccessOpen} onClose={() => setUpdateSuccessOpen(false)}  
                BackdropProps={{
                                sx: {
                                    backdropFilter: 'blur(2px)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)' // Adjust the background color and opacity as needed
                                }
                            }}>
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Success
                    <CheckCircleOutlineRoundedIcon/>

                </DialogTitle>
                <DialogContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ color: 'success' }}>Gem updated successfully!</Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setUpdateSuccessOpen(false)} sx={{ backgroundColor: '#00FF00', color: '#FFFFFF' }}>OK</Button>
                </DialogActions>
            </Dialog>

        
        </Grid>
    );
      
 
        


    
    

    
}
export default UserForm;
