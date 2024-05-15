import { Box, Button, Card, CardContent, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const useMaterialform = ({ addUseMaterials, updateUSeMaterial, submitted, data, isEdit }) => {
    const [useName, setUseName] = useState('');
    const [useWeight, setUseWeight] = useState('');
    const [useDate, setUseDate] = useState('');
    const [useReason, setUseReason] = useState('');
    const [errors, setErrors] = useState({});
    const [materialNames, setMaterialNames] = useState([]);
    const [currentId, setCurrentId] = useState(() => {
        const savedId = localStorage.getItem('currentUseId');
        return savedId ? parseInt(savedId) : 0;
    });

    // Form validation
    const validateForm = () => {
        const errors = {};
        if (!useName) errors.useName = "Material Name is required";
        if (!useWeight) errors.useWeight = "Weight is required";
        if (!useDate) errors.useDate = "Date is required";
        if (!useReason) errors.useReason = "Use Reason is required";

        if (isNaN(currentId) || parseInt(currentId) <= 0) errors.useId = "ID must be a number";
        if (isNaN(useWeight) || parseFloat(useWeight) <= 0) errors.useWeight = "Weight must be a number";
        if (typeof useReason !== 'string') errors.useReason = "Special Note must be a string";

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    // Set names
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

    // Resetting the form fields when submitted 
    useEffect(() => {
        if (!submitted) {
            setUseName('');
            setUseWeight('');
            setUseDate('');
            setUseReason('');
        }
    }, [submitted]);

    // Updating the form fields with data passed through the data 
    useEffect(() => {
        if (data?.useId && data.useId !== 0) {
            setUseName(data.useName);
            setUseWeight(data.useWeight);
            setUseDate(data.useDate);
            setUseReason(data.useReason);
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (!isEdit) {
                const newId = currentId + 1; // Increment the ID only for new entries
                setCurrentId(newId); // Update the currentId state
                localStorage.setItem('currentUseId', newId); // Save the new ID to localStorage
                const useMaterial = { useId: newId, useName, useWeight, useDate, useReason };
                addUseMaterials(useMaterial);
            } else {
                const useMaterial = { useId: data.useId, useName, useWeight, useDate, useReason };
                updateUSeMaterial(useMaterial);
            }
        }
    };

    return (
        <Box sx={{ width: 'calc(100% - 100px)' }}>
            <div className="mainform">
                <Typography variant="h5" sx={{ marginBottom: '15px' }}>
                    {isEdit ? 'Edit Use Material Entry' : 'Add Use Material Entry'}
                </Typography>
                <Card style={{ maxWidth: 1000, margin: "0 auto", padding: "20px 5px" }}>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="ID"
                                        value={isEdit ? data.useId : currentId + 1}
                                        readOnly
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Select
                                        value={useName}
                                        onChange={(e) => setUseName(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        label="Material Name"
                                        error={!!errors.useName}
                                    >
                                        {materialNames.map((materialName, index) => (
                                            <MenuItem key={index} value={materialName}>{materialName}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Use Material Weight"
                                        value={useWeight}
                                        onChange={e => setUseWeight(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.useWeight}
                                        helperText={errors.useWeight}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        value={useDate}
                                        type="date"
                                        onChange={e => setUseDate(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.useDate}
                                        helperText={errors.useDate}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Use Reason"
                                        value={useReason}
                                        onChange={e => setUseReason(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.useReason}
                                        helperText={errors.useReason}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        {isEdit ? 'Update' : 'Add New Use Entry'}
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

export default useMaterialform;
