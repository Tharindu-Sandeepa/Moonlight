import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Sidenav from '../../component/Sidenav';
import axios from 'axios';
import SupplierForm from './SupplierForm';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const SupplierBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  borderRadius: '20px',
  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px) scale(1.02)',
    boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.3)',
  },
}));

const SquareCard = styled(Card)(({ theme }) => ({
  width: '200px',
  height: '100px',
  margin: '20px',
  borderRadius: '20px',
  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.3)',
  },
}));

const generateColor = (str) => {
  const hash = str.split('').reduce((acc, char) => char.charCodeAt(0) + (acc << 6) + (acc << 16) - acc, 0);
  const color = `rgb(${hash & 0xFF},${(hash & 0xFF00) >> 8},${(hash & 0xFF0000) >> 16})`;
  return color;
};

function SupplierPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [supplierToRemove, setSupplierToRemove] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/supList')
      .then((response) => {
        setSuppliers(response.data.response);
        setFilteredSuppliers(response.data.response);
      })
      .catch((error) => {
        console.error('Error fetching supplier data:', error);
      });
  }, []);

  useEffect(() => {
    const filtered = suppliers.filter((supplier) =>
      supplier.Items.some((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredSuppliers(filtered);
  }, [searchQuery, suppliers]);

  const handleRemoveClick = (_id) => {
    setOpenDialog(true);
    setSupplierToRemove(_id);
  };

  const handleUpdateClick = (_id) => {
    const selected = suppliers.find((supplier) => supplier._id === _id);
    if (selected) {
      setSelectedSupplier(selected);
      setShowUpdateForm(true);
    } else {
      console.error('Supplier not found for update.');
    }
  };

  const handleCancelUpdate = () => {
    setShowUpdateForm(false);
    setSelectedSupplier(null);
  };

  const handleRemoveConfirm = () => {
    axios
      .post('http://localhost:3001/api/deleteSupplier', { _id: supplierToRemove })
      .then((response) => {
        console.log(response.data);
        setSuppliers((prevSuppliers) => prevSuppliers.filter((supplier) => supplier._id !== supplierToRemove));
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error('Error deleting supplier:', error);
        setOpenDialog(false);
      });
  };

  const handlePlaceOrderClick = () => {
    navigate('/orderform');
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Sidenav>
      <Container maxWidth="lg">
        <Grid container justifyContent="center" alignItems="center" spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold' }}>
              &nbsp; Suppliers
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <SquareCard variant="outlined">
              <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar style={{ marginRight: '10px' }}>
                  {suppliers.length}
                </Avatar>
                <Typography variant="h6" component="h2">
                  Total Suppliers
                </Typography>
              </CardContent>
            </SquareCard>
            <SquareCard variant="outlined">
              <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar style={{ marginRight: '10px' }}>
                  +
                </Avatar>
                <Button component={Link} to="/add-supplier" variant="contained" color="primary">
                  Add New Supplier
                </Button>
              </CardContent>
            </SquareCard>
          </Grid>
          <Grid item xs={12}>
            {showUpdateForm && selectedSupplier && <SupplierForm
              supplier={selectedSupplier}
              onCancel={handleCancelUpdate}
              onUpdate={(updatedSupplierData) => {
                const updatedSuppliers = suppliers.map((supplier) =>
                  supplier._id === updatedSupplierData._id ? updatedSupplierData : supplier
                );
                setSuppliers(updatedSuppliers);
                setShowUpdateForm(false);
                setSelectedSupplier(null);
              }}
            />}
          </Grid>
          <Grid item xs={12}>
            <Paper
              style={{
                backgroundColor: '#f5f5f5',padding: '20px',marginTop: '20px',position: 'relative',
              }}
            >
              <TextField
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ textAlign: 'center' }}
              />
              <Grid container spacing={3}>
                {filteredSuppliers.map((supplier) => (
                  <Grid item xs={12} sm={6} md={4} key={supplier._id}>
                    <SupplierBox elevation={3}>
                      <Avatar
                        alt={supplier.supName}
                        sx={{
                          width: 100,
                          height: 100,
                          margin: 'auto',
                          backgroundColor: generateColor(supplier.supName),
                        }}
                      >
                        {supplier.supName.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="h5" component="h2" sx={{ marginTop: 2 }}>
                        {supplier.supName}
                      </Typography>
                      <Typography variant="subtitle1" component="p" sx={{ marginTop: 1 }}>
                        Items: {supplier.Items.join(', ')}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p" sx={{ marginTop: 1 }}>
                        Description: {supplier.description}
                      </Typography>
                      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '15px' }}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{ fontSize: '0.7rem', padding: '4px 8px', marginRight: '0.25rem', width: '70px' }}
                          onClick={() => handleUpdateClick(supplier._id)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          sx={{ fontSize: '0.7rem', padding: '4px 8px', marginRight: '0.25rem', width: '100px' }}
                          onClick={handlePlaceOrderClick}
                        >
                          Place an Order
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          sx={{ fontSize: '0.7rem', padding: '4px 8px', width: '70px' }}
                          onClick={() => handleRemoveClick(supplier._id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </SupplierBox>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
       
      </Container>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Are you sure you want to remove this supplier?</DialogTitle>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
          <Button variant="contained" color="error" style={{ marginRight: '0.5cm' }} onClick={handleRemoveConfirm}>
            Yes
          </Button>
          <Button variant="contained" color="success" style={{ marginLeft: '0.5cm' }} onClick={() => setOpenDialog(false)}>
            No
          </Button>
        </div>
      </Dialog>
      <div>
      <Button
            component={Link}
            to="/supplyorder"
            variant="contained"
            color="primary"
            style={{ position: 'flex', bottom: '0px', left: '20px' }}
>        Back
      </Button>
      </div>
    </Sidenav>
  );
}

export default SupplierPage;
