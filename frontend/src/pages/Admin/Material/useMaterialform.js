import { Box, Button, Card, CardContent, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const useMaterialform = ({ addUseMaterials, updateUSeMaterial, submitted, data, isEdit }) => {
    const [useId, setUseId] = useState(0);
    const [useName, setUseName] = useState('');
    const [useWeight, setUseWeight] = useState('');
    const [useDate, setUseDate] = useState('');
    const [useReason, setUseSpecial] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!useId) errors.useId = "ID is required";
        if (!useName) errors.useName = "Material Name is required";
        if (!useWeight) errors.useWeight = "Weight is required";
        if (!useDate) errors.useDate = "Date is required";
        if (!useReason) errors.useReason = "Use Reason is required";

        if (isNaN(useId) || parseInt(useId) <= 0) errors.useId = "ID must be a number";
        if (isNaN(useWeight) || parseFloat(useWeight) <= 0) errors.useWeight = "Weight must be a number";
     //   if (typeof useName !== 'string') errors.useName = "Material Name must be a string";
        if (typeof useReason !== 'string') errors.useReason = "Special Note must be a string";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    

    useEffect(() => {
        if (!submitted) {
            setUseId(0);
            setUseName('');
            setUseWeight('');
            setUseDate('');
            setUseSpecial('');
        }
    }, [submitted]);

    useEffect(() => {
        if (data?.useId && data.useId !== 0) {
            setUseId(data.useId);
            setUseName(data.useName);
            setUseWeight(data.useWeight);
            setUseDate(data.useDate);
            setUseSpecial(data.useReason);
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
                                isEdit ? updateUSeMaterial({ useId, useName, useWeight, useDate, useReason }) :
                                    addUseMaterials({ useId, useName, useWeight, useDate, useReason });
                            }
                        }}>

                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="ID"  
                                        value={useId}
                                        onChange={e => setUseId(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.useId}
                                        helperText={errors.useId}
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
                                        <MenuItem value="">Select Material</MenuItem>
                                        <MenuItem value="Silver">Silver</MenuItem>
                                        <MenuItem value="Gold">Gold</MenuItem>
                                        <MenuItem value="Platinum">Palladium </MenuItem>
                                        <MenuItem value="Palladium">Platinum</MenuItem>
                                        <MenuItem value="Copper">Copper</MenuItem>
                                        <MenuItem value="Alloy-silver">Alloy(for Silver) </MenuItem>
                                        <MenuItem value="Alloy-Gold">Alloy(for Gold) </MenuItem>
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
                                        label="Special Note"
                                        value={useReason}
                                        onChange={e => setUseSpecial(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.useReason}
                                        helperText={errors.useReason}
                                    />
                                </Grid>
                                <Grid item xs={12}>

                                    <Button type="submit" variant="contained" color="primary" fullWidth>

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

export default useMaterialform;
