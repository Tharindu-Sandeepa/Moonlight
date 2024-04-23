import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, TextField, Paper } from "@mui/material";
import { Rating } from "@mui/material";

const FeedbackForm = ({ createFeedback, updateFeedback, submitted, isEdit, data }) => {
    const [id, setId] = useState(0);
    const [User_ID, setUser_ID] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [Jewelry_ID, setJewelry_ID] = useState(0);
    const [Jewelry_Name, setJewelry_Name] = useState('');
    const [rating, setRating] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!submitted) {
            setId(0);
            setUser_ID(0);
            setName('');
            setEmail('');
            setJewelry_ID(0);
            setJewelry_Name('');
            setRating(null);
            setFeedback('');
            setErrors({});
        }
    }, [submitted]);

    useEffect(() => {
        if (data?.id && data.id !== 0) {
            setId(data.id);
            setUser_ID(data.User_ID);
            setName(data.name);
            setEmail(data.email);
            setJewelry_ID(data.Jewelry_ID);
            setJewelry_Name(data.Jewelry_Name);
            setRating(data.rating);
            setFeedback(data.feedback);
        }
    }, [data]);

    const handleValidation = () => {
        let isValid = true;
        const newErrors = {};

        if (id === 0) {
            newErrors.id = 'ID is required';
            isValid = false;
        }
        if (User_ID === 0) {
            newErrors.User_ID = 'User ID is required';
            isValid = false;
        }
        if (name === '') {
            newErrors.name = 'Name is required';
            isValid = false;
        }
        if (email === '') {
            newErrors.email = 'Email is required';
            isValid = false;
        }
        if (Jewelry_ID === 0) {
            newErrors.Jewelry_ID = 'Jewelry ID is required';
            isValid = false;
        }
        if (Jewelry_Name === '') {
            newErrors.Jewelry_Name = 'Jewelry Name is required';
            isValid = false;
        }
        if (!rating) {
            newErrors.rating = 'Rating is required';
            isValid = false;
        }
        if (feedback === '') {
            newErrors.feedback = 'Feedback is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = () => {
        if (handleValidation()) {
            if (isEdit) {
                updateFeedback({ id, User_ID, name, email, Jewelry_ID, Jewelry_Name, rating, feedback });
            } else {
                createFeedback({ id, User_ID, name, email, Jewelry_ID, Jewelry_Name, rating, feedback });
            }
        }
    };

    const handleCancel = () => {
        setId(0);
        setUser_ID(0);
        setName('');
        setEmail('');
        setJewelry_ID(0);
        setJewelry_Name('');
        setRating(null);
        setFeedback('');
        setErrors({});
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', margin: 'auto', width: '70%' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Feedback Form</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.id)}
                        helperText={errors.id}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="User ID"
                        value={User_ID}
                        onChange={(e) => setUser_ID(e.target.value)}
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.User_ID)}
                        helperText={errors.User_ID}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Jewelry ID"
                        value={Jewelry_ID}
                        onChange={(e) => setJewelry_ID(e.target.value)}
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.Jewelry_ID)}
                        helperText={errors.Jewelry_ID}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Jewelry Name"
                        value={Jewelry_Name}
                        onChange={(e) => setJewelry_Name(e.target.value)}
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.Jewelry_Name)}
                        helperText={errors.Jewelry_Name}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography component="legend">Rating</Typography>
                    <Rating
                        name="rating"
                        value={rating}
                        onChange={(e, newValue) => setRating(newValue)}
                    />
                    {errors.rating && <Typography color="error">{errors.rating}</Typography>}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        error={Boolean(errors.feedback)}
                        helperText={errors.feedback}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} justifyContent="flex-end">
                        <Grid item>
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                            >
                                {isEdit ? 'Update' : 'Submit'}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default FeedbackForm;
