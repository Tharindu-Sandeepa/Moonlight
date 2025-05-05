import { Box, Button, Card, CardContent, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Maddform = ({ addMaterials, updateMaterial, submitted, data, isEdit }) => {
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [order, setOrder] = useState('');
    const [supplierID, setSupplierID] = useState('');
    const [cost, setCost] = useState('');
    const [voucher, setVoucher] = useState('');
    const [date, setDate] = useState('');
    const [special, setSpecial] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!id) errors.id = "ID is required";
        if (!name) errors.name = "Material Name is required";
        if (!weight) errors.weight = "Material Weight is required";
        if (!order) errors.order = "Material Order ID is required";
        if (!supplierID) errors.supplierID = "Supplier ID is required";
        if (!cost) errors.cost = "Material Cost is required";
        if (!voucher) errors.voucher = "Voucher Number is required";
        if (!date) errors.date = "Date is required";
        if (!special) errors.special = "Special Note is required";

        if (isNaN(id) || parseInt(id) <= 0) errors.id = "ID must be a number";
        if (typeof name !== 'string') errors.name = "Material Name must be a string";
        if (isNaN(weight) || parseInt (weight) <= 0) errors.weight = "Weight must be a number";
        if (isNaN(order) || parseInt(order) <= 0) errors.order = "Order must be a number";
        if (isNaN(supplierID) || parseInt(supplierID) <= 0) errors.supplierID = "supplierID must be a number";
        if (isNaN(cost) || parseInt(cost) <= 0) errors.cost = "cost must be a number";
        if (isNaN(voucher) || parseInt(voucher) <= 0) errors.voucher = "voucher must be a number";
        if (typeof special !== 'string') errors.special = "special Note must be a string";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        if (!submitted) {
            setId(0);
            setName('');
            setWeight('');
            setOrder('');
            setSupplierID('');
            setCost('');
            setVoucher('');
            setDate('');
            setSpecial('');
        }
    }, [submitted]);

    useEffect(() => {
        if (data?.id && data.id !== 0) {
            setId(data.id);
            setName(data.name);
            setWeight(data.weight);
            setOrder(data.order);
            setSupplierID(data.supplierID);
            setCost(data.cost);
            setVoucher(data.voucher);
            setDate(data.date);
            setSpecial(data.special);
        }
    }, [data]);

    return (
        <Box sx={{ width: 'calc(100% - 100px)' }}>
            <div className="mainform">
                <Card style={{ maxWidth: 1000, margin: "0 auto", padding: "20px 5px" }}>
                    <CardContent>
                    <form onSubmit={(e) => {
                            e.preventDefault();
                            if (validateForm()) {
                                isEdit ? updateMaterial({ id, name, weight, order, supplierID, cost, voucher, date, special }) :
                                    addMaterials({ id, name, weight, order, supplierID, cost, voucher, date, special });
                            }
                        }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="ID"
                                        value={id}
                                        onChange={e => setId(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.id}
                                        helperText={errors.id}
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Select
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        label="Material Name"
                                        error={!!errors.name}
                                        helperText={errors.name}
                                        
                                    >
                                        <MenuItem value="">Select Material</MenuItem>
                                        <MenuItem value="Silver">Silver</MenuItem>
                                        <MenuItem value="Gold">Gold</MenuItem>
                                        <MenuItem value="Platinum">Palladium</MenuItem>
                                        <MenuItem value="Palladium">Platinum</MenuItem>
                                        <MenuItem value="Copper">Copper</MenuItem>
                                        <MenuItem value="Alloy-silver">Alloy(for Silver)</MenuItem>
                                        <MenuItem value="Alloy-Gold">Alloy(for Gold)</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Material Weight"
                                        value={weight}
                                        onChange={e => setWeight(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.weight}
                                        helperText={errors.weight}
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Material Order ID"
                                        value={order}
                                        onChange={e => setOrder(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.order}
                                        helperText={errors.order}
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Supplier ID"
                                        value={supplierID}
                                        onChange={e => setSupplierID(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.supplierID}
                                        helperText={errors.supplierID}
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Material Cost"
                                        value={cost}
                                        onChange={e => setCost(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.cost}
                                        helperText={errors.cost}
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Voucher Number"
                                        value={voucher}
                                        onChange={e => setVoucher(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.voucher}
                                        helperText={errors.voucher}
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Date"
                                        type="date"
                                        value={date}
                                        onChange={e => setDate(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.date}
                                        helperText={errors.date}
                                        
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Special Note"
                                        value={special}
                                        onChange={e => setSpecial(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.special}
                                        helperText={errors.special}
                                        
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={() => {
                                            
                                        }}
                                    >
                                        {isEdit ? 'Update' : 'Add'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </Box>
    );
};

export default Maddform;
