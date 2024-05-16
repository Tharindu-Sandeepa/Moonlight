import React, { useState } from "react";
import {
    Button,
    Typography,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Select,
    MenuItem
} from "@mui/material";
import { CSVLink } from "react-csv";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import Search from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const OrdersTable = ({ rows, selectOrder, deleteOrder }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    const headers = [
        { label: "Order ID", key: "orderID" },
        { label: "User ID", key: "userID" },
        { label: "Items", key: "items" },
        { label: "Total", key: "total" },
        { label: "Amount", key: "amount" },
        { label: "Date", key: "date" },
        { label: "Slip", key: "slip" },
        { label: "Status", key: "status" }
    ];

    // Filter rows by search query and status
    const filteredRows = rows.filter(row =>
        [row.orderID, row.userID, row.items, row.total, row.amount, row.date, row.slip, row.status].some(field =>
            field ? field.toString().toLowerCase().includes(searchQuery.toLowerCase()) : false
        )
    ).filter(row => {
        if (filterStatus === "") {
            return true;
        } else {
            return row.status === filterStatus;
        }
    });
 
    // Calculate total number of orders
    const totalOrders = rows.length;

    // CSV report 
    const csvReport = {
        data: filteredRows,
        headers: headers,
        filename: "order_report.csv"
    };

    // Function to generate PDF report
    const generatePDFReport = () => {
        const doc = new jsPDF();

        // Add a title
        doc.setFontSize(16);
        doc.text("Order Details Report", 14, 20);

        // Create table data
        const tableData = filteredRows.map(row => [
            row.orderID,
            row.userID,
            row.items,
            row.total,
            row.amount,
            row.date,
            row.status
        ]);

        // Add the table to the document
        doc.autoTable({
            startY: 30,
            head: [headers.map(header => header.label)],
            body: tableData
        });

        // Save the PDF
        doc.save("order_report.pdf");
    };

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Paper elevation={3} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    ml: 4,
                    mb: 18,
                    mt: -22.5,
                    justifyContent: 'center',
                    borderRadius: '20px',
                    width: 250,
                    height: 180,
                    padding: '20px'
                }}>
                    <ShoppingCartIcon sx={{ fontSize: 40, color: '#1565c0' }} />
                    <Typography variant="h6" sx={{ alignSelf: 'center', color: '#1565c0', fontWeight: 'bold' }}>Total Orders</Typography>
                    <Typography variant="h5" sx={{ alignSelf: 'center', color: '#1565c0', fontWeight: 'bold' }}>{totalOrders}</Typography>
                </Paper>

                <Paper elevation={3} sx={{
                    ml: '70%',
                    mt: -41,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '20px',
                    width: 250,
                    height: 180,
                    padding: '20px'
                }}>
                    <ShoppingCartIcon sx={{ fontSize: 40, color: '#1565c0' }} />
                    <Button
                        sx={{
                            mt: -1,
                            justifySelf: 'center',
                            alignSelf: 'center',
                            color: "white",
                            fontWeight: 'bold',
                            fontSize: 12,
                            borderRadius: '40px',
                            width: '80%',
                            height: '35%',
                            backgroundColor: '#1565c0',
                            '&:hover': {
                                backgroundColor: '#0d47a1',
                            },
                        }}
                    >
                        <CSVLink
                            {...csvReport}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit'
                            }}
                        >
                            Generate Report (CSV)
                        </CSVLink>
                    </Button>

                    {/* Button to generate PDF report */}
                    <Button
                        sx={{
                            mt: 0.7,
                            justifySelf: 'center',
                            alignSelf: 'center',
                            color: "white",
                            fontWeight: 'bold',
                            fontSize: 12,
                            borderRadius: '40px',
                            width: '80%',
                            height: '35%',
                            backgroundColor: '#1565c0',
                            '&:hover': {
                                backgroundColor: '#0d47a1',
                            },
                        }}
                        onClick={generatePDFReport}
                    >
                        Generate Report (PDF)
                    </Button>
                </Paper>

                <Paper sx={{ p: 3, mt: 5, display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ mt: 2 }} variant="h6">Status:
                        <Select
                            value={filterStatus}
                            label="Status"
                            onChange={e => setFilterStatus(e.target.value)}
                            sx={{
                                width: '150px',
                                borderRadius: '20px',
                                marginLeft: '20px'
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Confirm">Confirm</MenuItem>
                            <MenuItem value="Processing">Processing</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                        </Select>

                        <TextField
                            sx={{
                                borderRadius: '20px',
                                marginLeft: 20,
                                width: 350,
                                textAlign: 'center'
                            }}
                            label="Search"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search sx={{ fontSize: '2rem', borderRadius: '50%' }} />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Typography>

                    <Paper elevation={3} style={{ marginTop: '20px' }}>
                        <TableContainer>
                            <Table>
                                <TableHead sx={{ backgroundColor: '#1565c0' }}>
                                    <TableRow>
                                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Order ID</TableCell>
                                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>User ID</TableCell>
                                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Items</TableCell>
                                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Total</TableCell>
                                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Amount</TableCell>
                                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Date</TableCell>
                                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Slip</TableCell>
                                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Status</TableCell>
                                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredRows.length > 0 ? (
                                        filteredRows.map(row => (
                                            <TableRow key={row._id}>
                                                <TableCell>{row.orderID}</TableCell>
                                                <TableCell>{row.userID}</TableCell>
                                                <TableCell>{row.items}</TableCell>
                                                <TableCell>{row.total}</TableCell>
                                                <TableCell>{row.amount}</TableCell>
                                                <TableCell>{row.date}</TableCell>
                                                <TableCell>
                                <img
                                    src={row.slip}
                                    alt={row.name}
                                    style={{ width: '90px', height: '80px' }}
                                />
                            </TableCell>
                                                <TableCell>{row.status}</TableCell>
                                                <TableCell>
                                                <Button 
                                onClick={() => selectOrder({ id: row._id, userID: row.userID, orderID: row.orderID, items: row.items, total: row.total, amount: row.amount, date: row.date, slip: row.slip, status: row.status })}
                                sx={{
                                    borderRadius: '20px',
                                    backgroundColor: '#FFD700', // Yellow color
                                    color: '#000', // Black text color
                                    '&:hover': {
                                    backgroundColor: '#FFC107', // Darker yellow color on hover
                                    },
                                }}
                            >
                                Update
                            </Button>
                                                    <Button 
                                onClick={() => deleteOrder({ id: row._id })}
                                sx={{
                                    ml:2,
                                    borderRadius: '20px',
                                    backgroundColor: '#FF0000', // Red color
                                    color: '#FFF', // White text color
                                    '&:hover': {
                                    backgroundColor: '#B71C1C', // Darker red color on hover
                                    },
                                }}
                            >
                                Delete
                            </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={9} sx={{ color: '#000' }}>No data!</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Paper>
            </div>
        </ThemeProvider>
    );
}

export default OrdersTable;
