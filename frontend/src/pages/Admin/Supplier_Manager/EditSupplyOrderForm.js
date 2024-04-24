import React, { useEffect, useState } from 'react';
import { Button, Box, Grid, Input, Typography, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import Axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from '../Dashboard';

const EditSupplyOrderForm = () => {
    // eslint-disable-next-line
    const [supOrders, setSupOrders] = useState([]);
    // eslint-disable-next-line
    const [submitted, setSubmitted] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();
    const [supOrdId, setsupOrdId] = useState(0);
    const [supName, setsupName] = useState('');
    const [type, setType] = useState('Gem');
    const [quantity, setQuant] = useState('');
    const [supID, setsupId] = useState(0);
    const [gemID, setgemId] = useState(0);
    const [matID, setmatId] = useState(0);
    const [description, setdescription] = useState('');
    const [status, setStatus] = useState('Pending'); // Default status
    const location = useLocation();
    const selectedsupOrder = location.state.selectedsupOrder;
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (selectedsupOrder && selectedsupOrder.supOrdId !== 0) {
            setsupOrdId(selectedsupOrder.supOrdId);
            setsupName(selectedsupOrder.supName);
            setType(selectedsupOrder.type);
            setQuant(selectedsupOrder.quantity);
            setsupId(selectedsupOrder.supID);
            setmatId(selectedsupOrder.matID);
            setgemId(selectedsupOrder.gemID);
            setdescription(selectedsupOrder.description);
            setStatus(selectedsupOrder.status);
            setIsEdit(true);
        }
    }, [selectedsupOrder]);

    const addsupOrder = (data) => {
        setSubmitted(true); 

        const payload = {
            supOrdId: data.supOrdId,
            supName: data.supName,
            type: data.type,
            quantity: data.quantity,
            supID: data.supID,
            matID: data.matID,
            gemID: data.gemID,
            description: data.description,
            status: data.status,
        }
        Axios.post('http://localhost:5002/api/createsupOrder', payload)
            .then(() => {
                getOrders();
                setSubmitted(false); 
                setIsEdit(false);
                setShowAlert(true);
                toast.success('Order Successfully Created', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                console.error("Axios Error : ", error);
            });
    }

    const updatesupOrder = (data) => {
      setSubmitted(true);
  
      const payload = {
          supOrdId: data.supOrdId,
          supName: data.supName,
          type: data.type,
          quantity: data.quantity,
          supID: data.supID,
          matID: data.matID,
          gemID: data.gemID,
          description: data.description,
          status: data.status,
      }
  
      Axios.post('http://localhost:5002/api/updatesupOrder', payload)
          .then(() => {
              navigate('/edit-supply-order', { state: { selectedsupOrder: data } });
              setSubmitted(false);
              setIsEdit(false);
              setShowAlert(true);
              toast.success('Order Successfully Updated', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
          })
          .catch(error => {
              console.error("Axios Error : ", error);
          });
  }

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = () => {
        Axios.get('http://localhost:3001/api/supOrders')
            .then(response => {
                setSupOrders(response.data?.response || []);
            })
            .catch(error => {
                console.error("Axios Error : ", error);
            });
    }

    return(
      <Dashboard>
        <div>
            
                <Box sx={{ 
                    border: '2px solid #000', 
                    borderRadius: '5px', 
                    padding: '30px', 
                    marginBottom: '30px', 
                    maxWidth: '700px', 
                    margin: 'auto',
                    backgroundColor: '#f9f9f9',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' // Add shadow
                }}>
                    <Grid
                        container
                        spacing={2}
                        justifyContent="center"
                    >
                        <Grid item xs={12} sx={{ textAlign: 'center', marginBottom: '20px' }}>
                            <Typography component={'h1'} sx={{ color: '#333', fontSize: '24px', fontWeight: 'bold' }}>Place Order</Typography>
                        </Grid>

                        <Grid item xs={12} sx={{ textAlign: 'left' }}>
                            <Typography component={'label'} htmlFor="supOrdId" sx={{ color: '#333', fontSize: '16px', display: 'block', marginBottom: '5px' }}>
                                Supply Order ID
                            </Typography>
                            <Input
                                type="number"
                                id='supOrdId'
                                name="supOrdId"
                                sx={{ width: '100%', marginBottom: '10px' }}
                                value={supOrdId}
                                onChange={e => setsupOrdId(e.target.value)}
                            />
                        </Grid>

                <Grid item xs={12} sx={{ textAlign: 'left' }}>
                <Typography component={'label'} htmlFor="supName" sx={{ color: '#000000', fontSize: '16px', display: 'block', }}>
                    Supplier Name
                </Typography>
                <Input
                    type="text"
                    id='supName'
                    name="supName"
                    sx={{ width: '400px', marginBottom: '10px' }}
                    value={supName}
                    onChange={e => setsupName(e.target.value)}
                />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'left' }}>
                <Typography component={'label'} htmlFor="type" sx={{ color: '#000000', fontSize: '16px', display: 'block', }}>
                    Type
                    <RadioGroup
                        row
                        aria-label="type"
                        name="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <FormControlLabel value="Gem" control={<Radio />} label="Gem" />
                        <FormControlLabel value="Material" control={<Radio />} label="Material" />
                        <FormControlLabel value="Other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'left' }}>
                <Typography component={'label'} htmlFor="quantity" sx={{ color: '#000000', fontSize: '16px', display: 'block', }}>
                    Quantity
                </Typography>
                <Input
                    type="text"
                    id='quantity'
                    name="quantity"
                    sx={{ width: '400px', marginBottom: '10px' }}
                    value={quantity}
                    onChange={e => setQuant(e.target.value)}
                />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'left' }}>
                <Typography component={'label'} htmlFor="supID" sx={{ color: '#000000', fontSize: '16px', display: 'block', }}>
                    Supplier ID
                </Typography>
                <Input
                    type="number"
                    id='supID'
                    name="supID"
                    sx={{ width: '400px', marginBottom: '10px' }}
                    value={supID}
                    onChange={e => setsupId(e.target.value)}
                />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'left' }}>
                <Typography component={'label'} htmlFor="gemID" sx={{ color: '#000000', fontSize: '16px', display: 'block', }}>
                    {type === 'Gem' ? 'Gemstone ID' : 'Material ID'}
                </Typography>
                {type === 'Gem' && (
                    <Input
                        type="number"
                        id='gemID'
                        name="gemID"
                        sx={{ width: '400px', marginBottom: '10px' }}
                        value={gemID}
                        onChange={e => setgemId(e.target.value)}
                    />
                )}
                {type === 'Material' && (
                    <Input
                        type="number"
                        id='matID'
                        name="matID"
                        sx={{ width: '400px', marginBottom: '10px' }}
                        value={matID}
                        onChange={e => setmatId(e.target.value)}
                    />
                )}
            </Grid>


            <Grid item xs={12} sx={{ textAlign: 'left' }}>
                <Typography component={'label'} htmlFor="description" sx={{ color: '#000000', fontSize: '16px', display: 'block', }}>
                    Description
                </Typography>
                <Input
                    type="text"
                    id='description'
                    name="description"
                    sx={{ width: '400px', marginBottom: '10px' }}
                    value={description}
                    onChange={e => setdescription(e.target.value)}
                />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'left' }}>
                            <Typography component={'label'} sx={{ color: '#000000', fontSize: '16px', display: 'block' }}>
                                Status
                            </Typography>
                            <RadioGroup
                                row
                                aria-label="status"
                                name="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <FormControlLabel value="Completed" control={<Radio />} label="Completed" />
                                <FormControlLabel value="Rejected" control={<Radio />} label="Rejected" />
                                <FormControlLabel value="Pending" control={<Radio />} label="Pending" />
                            </RadioGroup>
                        </Grid>

                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <Button
                                variant="contained"
                                sx={{
                                    marginTop: '20px',
                                    backgroundColor: '#00c6e6',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#0099b8',
                                    },
                                }}
                                onClick={() => isEdit ? updatesupOrder({ supOrdId, supName, type, quantity, supID, matID, gemID, description, status }) : addsupOrder({ supOrdId, supName, type, quantity, supID, matID, gemID, description, status })}
                            >
                                {isEdit ? 'Update' : 'Add'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                {showAlert &&
                    <Alert variant="outlined" severity="success">
                        Updated Successfully..
                    </Alert>
                }

                <Button variant="contained" onClick={() => navigate('/supplyorder')}>
                    Back
                </Button>
            
        </div>

        </Dashboard>
    )
}

export default EditSupplyOrderForm;