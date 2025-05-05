import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const InquiryTable = ({ inquiries, deleteInquiry }) => {

    const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(null);

    const handleDeleteConfirmation = (id) => {
        setDeleteId(id);
        setOpenDeleteAlert(true);
    };

    const handleCloseDeleteAlert = () => {
        setOpenDeleteAlert(false);
    };

    const handleConfirmDelete = () => {
        deleteInquiry(deleteId);
        setOpenDeleteAlert(false);
    };

    return (

        <>
        <TableContainer component={Paper} sx={{ borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 255, 0.5)' }}>
            <Table sx={{ minWidth: 100 }} aria-label="caption table">
                <TableHead sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Message</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {inquiries.map((inquiry) => (
                        <TableRow key={inquiry._id}>
                            <TableCell>{inquiry.name}</TableCell>
                            <TableCell>{inquiry.email}</TableCell>
                            <TableCell>{inquiry.message}</TableCell>
                            <TableCell>
                                <Button 
                                    sx={{   
                                        margin: '0px 10px',
                                        textAlign: 'center'}}
                                    onClick={() => handleDeleteConfirmation(inquiry._id)} // Pass the ID to deleteInquiry
                                    startIcon={<DeleteOutlinedIcon />}
                                >
                                    Delete                        
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        <Dialog
                open={openDeleteAlert}
                onClose={handleCloseDeleteAlert}
                PaperProps={{
                    sx: {
                        backgroundColor: 'rgba(255, 0, 0, 0.8)',
                        boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
                        backdropFilter: 'blur(5px)',
                    }
                }}
            >
                <DialogTitle sx={{ color: 'white' }}>Delete Inquiry</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: 'white' }}>
                        Are you sure you want to delete this inquiry?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button 
        onClick={handleCloseDeleteAlert} 
        sx={{ 
            color: 'white',
            borderRadius: '8px',
            border: '1px solid white',
            padding: '8px 20px',
            transition: 'background-color 0.3s',
            boxShadow: '0px 0px 10px rgba(255, 255, 255, 0)',
            '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
        }}
    >
        Cancel
    </Button>
    <Button 
        onClick={handleConfirmDelete} 
        sx={{ 
            color: 'white',
            borderRadius: '8px',
            border: '1px solid white',
            padding: '8px 20px',
            transition: 'background-color 0.3s',
            boxShadow: '0px 0px 10px rgba(255, 255, 255, 0)',
            '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
        }}
    >
        Delete
    </Button>
                </DialogActions>
            </Dialog>
        </>


    );
}

export default InquiryTable;
