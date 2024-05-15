import { Box, Button, Card, CardContent, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const Maddform = ({ addMaterials, updateMaterial, submitted, data, isEdit }) => {
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [order, setOrder] = useState('');
    const [supplierName, setSupplierName] = useState('');
    const [cost, setCost] = useState('');
    const [voucher, setVoucher] = useState('');
    const [date, setDate] = useState('');
    const [special, setSpecial] = useState('');
    const [errors, setErrors] = useState({});
    const [materialNames, setMaterialNames] = useState([]);
    const [supplierNames, setSupplierNames] = useState([]);
    const [currentId, setCurrentId] = useState(() => {
        const savedId = localStorage.getItem('currentId');
        return savedId ? parseInt(savedId) : 0;
    });

    const validateForm = () => {
        const errors = {};
        if (!name) errors.name = "Material Name is required";
        if (!weight) errors.weight = "Material Weight is required";
        if (!order) errors.order = "Material Order ID is required";
        if (!supplierName) errors.supplierName = "Supplier ID is required";
        if (!cost) errors.cost = "Material Cost is required";
        if (!voucher) errors.voucher = "Voucher Number is required";
        if (!date) errors.date = "Date is required";
        if (!special) errors.special = "Special Note is required";

        if (typeof name !== 'string') errors.name = "Material Name must be a string";
        if (isNaN(weight) || parseInt(weight) <= 0) errors.weight = "Weight must be a number";
        if (isNaN(order) || parseInt(order) <= 0) errors.order = "Order must be a number";
        if (typeof supplierName !== 'string') errors.supplierName = "Supplier ID must be a string";
        if (isNaN(cost) || parseInt(cost) <= 0) errors.cost = "Cost must be a number";
        if (isNaN(voucher) || parseInt(voucher) <= 0) errors.voucher = "Voucher must be a number";
        if (typeof special !== 'string') errors.special = "Special Note must be a string";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        fetchMaterialNames();
    }, []);

    const fetchMaterialNames = () => {
        axios.get('http://localhost:5002/api/getMaterialNames')
            .then(response => {
                setMaterialNames(response.data.materialNames);
            })
            .catch(error => {
                console.error("Axios Error: ", error);
            });
    };


    useEffect(() => {
        fetchSupID();
    }, []);

    const fetchSupID = () => {
        axios.get('http://localhost:5002/api/getSupName')
            .then(response => {
                setSupplierNames(response.data.supplierNames);
            })
            .catch(error => {
                console.error("Axios Error: ", error);
            });
    };

    useEffect(() => {
        if (!submitted) {
            setName('');
            setWeight('');
            setOrder('');
            setSupplierName('');
            setCost('');
            setVoucher('');
            setDate('');
            setSpecial('');
        }
    }, [submitted]);

    useEffect(() => {
        if (data?.id && data.id !== 0) {
            setName(data.name);
            setWeight(data.weight);
            setOrder(data.order);
            setSupplierName(data.supplierName);
            setCost(data.cost);
            setVoucher(data.voucher);
            setDate(data.date);
            setSpecial(data.special);
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (!isEdit) {
                const newId = currentId + 1; // Increment the ID only for new entries
                setCurrentId(newId); // Update the currentId state
                localStorage.setItem('currentId', newId); // Save the new ID to localStorage
                const material = { id: newId, name, weight, order, supplierName, cost, voucher, date, special };
                addMaterials(material);
            } else {
                const material = { id: data.id, name, weight, order, supplierName, cost, voucher, date, special };
                updateMaterial(material);
            }
        }
    };

    return (
        <Box sx={{ width: 'calc(100% - 100px)' }}>
            <div className="mainform">
                <Card style={{ maxWidth: 1000, margin: "0 auto", padding: "20px 5px" }}>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="ID"
                                        value={isEdit ? data.id : currentId + 1}
                                        readOnly
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Select
                                        label="Material Name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        fullWidth
                                    >
                                        {materialNames.map((materialName, index) => (
                                            <MenuItem key={index} value={materialName}>{materialName}</MenuItem>
                                        ))}
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
                                    <Select
                                        label="Supplier ID"
                                        value={supplierName}
                                        onChange={e => setSupplierName(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.supplierName}
                                        helperText={errors.supplierName}
                                    >  
                                        {supplierNames.map((suppid, index) => (
                                            <MenuItem key={index} value={suppid}>{suppid}</MenuItem>
                                        ))}


                                        </Select>
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
