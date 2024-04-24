import { Button, Grid, Typography, InputLabel, Paper, TextField, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const OrderForm = ({ addOrder, updateOrder, submitted, data, isEdit }) => {
    const [id, setId] = useState(0);
    const [userID, setUserID] = useState('');
    const [orderID, setOrderID] = useState('');
    const [items, setItems] = useState('');
    const [total, setTotal] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [slip, setSlip] = useState(null);
    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
            const reader = new FileReader();
    
            reader.onload = () => {
                const base64String = reader.result;
                setSlip(base64String);
            };
    
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        const errors = {};
        if (!userID.trim()) {
            errors.userID = 'User ID is required';
        }
        if (!orderID.trim()) {
            errors.orderID = 'Order ID is required';
        }
        if (typeof total !== 'string' || !total.trim()) {
            errors.total = 'Total is required';
        } else if (isNaN(total)) {
            errors.total = 'Total must be a number';
        }
        if (typeof amount !== 'string' || !amount.trim()) {
            errors.amount = 'Amount is required';
        } else if (isNaN(amount)) {
            errors.amount = 'Amount must be a number';
        }
        if (!date) {
            errors.date = 'Date is required';
        }
        if (!slip) {
            errors.slip = 'Slip is required';
        }
        setErrors(errors);
    
        if (Object.keys(errors).length === 0) {
            isEdit ? updateOrder({ id, userID, orderID, items, total, amount, date, slip, status }) : addOrder({ userID, orderID, items, total, amount, date, slip, status });
        }
    };
    

    useEffect(() => {
        if (!submitted) {
            setUserID('');
            setOrderID('');
            setItems('');
            setTotal('');
            setAmount('');
            setDate('');
            setSlip(null);
            setStatus('');
            setErrors({});
        }
    }, [submitted]);

    useEffect(() => {
        if (data) {
            setId(data.id);
            setUserID(data.userID || '');
            setOrderID(data.orderID || '');
            setItems(data.items || '');
            setTotal(data.total || '');
            setAmount(data.amount || '');
            setDate(data.date || '');
            setSlip(data.slip || null);
            setStatus(data.status || '');
        }
    }, [data]);

    return (
        <Paper elevation={3} sx={{ borderRadius: '20px', padding: '20px', backgroundColor: '#ffffff', marginBottom: '30px', mb: 30 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="User ID"
                        value={userID}
                        onChange={e => setUserID(e.target.value)}
                        fullWidth
                        variant="outlined"
                        error={errors.userID ? true : false}
                        helperText={errors.userID}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Order ID"
                        value={orderID}
                        onChange={e => setOrderID(e.target.value)}
                        fullWidth
                        variant="outlined"
                        error={errors.orderID ? true : false}
                        helperText={errors.orderID}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Items"
                        value={items}
                        onChange={e => setItems(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Total"
                        value={total}
                        onChange={e => setTotal(e.target.value)}
                        fullWidth
                        variant="outlined"
                        error={errors.total ? true : false}
                        helperText={errors.total}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Amount"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        fullWidth
                        variant="outlined"
                        error={errors.amount ? true : false}
                        helperText={errors.amount}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        fullWidth
                        variant="outlined"
                        error={errors.date ? true : false}
                        helperText={errors.date}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Upload Slip</InputLabel>
                    <TextField
                        type="file"
                        accept="slip/*"
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        error={errors.slip ? true : false}
                        helperText={errors.slip}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        fullWidth
                        variant="outlined"
                    >
                        <MenuItem value="">Select Status</MenuItem>
                        <MenuItem value="Confirm">Confirm</MenuItem>
                        <MenuItem value="Processing">Processing</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                </Grid>
            </Grid>
            <Button
                variant="contained"
                sx={{ marginTop: '20px', ml:'42%'}}
                onClick={handleSubmit}
            >
                {isEdit ? 'Update' : 'Add'}
            </Button>
        </Paper>
    );
}

export default OrderForm;
