import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Sidenav from '../../../components/Sidenav';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const SupplierDashboard = () => {
  const [supplier, setSupplier] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [reason, setReason] = useState(''); 
  const [open, setOpen] = useState(false); 
  const navigate = useNavigate(); 
  const [id, setId] = useState(null);


  useEffect(() => {
    getSup();
  }, []);

  const getSup = () => {
    Axios.get('http://localhost:5002/api/supplier')
      .then(response => {
        setSupplier(response.data?.response || []);
      })
      .catch(error => {
        console.error("Axios Error : ", error);
      });
  }

  const addSup = (data) => {
    // Function remains unchanged
  }

  const deleteSup = (id) => {
    setOpen(true); // Open the dialog window for entering the reason
    setId(id); // Set the id in the state
  }
  

  const handleClose = () => {
    setOpen(false);
    setReason(''); 
    setId(null); 
  }
  

  const updateSup = (data) => {
    setSubmitted(true);
  
    const payload = {
      _id: data._id,
      orderID: data.orderID,
      itemID: data.itemID,
      item: data.item,
      quantity: data.quantity,
      date: data.date,
      status: 'Pending' 
    };
  
    Axios.post('http://localhost:5002/api/updateSup', payload)
      .then(() => {
        setSubmitted(false);
        toast.success('Order Accepted', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  
        // Send email after successfully updating the supplier
        sendEmail({
          orderID: data.orderID,
          email: 'nisadimithara01@gmail.com',
          subject: 'Order Accepted',
          text: `The order with ID ${data.orderID} has been accepted.`
        });
  
        getSup(); // Refresh the table after updating
      })
      .catch(error => {
        console.error("Axios Error : ", error);
      });
  }
  
  const handleConfirmReject = () => {
    const payload = {
      _id: id, 
      status: 'Rejected',
      reason: reason // Include the rejection reason
    };
  
    Axios.post('http://localhost:5002/api/updateSup', payload)
      .then(() => {
        const updatedSupplier = supplier.map(sup => {
          if (sup._id === id) {
            return { ...sup, status: 'Rejected' };
          }
          return sup;
        });
  
        setSupplier(updatedSupplier); 
  
        toast.success('Order Rejected', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  
        // Send email after successfully rejecting the order
        sendEmail({
          orderID: id, // Use the orderID from the state
          email: 'nisadimithara01@gmail.com',
          subject: 'Order Rejected',
          text: `The order with ID ${id} has been rejected. Reason: ${reason}` // Include the reason in the email text
        });
  
        handleClose(); // Close the dialog window
      })
      .catch(error => {
        console.error("Axios Error : ", error);
      });
  };
  
  



  const sendEmail = (data) => {
    const emailPayload = {
      email: data.email, // Use the email from the function argument
      subject: data.subject, // Use the subject from the function argument
      text: data.text // Use the text from the function argument
    };

    Axios.post('http://localhost:5002/api/send-email', emailPayload)
      .then(response => {
        console.log('Email sent:', response.data.message);
      })
      .catch(error => {
        console.error('Error sending email:', error);
      });
  };

  const getDateFromDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Extract the date part
  }

  return (
    <Sidenav>
      <div style={{ marginLeft: 240, marginRight: 20 }}>
        <h1>Supplier Dashboard</h1>
        <Paper elevation={5} sx={{ marginBottom: '20px', padding: '10px' }}>
          <TableContainer component={Paper} elevation={0} sx={{ maxWidth: '100%' }}>
            <Table sx={{ minWidth: 300, tableLayout: 'fixed' }} size="small" elevation={0}>
              <TableHead sx={{ backgroundColor: '#1e88e5', color: '#fff' }}>
                <TableRow>
                  <TableCell sx={{ color: '#fff', padding: '8px', textAlign: 'center' }}>Order ID</TableCell>
                  <TableCell sx={{ color: '#fff', padding: '8px', textAlign: 'center' }}>Item ID</TableCell>
                  <TableCell sx={{ color: '#fff', padding: '8px', textAlign: 'center' }}>Item</TableCell>
                  <TableCell sx={{ color: '#fff', padding: '8px', textAlign: 'center' }}>Date</TableCell>
                  <TableCell sx={{ color: '#fff', padding: '8px', textAlign: 'center' }}>Quantity</TableCell>
                  <TableCell sx={{ color: '#fff', padding: '8px', textAlign: 'center' }}>Status</TableCell>
                  <TableCell sx={{ color: '#fff', padding: '8px', textAlign: 'center' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {supplier.map(sup => (
                  <TableRow key={sup._id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
                    <TableCell sx={{ padding: '8px', textAlign: 'center' }}>{sup.orderID}</TableCell>
                    <TableCell sx={{ padding: '8px', textAlign: 'center' }}>{sup.itemID}</TableCell>
                    <TableCell sx={{ padding: '8px', textAlign: 'center' }}>{sup.item}</TableCell>
                    <TableCell sx={{ padding: '8px', textAlign: 'center' }}>{getDateFromDate(sup.date)}</TableCell>
                    <TableCell sx={{ padding: '8px', textAlign: 'center' }}>{sup.quantity} piece</TableCell>
                    <TableCell sx={{ padding: '8px', textAlign: 'center' }}>{sup.status} </TableCell>
                    <TableCell sx={{ textAlign: 'center', padding: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                          sx={{
                            borderRadius: '20px',
                            backgroundColor: '#4caf50',
                            color: '#fff',
                            marginRight: '5px',
                            padding: '4px 12px',
                            fontSize: '0.875rem',
                            '&:hover': {
                              backgroundColor: '#45a049',
                            },
                          }}
                          onClick={() => updateSup(sup)} 
                        >
                          Accept
                        </Button>
                        <Button
                          sx={{
                            borderRadius: '20px',
                            backgroundColor: '#f44336',
                            color: '#fff',
                            padding: '4px 12px',
                            fontSize: '0.875rem',
                            '&:hover': {
                              backgroundColor: '#e53935',
                            },
                          }}
                          onClick={() => deleteSup(sup._id)} // Pass the id parameter
                        >
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Reason for Rejecting Order</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="reason"
              label="Reason"
              type="text"
              fullWidth
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleConfirmReject} color="error">Confirm Reject</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Sidenav>
  );
};

export default SupplierDashboard;
