import { Button,Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Box ,Dialog,DialogTitle,DialogContent,DialogActions,Typography,InputAdornment,TextField } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import { CSVLink } from "react-csv";
import { useState ,useEffect } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import DiamondIcon from '@mui/icons-material/Diamond';
import SearchIcon from '@mui/icons-material/Search'




const Gemtable = ({rows, setSelectedGem, deleteGem,setIsEdit}) => {
   //const [gemCount,setGemCount] = useState(rows.length);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [gemToDelete, setGemToDelete] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRows, setFilteredRows] = useState([]);


    useEffect(() => {
        const filtered = rows.filter(
            (row) =>
                row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                row.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
                row.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredRows(filtered);
        //setGemCount(rows.length);
    }, [rows, searchQuery]);
    
 


    
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };
    

    const handleDeleteConfirmationOpen = (gem) => {
        setGemToDelete(gem);
        setDeleteConfirmationOpen(true);
    }

    const handleDeleteConfirmationClose = () => {
        setDeleteConfirmationOpen(false);
    }

    const handleDeleteConfirmed = () => {
        deleteGem({ id: gemToDelete.id });
        handleDeleteConfirmationClose();
    }
    useEffect(() => {
        if (filteredRows.length < 4 && filteredRows.length > 0) {
            alert("Total gems are less than 4.");
        }
    }, [filteredRows.length]);
    
    
   
    const headers = [
       
        { label: "Id", key: "id" },
        { label: "Gem_Name", key: "name" },
        { label: "Gem Color", key: "color" },
        { label: "Price $", key: "price" },
        { label: "Weight (carat)", key: "weight" },
        { label: "Category", key: "category" },
        { label: "Voucher Number", key: "voucherNo" },
        { label: "Supplier ID", key: "supplierId" }
      ];
    
      const csvReport = {
        data: rows,
        headers: headers,
        filename: "Gem Stock_report.csv"
      };
    



return (
    <Box sx={{
        //background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent)',
        padding: '20px',
        borderRadius: '8px',
        //boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(10px)',
        maxWidth: '1600px',
        //border: '3px solid white',
    }}>
  <div style={{ display: 'flex', justifyContent: 'space-between',alignItems: 'center',marginBottom: '10px'}}>
  <TextField
            type="text"
            placeholder="Search Gems"
            value={searchQuery}
            onChange={handleSearchInputChange}
            variant="outlined"
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#4643FF' }} />
                </InputAdornment>
                ),
                inputProps: {
                    style: {
                        color: '#ffffff', // Set the color of the placeholder text
                        paddingRight: '8px', // Adjust the right padding to make space for the icon
                        height: '10px',
                        // border:'1px solid #fff'
                    },
                },
            }}
/>
    
    <Button variant="contained" color="primary" startIcon={ <DownloadIcon/>}  
            sx={{ 
                mt: 2, 
                minWidth: 200, 
                height: '100%', 
                backgroundColor: '#4643FF', 
                border: '1px solid #ffffff', 
                boxShadow: '0 0 10px 2px #000000',
                marginBottom: '12px',
                '&:hover': {
                    backgroundColor: '#3535a9', // Change color on hover
                },
               
                }}
        >

            <CSVLink {...csvReport} style={{ textDecoration: 'none', color: 'inherit' }}>
               Generate Report
            </CSVLink>

    </Button>

    <Box  sx={{          
                        textAlign: 'center', 
                        marginBottom: '-7px',
                        minWidth: 200, 
                        height: '37px', // Set the same height as the Button
                        color: '#ffffff', 
                        backgroundColor: '#4643FF', 
                        border: '1px solid #ffffff', 
                        boxShadow: '0 0 10px 2px #000000',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '4px',
                        
                      
                        }}>
                        <DiamondIcon sx={{ marginRight: '5px',}} fontSize='medium'/>
                        <Typography variant="body1" component="p" sx={{fontSize:'14px'}}>
                            TOTAL GEMS: {filteredRows.length}
                        </Typography>    
    </Box>
</div>     
      
            <TableContainer component={Paper} sx={{ 
                backgroundImage: 'linear-gradient(to bottom, #ffffff , #ffffff)',
                 padding: '0px',
                 borderRadius: '8px',
                 boxShadow: '0px 0px 10px rgba(0, 0, 255, 0.5)', 
                 }}> 


                <Table sx={{ minWidth: 100 }} aria-label="caption table">
                    <TableHead sx={{ 
                        backgroundColor: '#f0f0f0', 
                        fontWeight: 'bold', 
                        borderBottom:'2px solid #ddd',
                        padding: '10px',
                    }} >
                        <TableRow>
                            {/* <TableCell> Id</TableCell>
                            <TableCell> Gem_Name</TableCell>
                            <TableCell> Gem Color</TableCell>
                            <TableCell> Price $</TableCell>
                            <TableCell> Weight (carat)</TableCell>                           
                            <TableCell> Category</TableCell>
                            <TableCell> Voucher Number</TableCell>
                            <TableCell> Supplier ID</TableCell> */}
                            {headers.map(header => (
                            <TableCell key={header.key}>{header.label}</TableCell>
                            ))}



                            <TableCell > Action </TableCell>
                            
        
                        </TableRow>
                    </TableHead>
                        
                    <TableBody>
                    {filteredRows.map(row => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.color}</TableCell>
                                <TableCell>{row.price}</TableCell>
                                <TableCell>{row.weight}</TableCell>
                                <TableCell>{row.category}</TableCell>
                                <TableCell>{row.voucherNo}</TableCell>
                                <TableCell>{row.supplierId}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={2}>
                                        <Button
                                            sx={{ margin: '0px 10px', textAlign: 'center' }}
                                            onClick={() => {
                                                setSelectedGem(row);
                                                setIsEdit(true);
                                            }}
                                            startIcon={<EditIcon />}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            sx={{ margin: '0px 10px', textAlign: 'center' }}
                                            onClick={() => handleDeleteConfirmationOpen(row)}
                                            startIcon={<DeleteOutlinedIcon />}
                                        >
                                            Delete
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>



            </TableContainer>

            <Dialog open={deleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
                <DialogTitle style={{ backgroundColor: '#f44336', color: '#fff' }}>Confirm Deletion</DialogTitle>
                <DialogContent style={{ color: '#333' }}>
                    Are you sure you want to delete this gemstone?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteConfirmationClose}>Cancel</Button>
                    <Button onClick={handleDeleteConfirmed} style={{ backgroundColor: '#f44336', color: '#fff' }}>Delete</Button>
                </DialogActions>
            </Dialog>
            


        </Box>
            );

}

export default Gemtable;