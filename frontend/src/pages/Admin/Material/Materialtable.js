import { Box, Button, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const MaterialTable = ({ rows, selectedMaterial, deleteMaterial }) => {
    const [query, setQuery] = useState("");
    const [groupedRows, setGroupedRows] = useState([]);

    useEffect(() => {
        const grouped = rows.reduce((acc, curr) => {
            if (!acc[curr.name]) {
                acc[curr.name] = { name: curr.name, totalWeight: 0, rows: [] };
            }
            acc[curr.name].totalWeight += curr.weight;
            acc[curr.name].rows.push(curr);
            return acc;
        }, {});

        
        const groupedData = Object.values(grouped);
        setGroupedRows(groupedData);

        // Send grouped data to backend
        fetch('YOUR_BACKEND_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(groupedData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    }, [rows]);



    

    const filteredRows = rows.filter(row =>
        [row.id, row.name, row.weight, row.order, row.supplierName, row.cost, row.voucher, row.date, row.special].some(field =>
            field ? field.toString().toLowerCase().includes(query.toLowerCase()) : false
        )
    );

    const headers = [
        { label: "Id", key: "id" },
        { label: "Name", key: "name" },
        { label: "Weight", key: "weight" },
        { label: "Order", key: "order" },
        { label: "Supplier Name", key: "supplierName" },
        { label: "Cost", key: "cost" },
        { label: "Voucher", key: "voucher" },
        { label: "Date", key: "date" },
        { label: "Special Note", key: "special" }
    ];

    const csvReport = {
        data: rows,
        headers: headers,
        filename: "material_report.csv"
    };

    const generatePDFReport = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Material Details Report", 14, 20);

        const tableData = filteredRows.map(row => [
            row.id,
            row.name,
            row.weight,
            row.order,
            row.supplierName,
            row.cost,
            row.voucher,
            row.date,
            row.special
        ]);

        doc.autoTable({
            startY: 30,
            head: [headers.map(header => header.label)],
            body: tableData
        });

        doc.save("material_report.pdf");
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
                <TextField
                    sx={{ borderRadius: '20px', width: 350, textAlign: 'center' }}
                    label="Search"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ fontSize: '2rem', borderRadius: '50%' }} />
                            </InputAdornment>
                        )
                    }}
                />

                <Button
                    startIcon={<DownloadIcon />}
                    sx={{
                        justifySelf: 'center',
                        alignSelf: 'center',
                        color: "white",
                        fontWeight: 'bold',
                        fontSize: 14,
                        borderRadius: '5px',
                        backgroundColor: '#1565c0',
                        '&:hover': {
                            backgroundColor: '#0d47a1',
                        },
                        ml: 2
                    }}
                >
                    <CSVLink
                        {...csvReport}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        Download CSV Report
                    </CSVLink>
                </Button>

                <Button
                    startIcon={<DownloadIcon />}
                    sx={{
                        justifySelf: 'center',
                        alignSelf: 'center',
                        color: "white",
                        fontWeight: 'bold',
                        fontSize: 14,
                        borderRadius: '5px',
                        backgroundColor: '#1565c0',
                        '&:hover': {
                            backgroundColor: '#0d47a1',
                        },
                        ml: 2
                    }}
                    onClick={generatePDFReport}
                >
                    Generate Report (PDF)
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#1565c0' }}>
                        <TableRow>
                            <TableCell sx={{ textAlign: "center", color: '#fff', fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell sx={{ textAlign: "center", color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ textAlign: "center", color: '#fff', fontWeight: 'bold' }}>Weight</TableCell>
                            <TableCell sx={{ textAlign: "center", color: '#fff', fontWeight: 'bold' }}>Order ID</TableCell>
                            <TableCell sx={{ textAlign: "center", color: '#fff', fontWeight: 'bold' }}>Supplier ID</TableCell>
                            <TableCell sx={{ textAlign: "center", color: '#fff', fontWeight: 'bold' }}>Cost</TableCell>
                            <TableCell sx={{ textAlign: "center", color: '#fff', fontWeight: 'bold' }}>Voucher No</TableCell>
                            <TableCell sx={{ textAlign: "center", color: '#fff', fontWeight: 'bold' }}>Date</TableCell>
                            <TableCell sx={{ textAlign: "center", color: '#fff', fontWeight: 'bold' }}>Special Note</TableCell>
                            <TableCell sx={{ textAlign: "center", color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows.length > 0 ? filteredRows.map(row => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell sx={{ textAlign: "center" }} component='th' scope="row">{row.id}</TableCell>
                                <TableCell sx={{ textAlign: "center" }} component='th' scope="row">{row.name}</TableCell>
                                <TableCell sx={{ textAlign: "center" }} component='th' scope="row">{row.weight}</TableCell>
                                <TableCell sx={{ textAlign: "center" }} component='th' scope="row">{row.order}</TableCell>
                                <TableCell sx={{ textAlign: "center" }} component='th' scope="row">{row.supplierName}</TableCell>
                                <TableCell sx={{ textAlign: "center" }} component='th' scope="row">{row.cost}</TableCell>
                                <TableCell sx={{ textAlign: "center" }} component='th' scope="row">{row.voucher}</TableCell>
                                <TableCell sx={{ textAlign: "center" }} component='th' scope="row">{row.date}</TableCell>
                                <TableCell sx={{ textAlign: "center" }} component='th' scope="row">{row.special}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Button
                                            startIcon={<EditIcon />}
                                            sx={{
                                                margin: '0px 10px', ml: 2,
                                                borderRadius: '10px',
                                                backgroundColor: '#FFD700',
                                                color: '#000',
                                                '&:hover': {
                                                    backgroundColor: '#FFC107',
                                                },
                                            }}
                                            onClick={() => selectedMaterial({ id: row.id, name: row.name, weight: row.weight, order: row.order, supplierName: row.supplierName, cost: row.cost, voucher: row.voucher, date: row.date, special: row.special })}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            startIcon={<DeleteIcon />}
                                            sx={{
                                                margin: '0px 10px', ml: 2,
                                                borderRadius: '10px',
                                                backgroundColor: '#FF0000',
                                                color: '#FFF',
                                                '&:hover': {
                                                    backgroundColor: '#B71C1C',
                                                }
                                            }}
                                            onClick={() => deleteMaterial({ id: row.id })}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component='th' scope="row" colSpan={10} sx={{ textAlign: 'center' }}>No data</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TableContainer component={Paper}>
                {/* <Table>
                    <TableHead sx={{ backgroundColor: '#1565c0' }}>
                        <TableRow>
                            <TableCell sx={{ textAlign: "center", color: '#fff', fontWeight: 'bold' }}>Material Name</TableCell>
                            <TableCell sx={{ textAlign: "center", color: '#fff', fontWeight: 'bold' }}>Total Weight</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groupedRows.length > 0 ? groupedRows.map(group => (
                            <TableRow key={group.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell sx={{ textAlign: "center" }} component='th' scope="row">{group.name}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{group.totalWeight}</TableCell>
                            </TableRow>
                        )) : (
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component='th' scope="row" colSpan={2} sx={{ textAlign: 'center' }}>No data</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table> */}
            </TableContainer>
        </Box>
    );
};

export default MaterialTable;
