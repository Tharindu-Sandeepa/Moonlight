import { Button, Grid, Typography, InputLabel,Paper, TextField, InputAdornment, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
//import 'bootstrap/dist/css/bootstrap.min.css';

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

    useEffect(() => {
        if (!submitted) {
            setUserID('');
            setOrderID('');
            setItems('');
            setTotal('');
            setAmount('');
            setDate('');
            setSlip('');
            setStatus('');
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
            setSlip(data.slip || '');
            setStatus(data.status || '');
        }
    }, [data]);

    return (
        <Paper elevation={3} sx={{ borderRadius: '20px', padding: '20px', backgroundColor: '#ffffff', marginBottom: '30px',mb:30 }}>
            
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="userID"
                        value={userID}
                        onChange={e => setUserID(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="orderID"
                        value={orderID}
                        onChange={e => setOrderID(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="items"
                        value={items}
                        onChange={e => setItems(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="total"
                        value={total}
                        onChange={e => setTotal(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="amount"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        type="date     "
                        label="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Upload Slip"
                        type="file"
                        value={slip}
                        accept="slip/*"
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>

                <div className="">
                    <img
                        className=""
                        width={200}
                        height={200}
                        src={slip}
                        alt="Slip"
                    />
                </div>

                <Grid item xs={12} sm={6}>
                    <InputLabel>status</InputLabel>
                    <Select
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        fullWidth
                        variant="outlined"
                    >
                        <MenuItem value="Confirm">Confirm</MenuItem>
                        <MenuItem value="Processing">Processing</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                </Grid>
            </Grid>

            <Button
                variant="contained"
                sx={{ marginTop: '20px', ml:'42%'}}
                onClick={() => isEdit ? updateOrder({ id, userID, orderID, items, total, amount, date, slip, status }) : addOrder({ userID, orderID, items, total, amount, date, slip, status })}
            >
                {isEdit ? 'Update' : 'Add'}
            </Button>
        </Paper>
    );
}

export default OrderForm;
