import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, TextField, Typography, Container } from "@mui/material";
import Sidenav from '../../../components/Sidenav';

const UpdateSupItem = () => {
  const location = useLocation();
  const { selectedsupOrder } = location.state;
  const navigate = useNavigate();

  const [item, setItem] = useState(selectedsupOrder.item);
  const [quantity, setQuantity] = useState(selectedsupOrder.quantity);
  const [description, setDescription] = useState(selectedsupOrder.description);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);

    const payload = {
      _id: selectedsupOrder._id,
      itemID: selectedsupOrder.itemID,
      item: item,
      quantity: quantity,
      description: description,
    };

    Axios.post('http://localhost:5002/api/updateSupItem', payload)
      .then(() => {
        setSubmitted(false);
        toast.success('Item Successfully Updated', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate(-1); // Go back to the previous page
      })
      .catch(error => {
        console.error("Axios Error : ", error);
      });
  };

  return (
    <Sidenav>
    <Container>
      <Typography variant="h4" gutterBottom>Update Item</Typography>
      <TextField
        label="Item Name"
        variant="outlined"
        fullWidth
        value={item}
        onChange={e => setItem(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <TextField
        label="Quantity"
        variant="outlined"
        fullWidth
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={submitted}>Update Item</Button>
      <Button variant="contained" color="secondary" onClick={() => navigate(-1)} style={{ marginLeft: '10px' }}>Cancel</Button>
    </Container>
    </Sidenav>
  );
};

export default UpdateSupItem;
