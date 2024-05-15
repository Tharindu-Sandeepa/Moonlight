import { Box, Button, Card, CardContent, Grid, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const NewMaterialForm = ({ addNewMaterials, updateNewMaterial, submitted, data, isEdit }) => {
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!id) errors.id = "ID is required";
        if (!name) errors.name = "Material Name is required";
        if (!weight) errors.weight = "Material Weight is required";

        if (typeof id !== 'string' || id.trim() === '') errors.id = "ID must be a string";
        if (typeof name !== 'string') errors.name = "Material Name must be a string";
        if (isNaN(weight) ) errors.weight = "Weight must be a number";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        if (!submitted) {
            setId(0);
            setName('');
            setWeight('');
        }
    }, [submitted]);

    useEffect(() => {
        if (data?.id && data.id !== 0) {
            setId(data.id);
            setName(data.name);
            setWeight(data.weight);
        }
    }, [data]);

    return (
        <Box sx={{ width: 'calc(100% - 100px)', marginBottom:'20px' }}>
            <div className="mainform">

                <Card style={{ maxWidth: 1000, margin: "0 auto", padding: "20px 5px" }}>
                    <CardContent>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            if (validateForm()) {
                                isEdit ? updateNewMaterial({ id, name, weight }) :
                                addNewMaterials({ id, name, weight });
                            }
                        }}>

                            <Grid container spacing={2}>
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
                                    <TextField
                                        label="Material Name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.name}
                                        helperText={errors.name}
                                    />
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
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                    >
                                        {isEdit ? 'Update' : 'Add New '}
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

export default NewMaterialForm;
