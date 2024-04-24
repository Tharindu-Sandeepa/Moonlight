import React, { useEffect, useState } from "react";
import { Box, Button, Paper } from "@mui/material";
import OrderForm from "./OrderForm";
import OrdersTable from "./OrdersTable";
import Axios from "axios";
import GroupAddIcon from '@mui/icons-material/ContactEmergency';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [selectOrder, setSelectOrder] = useState(null);

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = () => {
        Axios.get('http://localhost:5002/api/orders/orders')
            .then(response => {
                setOrders(response.data.response);
                setEdit(false);
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

    const addOrder = (data) => {
        setSubmitted(true);
        const payload = {
            userID: data.userID,
            orderID: data.orderID,
            items: data.items,
            total: data.total,
            amount: data.amount,
            date: data.date,
            slip: data.slip,
            status: data.status,
        }
        Axios.post('http://localhost:5002/api/orders/createorder', payload)
            .then(() => {
                getOrders();
                setSubmitted(false);
                setEdit(false);
                setShowForm(false);
                toast.success('Order successfully added.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                toast.error('Failed to add order. Please try again later.', {
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

    const updateOrder = (data) => {
        setSubmitted(true);
        const payload = {
            id: data.id,
            userID: data.userID,
            orderID: data.orderID,
            items: data.items,
            total: data.total,
            amount: data.amount,
            date: data.date,
            slip: data.slip,
            status: data.status,
        }
        Axios.post('http://localhost:5002/api/orders/updateorder', payload)
            .then(() => {
                getOrders();
                setSubmitted(false);
                setEdit(false);
                setShowForm(false);
                toast.success('Order successfully updated.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                toast.error('Failed to update order. Please try again later.', {
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

    const deleteOrder = (id) => {
        setSubmitted(true);
        Axios.post('http://localhost:5002/api/orders/deleteorder', id)
            .then(() => {
                getOrders();
                toast.success('Order successfully deleted.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                toast.error('Failed to delete order. Please try again later.', {
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
        <Box sx={{
            width: 'calc(100% - 100px)',
            margin: 'auto',
            marginTop: 5,

        }}>
            {!showForm && (
                <Paper elevation={3} sx={{
                    display: 'flex',
                    flexDirection: 'column',

                    // Center content vertically
                    borderRadius: '20px',
                    width: 250,
                    height: 180,
                    ml: '35%',

                    padding: '20px' // Add padding for better appearance
                }}><GroupAddIcon sx={{ fontSize: 40, color: '#1565c0' }} />
                    <Button
                        onClick={() => { setShowForm(true); setSelectOrder(null); }}
                        sx={{
                            mt: 3,
                            justifySelf: 'center',
                            alignSelf: 'center',
                            color: "white", // Change text color to white for better contrast
                            fontWeight: 'bold', // Change fontStyle to fontWeight
                            fontSize: 14, // Increase font size for better readability
                            borderRadius: '40px',
                            width: '50%', // Adjust button width for better proportion
                            backgroundColor: '#1565c0', // Change button color to a darker shade of blue
                            '&:hover': {
                                backgroundColor: '#0d47a1',
                            },
                        }}
                    >
                        Add Order
                    </Button>
                </Paper>

            )}
            {showForm && (
                <OrderForm
                    addOrder={addOrder}
                    updateOrder={updateOrder}
                    submitted={submitted}
                    data={selectOrder}
                    isEdit={isEdit}
                />
            )}
            <OrdersTable
                rows={orders}
                selectOrder={(data) => { setSelectOrder(data); setEdit(true); setShowForm(true); }}
                deleteOrder={(data) => { window.confirm("Are you sure?") && deleteOrder(data) }}
            />
        </Box>
    );
}

export default Orders;
