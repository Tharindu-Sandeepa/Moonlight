import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const newMaterialTable = ({ rows, selectedNewMaterial, deleteNewMaterial}) => {
    return (
        <Box sx={{ width: '100%' }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#1565c0' }}>
                        <TableRow>
                            <TableCell sx={{ textAlign: "center", color: '#fff', fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell sx={{ textAlign: "center", color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ textAlign: "center", color: '#fff', fontWeight: 'bold' }}>Weight</TableCell>
                            <TableCell sx={{ textAlign: "center", color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell sx={{ textAlign: "center" }}>{row.id}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{row.name}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{row.weight}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>
                                    <Button
                                        onClick={() => selectedNewMaterial(row)}
                                        variant="contained"
                                        color="primary"
                                        startIcon={<EditIcon />}
                                        sx={{ margin: '0px 10px', borderRadius: '10px', backgroundColor: '#FFD700', color: '#000', '&:hover': { backgroundColor: '#FFC107' } }}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        onClick={() => deleteNewMaterial({id:row.id})}
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<DeleteIcon />}
                                        sx={{ margin: '0px 10px', borderRadius: '10px', backgroundColor: '#FF0000', color: '#FFF', '&:hover': { backgroundColor: '#B71C1C' } }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default newMaterialTable;



