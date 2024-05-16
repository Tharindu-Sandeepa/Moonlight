import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, TextField, Typography, Container } from "@mui/material";
import Sidenav from '../../../components/Sidenav';

const AddSupItem = () => {
  const [itemID, setItemID] = useState('');
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate(); // Access the history object

  const handleSubmit = () => {
    const payload = {
      itemID: itemID,
      item: item,
      quantity: quantity,
      description: description
    };

    Axios.post('http://localhost:5002/api/createSupItem', payload)
      .then(() => {
        toast.success('Item Added Successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Reset form fields after successful submission
        setItemID('');
        setItem('');
        setQuantity('');
        setDescription('');
        navigate('/itemTable'); // Navigate back to the SupplierDashboard
      })
      .catch(error => {
        console.error("Axios Error : ", error);
      });
  };

  return (
    <Sidenav>
      <Container>
        <Typography variant="h4" gutterBottom>Add New Item</Typography>
        <TextField
          label="Item ID"
          variant="outlined"
          fullWidth
          value={itemID}
          onChange={e => setItemID(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
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
        <Button variant="contained" color="primary" onClick={handleSubmit}>Add Item</Button>
      </Container>
    </Sidenav>
  );
};

export default AddSupItem;
