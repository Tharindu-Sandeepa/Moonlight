import React, { useState } from "react";
import { Button, Card, CardContent, InputAdornment, TextField, Typography } from "@mui/material";
import Search from '@mui/icons-material/Search';

const UserView = ({ rows, selectedFeedback, deleteFeedback }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredRows = rows.filter(row =>
        (row.Jewelry_Name && row.Jewelry_Name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div>
            <Typography variant="h5" sx={{fontWeight: 'bold', color: '#4643FF', marginBottom: '20px', marginTop: '80px', textAlign: 'center' }}>Previous Feedbacks</Typography>
            <TextField
                sx={{
                    borderRadius: '20px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '80%',
                    maxWidth: 350,
                    textAlign: 'center',
                    marginBottom: '20px',
                    '@media (min-width: 600px)': {
                        width: 'auto',
                        maxWidth: 'none',
                        marginLeft: 76,
                        marginRight: 50,
                    },
                }}
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search sx={{ fontSize: '2rem', borderRadius: '50%' }} />
                        </InputAdornment>
                    )
                }}
            />

            {filteredRows.map(row => (
                <Card key={row.id} sx={{ 
                    position: 'relative', 
                    marginBottom: '20px', 
                    marginLeft: '40px', 
                    marginRight: '40px',
                    borderRadius: '20px',
                    backgroundColor: '#f0f0f0',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 12px rgba(0,0,0,0.2)',
                    },
                }}>
                    <CardContent>
                        <Typography variant="h6">{row.Jewelry_Name}</Typography>
                        <Typography>Rating: {row.rating}</Typography>
                        <Typography>Feedback: {row.feedback}</Typography>
                        <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                            <Button
                                sx={{
                                    borderRadius: '20px',
                                    backgroundColor: '#FFD700',
                                    color: '#000',
                                    '&:hover': {
                                        backgroundColor: '#FFC107',
                                    },
                                }}
                                onClick={() => selectedFeedback({ id: row.id, User_ID: row.User_ID, name: row.name, email: row.email, Jewelry_ID: row.Jewelry_ID, Jewelry_Name: row.Jewelry_Name, rating: row.rating, feedback: row.feedback })}
                            >
                                Update
                            </Button>
                            <Button
                                sx={{
                                    ml: 2,
                                    borderRadius: '20px',
                                    backgroundColor: '#FF0000',
                                    color: '#FFF',
                                    '&:hover': {
                                        backgroundColor: '#B71C1C',
                                    },
                                }}
                                onClick={() => deleteFeedback({ id: row.id })}
                            >
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default UserView;
