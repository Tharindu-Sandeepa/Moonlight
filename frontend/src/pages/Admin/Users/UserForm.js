import { Button, Grid, Typography, InputLabel, Paper, TextField, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";

const UserForm = ({ addUser, updateUser, submitted, data, isEdit }) => {
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [tp, setTp] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [tpError, setTpError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        if (!submitted) {
            setName('');
            setUsername('');
            setEmail('');
            setTp('');
            setPassword('');
            setType('');
            setNameError('');
            setEmailError('');
            setTpError('');
            setPasswordError('');
        }
    }, [submitted]);

    useEffect(() => {
        if (data) {
            setId(data.id);
            setName(data.name || '');
            setUsername(data.username || '');
            setEmail(data.email || '');
            setTp(data.tp || '');
            setPassword(data.password || '');
            setType(data.type || '');
        }
    }, [data]);

    const validateName = (value) => {
        if (!value) {
            setNameError('Name is required');
        } else {
            setNameError('');
        }
    };

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            setEmailError('Email is required');
        } else if (!emailRegex.test(value)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const validateTp = (value) => {
        const tpRegex = /^\d{10}$/;
        if (!value) {
            setTpError('Telephone number is required');
        } else if (!tpRegex.test(value)) {
            setTpError('Invalid telephone number');
        } else {
            setTpError('');
        }
    };

    const validatePassword = (value) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!value) {
            setPasswordError('Password is required');
        } else if (!passwordRegex.test(value)) {
            setPasswordError('Password must be at least 8 characters long and include at least one letter and one number');
        } else {
            setPasswordError('');
        }
    };

    return (
        <Paper elevation={3} sx={{ borderRadius: '20px', padding: '20px', backgroundColor: '#ffffff', marginBottom: '220px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            validateName(e.target.value);
                        }}
                        fullWidth
                        variant="outlined"
                        error={!!nameError}
                        helperText={nameError}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            validateEmail(e.target.value);
                        }}
                        fullWidth
                        variant="outlined"
                        error={!!emailError}
                        helperText={emailError}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Telephone"
                        value={tp}
                        onChange={(e) => {
                            setTp(e.target.value);
                            validateTp(e.target.value);
                        }}
                        fullWidth
                        variant="outlined"
                        error={!!tpError}
                        helperText={tpError}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                        }}
                        fullWidth
                        variant="outlined"
                        error={!!passwordError}
                        helperText={passwordError}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        fullWidth
                        variant="outlined"
                    >
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="User">User</MenuItem>
                        <MenuItem value="Supplier">Supplier</MenuItem>
                    </Select>
                </Grid>
            </Grid>

            <Button
                variant="contained"
                sx={{ marginTop: '20px', ml: '42%' }}
                onClick={() => isEdit ? updateUser({ id, name, username, email, tp, password, type }) : addUser({ name, username, email, tp, password, type })}
                disabled={!!nameError || !!emailError || !!tpError || !!passwordError}
            >
                {isEdit ? 'Update' : 'Add'}
            </Button>
        </Paper>
    );
};

export default UserForm;
