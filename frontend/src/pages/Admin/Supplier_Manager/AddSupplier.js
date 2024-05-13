import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from '../Dashboard';

const AddSupplier = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    supName: '',
    Items: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddSupplier = () => {
    let valid = true;
    const validationErrors = {};

    if (!newSupplier.supName.trim()) {
      validationErrors.supName = 'Supplier name is required';
      valid = false;
    }

    if (!newSupplier.Items.trim()) {
      validationErrors.Items = 'Items are required';
      valid = false;
    }

    setErrors(validationErrors);

    if (!valid) {
      toast.error('Form has errors', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    axios
      .post('http://localhost:5002/api/createsupplier', newSupplier)
      .then((response) => {
        console.log(response.data);
        setTimeout(() => {
          setShowAlert(true);
        }, 1000);
        toast.success('New Supplier Added Successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/suppliers');
      })
      .catch((error) => {
        console.error('Error adding supplier:', error);
      });
  };

  return (
    <Dashboard title="Supplier Management">
      <Container maxWidth="lg">
        {showAlert && (
          <Alert variant="outlined" severity="success">
            New Supplier Added Successfully..
          </Alert>
        )}
        <Paper style={{ padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Add New Supplier
          </Typography>
          <TextField
            label="Supplier Name"
            name="supName"
            value={newSupplier.supName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={errors.supName !== undefined}
            helperText={errors.supName}
          />
          <TextField
            label="Items (comma-separated)"
            name="Items"
            value={newSupplier.Items}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={errors.Items !== undefined}
            helperText={errors.Items}
          />
          <TextField
            label="Description"
            name="description"
            value={newSupplier.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
            <Button variant="contained" color="primary" onClick={handleAddSupplier}>
              Add Supplier
            </Button>
          </div>
        </Paper>
      </Container>
      <Button variant="contained" onClick={() => navigate('/suppliers')}>
        Back
      </Button>
    </Dashboard>
  );
};

export default AddSupplier;
