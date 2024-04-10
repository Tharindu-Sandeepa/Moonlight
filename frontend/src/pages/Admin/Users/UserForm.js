import { Button, Grid, Typography, InputLabel,Paper, TextField, InputAdornment, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";

const UserForm = ({ addUser, updateUser, submitted, data, isEdit }) => {
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [tp, setTp] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        if (!submitted) {
            setName('');
            setUsername('');
            setEmail('');
            setTp('');
            setPassword('');
            setType('');
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

    return (
        <Paper elevation={3} sx={{ borderRadius: '20px', padding: '20px', backgroundColor: '#ffffff', marginBottom: '30px',mb:30 }}>
            

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Telephone"
                        value={tp}
                        onChange={e => setTp(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={type}
                        onChange={e => setType(e.target.value)}
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
                sx={{ marginTop: '20px', ml:'42%'}}
                onClick={() => isEdit ? updateUser({ id, name, username, email, tp, password, type }) : addUser({ name, username, email, tp, password, type })}
            >
                {isEdit ? 'Update' : 'Add'}
            </Button>
        </Paper>
    );
}

export default UserForm;
