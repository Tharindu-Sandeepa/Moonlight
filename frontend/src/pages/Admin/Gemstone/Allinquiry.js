import React, { useEffect, useState } from "react";
import Axios from "axios";
import InquiryTable from "./InquiryTable";
import lineImage from '../../../img/line1.png'
import { Box, TextField, Button, IconButton, Typography, Grid } from "@mui/material";
import { CSVLink } from "react-csv";
import SearchIcon from '@mui/icons-material/Search';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Dashboard from '../Dashboard';

const MyComponent = () => {
    const [inquiries, setInquiries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredInquiries, setFilteredInquiries] = useState([]);

    useEffect(() => {
        getInquiries();
    }, []);

    const getInquiries = () => {
        Axios.get('http://localhost:5002/api/getInquiry')
            .then((response) => {
                console.log(response.data.response);
                setInquiries(response.data?.response || []);
            })
            .catch(error => {
                console.log("Axios Error: ", error);
            });
    }

    const deleteInquiry = (id) => {
        Axios.post('http://localhost:5002/api/deleteInquiry', { id })
            .then((res) => {
                if (res.data.response.deletedCount === 1) {
                    // If deletion is successful, update the inquiries list
                    getInquiries();
                } else {
                    console.log("Failed to delete inquiry");
                }
            })
            .catch((error) => {
                console.log("Axios Error: ", error);
            });
    }

    const handleSearch = () => {
        const filtered = inquiries.filter(inquiry =>
            inquiry.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredInquiries(filtered);
    };

    const headers = [
        { label: "Name", key: "name" },
        { label: "Email", key: "email" },
        { label: "Message", key: "message" },
        // Add more headers as needed
    ];

    return (

        <Dashboard title="Gem Management">
        <div style={{ 
            display: 'flex',
            justifyContent: 'center',                    
            minHeight: '100vh',
            marginTop: '20vh',
            backgroundImage: `url(${lineImage})`,
            }}>
            <Box sx={{ maxWidth: '1000px', width: '100%', p: 2 }}>
    <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
            <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={handleSearch}>
                            <SearchIcon />
                        </IconButton>
                    )
                }}
                fullWidth
                sx={{ height: '50px' }} // Common height for all elements
            />
        </Grid>
            <Grid item xs={12} sm={4}>
                <Typography variant="body2" sx={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1976d2', color: '#FFFFFF', textAlign: 'center', borderRadius: '5px' }}>
                    Total Inquiries: {inquiries.length}
                </Typography>
            </Grid>

        <Grid item xs={12} sm={4}>
            <CSVLink
                data={filteredInquiries.length > 0 ? filteredInquiries : inquiries}
                headers={headers}
                filename={"inquiries.csv"}
                className="report-link" // Apply a custom class for styling purposes
            >
                <Button variant="contained" startIcon={<CloudDownloadIcon />} sx={{ height: '50px', width: '100%' }}>Download Report</Button>
            </CSVLink>
        </Grid>
    </Grid>
    <br/>
    <InquiryTable inquiries={filteredInquiries.length > 0 ? filteredInquiries : inquiries} deleteInquiry={deleteInquiry} />
</Box>

        </div>
        </Dashboard>
    );
}

export default MyComponent;
