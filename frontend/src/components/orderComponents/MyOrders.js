import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { TableCell, TableRow, TableContainer, Table, TableHead, TableBody, Paper } from '@mui/material';
import { toast } from 'react-toastify';
//import UserInfo from '../userComponents/UserInfotest'; // Importing the UserInfo component
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
          
            <TableContainer component={Paper} sx={{mt:18,padding:10,mb:40}}>
                <Table aria-label="orders table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>User ID</TableCell>
                            <TableCell>Items</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Date</TableCell>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default MyOrders;
