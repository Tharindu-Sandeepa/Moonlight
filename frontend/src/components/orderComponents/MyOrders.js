import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { TableCell, TableRow, TableContainer, Table, TableHead, TableBody, Paper, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useAuth } from '../../Auth/AuthContext'; // Importing the useAuth hook

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useAuth(); // Using the useAuth hook to access user data

    useEffect(() => {
        if (user) {
            getOrders(user.name); // Pass the username to getOrders function
        }
    }, [user]);

    const getOrders = (name) => {
        Axios.get('http://localhost:5002/api/orders/orders')
            .then(response => {
                // Filter orders based on username
                const filteredOrders = response.data.response.filter(order => order.userID === name);
                setOrders(filteredOrders);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                toast.error('Failed to fetch orders. Please try again later.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            });
    }

    return (
        <div>
            <Typography 
                variant="h4" 
                sx={{ mb: 6, mt: 4, textAlign: "center" }} // Adding more space below the title
                align="center"
            >
                My Orders
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 5, padding: 2 }}>
                <Table aria-label="orders table">
                    <TableHead sx={{ backgroundColor: '#1565c0' }}>
                        <TableRow>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Order ID</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>User ID</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Items</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Total</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Amount</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Date</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map(row => (
                            <TableRow key={row.orderID}>
                                <TableCell>{row.orderID}</TableCell>
                                <TableCell>{row.userID}</TableCell>
                                <TableCell>{row.items}</TableCell>
                                <TableCell>{row.total}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default MyOrders;
