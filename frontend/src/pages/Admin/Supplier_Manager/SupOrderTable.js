import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Table, Select, MenuItem, TextField, Box, InputAdornment } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const SupOrderTable = ({ rows, deletesupOrder }) => {
    const navigate = useNavigate();
    const [filterType, setFilterType] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const handleUpdateClick = (row) => {
        navigate('/edit-supply-order', { state: { selectedsupOrder: row } });
    }

    const filteredRows = rows.filter(row => (filterType === 'All' || row.type === filterType) && (row.supName.toLowerCase().includes(searchQuery.toLowerCase()) || row.description.toLowerCase().includes(searchQuery.toLowerCase())));

    return (
        <Paper elevation={5} sx={{ marginBottom: '20px' }}>
            <Paper elevation={0} sx={{ padding: '20px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <Box>
                        <Select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            sx={{ minWidth: 120 }}
                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Gem">Gem</MenuItem>
                            <MenuItem value="Material">Material</MenuItem>
                        </Select>
                    </Box>
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{ // Add InputProps with startAdornment containing the search icon
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                        sx={{ textAlign: 'center' }} // Center the TextField
                    />
                </Box>
                <TableContainer component={Paper} elevation={0}>
                    <Table sx={{ minWidth: 650 }} elevation={0}>
                        <TableHead sx={{ backgroundColor: '#1565c0', color: '#fff' }}>
                            <TableRow>
                                <TableCell sx={{ color: '#fff' }}>Supply Order ID</TableCell> {/* Set color here */}
                                <TableCell sx={{ color: '#fff' }}>Supplier Name</TableCell> {/* Set color here */}
                                <TableCell sx={{ color: '#fff' }}>Type</TableCell> {/* Set color here */}
                                <TableCell sx={{ color: '#fff' }}>Weight</TableCell> {/* Set color here */}
                                <TableCell sx={{ color: '#fff' }}>Supplier ID</TableCell> {/* Set color here */}
                                <TableCell sx={{ color: '#fff' }}>Material ID</TableCell> {/* Set color here */}
                                <TableCell sx={{ color: '#fff' }}>Gemstone ID</TableCell> {/* Set color here */}
                                <TableCell sx={{ color: '#fff' }}>Description</TableCell> {/* Set color here */}
                                <TableCell sx={{ color: '#fff' }}>Status</TableCell> {/* Set color here */}
                                <TableCell sx={{ textAlign: 'center', color: '#fff' }}>Actions</TableCell> {/* Set color here */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.length > 0 ? filteredRows.map((row, index) => (
                                <TableRow
                                    key={row.supOrdId}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        backgroundColor: index % 2 === 0 ? '#ffffff' : '#f0f0f0'
                                    }}
                                >
                                    <TableCell component='th' scope="row">{row.supOrdId}</TableCell>
                                    <TableCell>{row.supName}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.quantity}</TableCell>
                                    <TableCell>{row.supID}</TableCell>
                                    <TableCell>{row.matID}</TableCell>
                                    <TableCell>{row.gemID}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <Button
                                            sx={{
                                                borderRadius: '30px',
                                                backgroundColor: '#FFD700', // Yellow color
                                                color: '#000', // Black text color
                                                '&:hover': {
                                                  backgroundColor: '#FFC107', // Darker yellow color on hover
                                                },
                                            }}
                                            onClick={() => handleUpdateClick(row)}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            sx={{
                                                ml: 2,
                                                borderRadius: '30px',
                                                backgroundColor: '#FF0000', // Red color
                                                color: '#FFF', // White text color
                                                '&:hover': {
                                                  backgroundColor: '#B71C1C', // Darker red color on hover
                                                },
                                            }}
                                            onClick={() => deletesupOrder({ supOrdId: row.supOrdId })}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component='th' scope="row">No Data</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Paper>
    );
}

export default SupOrderTable;
 