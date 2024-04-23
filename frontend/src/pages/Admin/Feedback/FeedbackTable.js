import React, { useState } from "react";
import { Box, Button, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, } from "@mui/material";
import { CSVLink } from 'react-csv';
import Search from '@mui/icons-material/Search';
import { Navigate } from "react-router-dom";



const FeedbackTable = ({ rows, selectedFeedback, deleteFeedback }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredRows = rows.filter(row =>
        (row.name && row.name.toLowerCase().includes(searchQuery.toLowerCase())) 
        //(row.Jewelry_Name && row.Jewelry_Name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const csvHeaders = [
        { label: 'ID', key: 'id' },
        { label: 'User_ID', key: 'User_ID' },
        { label: 'Name', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Jewelry_ID', key: 'Jewelry_ID' },
        { label: 'Jewelry_Name', key: 'Jewelry_Name' },
        { label: 'Rating', key: 'rating' },
        { label: 'Feedback', key: 'feedback' },
    ];

    const csvData = filteredRows.map(row => ({
        id: row.id,
        User_ID: row.User_ID,
        name: row.name,
        email: row.email,
        Jewelry_ID: row.Jewelry_ID,
        Jewelry_Name: row.Jewelry_Name,
        rating: row.rating,
        feedback: row.feedback,
    }));

    const totalFeedbackCount = filteredRows.length;

    return (
        <div>
            <Typography variant="h4" sx={{ flex: 1, color: '#000000', marginLeft: 5, textAlign: 'center',fontWeight: 'bold', marginTop: '20px' }}>Admin View Feedback</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', marginTop: '20px' }}>
                <TextField
                    sx={{
                        borderRadius: '20px',
                        marginLeft: 12,
                        width: 350,
                        textAlign: 'center'
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
                <Paper elevation={3} sx={{
                    boxShadow: 5,
                    borderRadius: '20px',
                    width: 250,
                    height: 80,
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 'auto', // Push the button to the right
                    marginRight: '20px' // Add margin to the right for consistent spacing
                }}>
                    <CSVLink
                        data={csvData}
                        headers={csvHeaders}
                        filename={"feedback_data.csv"}
                        style={{ textDecoration: 'none' }}
                    >
                        <Button sx={{
                            color: "white",
                            fontWeight: 'bold',
                            fontSize: 14,
                            borderRadius: '40px',
                            backgroundColor: '#1565c0',
                            '&:hover': {
                                backgroundColor: '#0d47a1',
                            },
                        }}>Generate CSV</Button>
                    </CSVLink>
                </Paper>

                <Paper elevation={3} sx={{ padding: '20px', margin: '20px auto', width: 'fit-content' }}>
                    <Typography variant="h6">Total Feedbacks: {totalFeedbackCount}</Typography>
                </Paper>
            </Box>


            <TableContainer component={Paper} sx={{ margin: '20px auto', maxWidth: '90vw' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#1565c0' }}>
                        <TableRow>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>User_ID</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Jewelry_ID</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Jewelry_Name</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Rating</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Feedback</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            filteredRows.length > 0 ? filteredRows.map(row => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.User_ID}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.Jewelry_ID}</TableCell>
                                    <TableCell>{row.Jewelry_Name}</TableCell>
                                    <TableCell>{row.rating}</TableCell>
                                    <TableCell>{row.feedback}</TableCell>
                                    <TableCell>
                                        <Button
                                            sx={{
                                                borderRadius: '20px',
                                                backgroundColor: '#FF0000',
                                                color: '#FFF',
                                                '&:hover': {
                                                    backgroundColor: '#B71C1C',
                                                },
                                                marginTop: '8px' // Adjust vertical alignment
                                            }}
                                            onClick={() => deleteFeedback({ id: row.id })}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )) :
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell colSpan={9}>No Data</TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
}

export default FeedbackTable;
