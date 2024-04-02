import { Button, Grid, Typography } from "@mui/material";
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
            setId(data.id); //get id from table 
            setName(data.name || '');
            setUsername(data.username || '');
            setEmail(data.email || '');
            setTp(data.tp || '');
            setPassword(data.password || '');
            setType(data.type || '');
        }
    }, [data]);

    return (
        <Grid container spacing={2} sx={{ backgroundColor: '#ffffff', marginBottom: '30px', display: 'block' }}>



            <Grid item xs={12}>
                <Typography component={'h1'} sx={{ color: '#000000' }}>User Form</Typography>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                <Typography component={'label'} htmlFor="name">Name</Typography>
                <input type="text" id='name' name="name" value={name} onChange={e => setName(e.target.value)} />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                <Typography component={'label'} htmlFor="username">Username</Typography>
                <input type="text" id='username' name="username" value={username} onChange={e => setUsername(e.target.value)} />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                <Typography component={'label'} htmlFor="email">Email</Typography>
                <input type="text" id='email' name="email" value={email} onChange={e => setEmail(e.target.value)} />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                <Typography component={'label'} htmlFor="tp">Telephone</Typography>
                <input type="text" id='tp' name="tp" value={tp} onChange={e => setTp(e.target.value)} />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                <Typography component={'label'} htmlFor="password">Password</Typography>
                <input type="password" id='password' name="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
  <Typography component={'label'} htmlFor="type">Type</Typography>
  <select id="type" name="type" value={type} onChange={e => setType(e.target.value)} style={{ marginLeft: '8px' }}>
    <option value="Admin">Admin</option>
    <option value="User">User</option>
    <option value="Supplier">Supplier</option>
  </select>
</Grid>


            <Button
                sx={{
                    margin: 'auto',
                    marginBottom: '20px',
                    backgroundColor: '#00c6e6',
                    color: '#000000',
                    marginLeft: '15px',
                    marginTop: '20px',
                    '&:hover': {
                        opacity: '0.7',
                        backgroundColor: '#00c6e6'
                    }
                }}
                onClick={() => isEdit ? updateUser({id, name, username, email, tp, password, type }) : addUser({ name, username, email, tp, password, type })}
            >
                {isEdit ? 'Update' : 'Add'}
            </Button>
        </Grid>
    );
}

export default UserForm;
