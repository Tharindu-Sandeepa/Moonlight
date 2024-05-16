import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidenav from '../../../components/Sidenav';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";

const SupItemTable = () => {
  const [supItem, setSupItem] = useState([]);
  // eslint-disable-next-line
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate(); 

  const handleUpdateClick = (row) => {
    navigate('/updateSupItem', { state: { selectedsupOrder: row } });
  };

  useEffect(() => {
    getSupItem();
  }, []);

  const getSupItem = () => {
    Axios.get('http://localhost:5002/api/supItem')
      .then(response => {
        setSupItem(response.data?.response || []);
      })
      .catch(error => {
        console.error("Axios Error : ", error);
      });
  };

 

  const deleteSupItem = (id) => {
    Axios.post('http://localhost:5002/api/deleteSupItem', { _id: id })
      .then(() => {
        getSupItem();
        toast.success('Item Deleted', {
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
  };

  return (
    <Sidenav>
      <div style={{ marginLeft: 240, marginRight: 20 }}> {/* Adjust margin according to your Sidebar width */}
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: '20px' }}
          onClick={() => navigate('/addSupItem')}
        >
          Add Item
        </Button>
        <Paper elevation={5} sx={{ marginBottom: '20px', padding: '10px' }}>
          <TableContainer component={Paper} elevation={0} sx={{ maxWidth: '100%' }}>
            <Table sx={{ minWidth: 300, tableLayout: 'fixed' }} size="small" elevation={0}> {/* Reduced the table width and size */}
              <TableHead sx={{ backgroundColor: '#1e88e5', color: '#fff' }}>
                <TableRow>
                  <TableCell sx={{ color: '#fff', padding: '8px', textAlign: 'center' }}>Item ID</TableCell>
                  <TableCell sx={{ color: '#fff', padding: '8px', textAlign: 'center' }}>Item</TableCell>
                  <TableCell sx={{ color: '#fff', padding: '8px', textAlign: 'center' }}>Quantity</TableCell>
                  <TableCell sx={{ color: '#fff', padding: '8px', textAlign: 'center' }}>Description</TableCell>
                  <TableCell sx={{ color: '#fff', padding: '8px', textAlign: 'center' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {supItem.map(row => (
                  <TableRow key={row._id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
                    <TableCell sx={{ padding: '8px', textAlign: 'center' }}>{row.itemID}</TableCell>
                    <TableCell sx={{ padding: '8px', textAlign: 'center' }}>{row.item}</TableCell>
                    <TableCell sx={{ padding: '8px', textAlign: 'center' }}>{row.quantity}</TableCell>
                    <TableCell sx={{ padding: '8px', textAlign: 'center' }}>{row.description}</TableCell>
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
                          onClick={() => handleUpdateClick(row)}
                        >
                          Update
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
                          onClick={() => deleteSupItem(row._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </Sidenav>
  );
};

export default SupItemTable;
