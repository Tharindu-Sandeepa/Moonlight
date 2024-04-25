import { Box, Button, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CSVLink } from "react-csv";
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from 'jspdf';
import 'jspdf-autotable';






const useMaterialtable = ({rows , selecteduseMaterial , deleteUseMaterial}) =>{

    const [query,setquery] = useState("");
    
    // const materialGroups = rows.reduce((groups, row) => {
    //     if (!groups[row.useName]) {
    //         groups[row.useName] = {
    //             totalWeight: 0,
    //             rows: []
    //         };
    //     }
    //     groups[row.useName].totalWeight += row.useWeight;
    //     groups[row.useName].rows.push(row);
    //     return groups;
    // }, {});

    const filteredRows = rows.filter(row =>
        [row.useId, row.useName, row.useWeight, row.useDate, row.useReason].some(field =>
          field ? field.toString().toLowerCase().includes(query.toLowerCase()) : false
        ));

        const headers = [
       
            { label: "Id", key: "useId" },
            { label: "Name", key: "useName" },
            { label: "Weight", key: "useWeight" },
           
            { label: "Date", key: "useDate" },
            { label: "Reason", key: "useReason" }
          ];
        
        const csvReport = {
            data: rows,
            headers: headers,
            filename: "material_use_report.csv"
          };


          const generatePDFReport = () => {
            const doc = new jsPDF();
    
            // Add a title
            doc.setFontSize(16);
            doc.text("Use Material Details Report", 14, 20);
    
            // Create table data
            const tableData = filteredRows.map(row => [
                row.useId,
                row.useName,
                row.useWeight,
                row.useDate,
                row.useReason
    
            ]);
    
            // Add the table to the document
            doc.autoTable({
                startY: 30,
                head: [headers.map(header => header.label)],
                body: tableData
            });
    
            // Save the PDF
            doc.save("USe_material_report.pdf");
        };
        

return(

    // <TableCell  sx={{textAlign:"center"}}>Type</TableCell>
    //   <TableCell  sx={{textAlign:"center"}} component='th' scope="row" >{row.useType}</TableCell>
    <Box
        sx={{
            width:'100%'
        }}>
        {/* <Box>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{textAlign:"center"}}>Material Name</TableCell>
                        <TableCell sx={{textAlign:"center"}}>Total Weight</TableCell>
                        <TableCell sx={{textAlign:"center"}}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(materialGroups).map(materialName => (
                        <TableRow key={materialName}>
                            <TableCell sx={{textAlign:"center"}}>{materialName}</TableCell>
                            <TableCell sx={{textAlign:"center"}}>{materialGroups[materialName].totalWeight}</TableCell>
                            <TableCell sx={{textAlign:"center"}}>
                               
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Box> */}

        
    <TableContainer component={Paper}>
    <Box sx={{ display: 'flex',  alignItems: 'center', justifyContent:'center'}}>
       <Box sx={{ display: 'flex',  alignItems: 'center',justifyContent : 'space-between' , width:'97%' ,marginTop:'30px', marginBottom:'20px' }}>  
        
        
    <TextField
                                sx={{
                                    borderRadius: '20px',
                    
                                    width: 350,
                                    textAlign: 'center',
                                    // marginTop: '10px',
                                    // marginBottom:'10px'
                                }}
                                label="Search"
                                value={query}
                                onChange={e => setquery(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ fontSize: '2rem', borderRadius: '50%' }} />
                                        <search sx={{ fontSize: '2rem', borderRadius: '50%' }} />
                                    </InputAdornment>
                                    )
                                }}
                                />
                               
                
                <Button
                        startIcon={<DownloadIcon/>}
                    sx={{
                        
                        justifySelf: 'center',
                        alignSelf: 'center',
                        color: "white",
                        fontWeight: 'bold',
                        fontSize: 14,
                        borderRadius: '5px',
                        mr:-40,
                        
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
                        Download CSV Report  
                    </CSVLink>
                </Button>

                <Button
                         startIcon={<DownloadIcon/>}
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
                        }}
                        onClick={generatePDFReport}
                    >
                        Use Material Report (PDF)
                    </Button>
          
        

                        

</Box></Box>

                <Table>
                    <TableHead sx={{ backgroundColor: '#1565c0' }}>
                        <TableRow>
                            <TableCell sx={{textAlign:"center" , color: '#fff', fontWeight: 'bold'}}>ID</TableCell>
                            <TableCell  sx={{textAlign:"center" , color: '#fff', fontWeight: 'bold'}}>Name</TableCell>
                           
                            <TableCell  sx={{textAlign:"center" , color: '#fff', fontWeight: 'bold'}}>Weight</TableCell>
                            <TableCell  sx={{textAlign:"center" , color: '#fff', fontWeight: 'bold'}}>Date</TableCell>
                            <TableCell  sx={{textAlign:"center" , color: '#fff', fontWeight: 'bold'}}>Special Note</TableCell>
                            <TableCell  sx={{textAlign:"center" , color: '#fff', fontWeight: 'bold'}}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { 
                        
                        filteredRows.length > 0 ? filteredRows.map(row => (
                                    <TableRow key={row.useId} sx={{ '&:last-child td, &:last-child th':{border: 0}}}> 
                                                    <TableCell  sx={{textAlign:"center"}} component='th' scope="row" >{row.useId}</TableCell>
                                                    <TableCell  sx={{textAlign:"center"}} component='th' scope="row" >{row.useName}</TableCell>
                                                 
                                                    <TableCell  sx={{textAlign:"center"}} component='th' scope="row" >{row.useWeight}</TableCell>
                                                    <TableCell  sx={{textAlign:"center"}} component='th' scope="row" >{row.useDate}</TableCell>
                                                    <TableCell  sx={{textAlign:"center"}} component='th' scope="row" >{row.useReason}</TableCell>
                                                    <TableCell  sx={{textAlign:"center"}} >
                                                    <Button 
                                                     startIcon={<EditIcon/>}
                                                     sx={{ margin:'0px 10 px' ,ml:2,
                                                                borderRadius: '20px',
                                                                backgroundColor: '#FFD700',
                                                                color: '#000',
                                                                '&:hover': {
                                                            backgroundColor: '#FFC107',} }}
                                                                
                                                            onClick={() => selecteduseMaterial({useId: row.useId, useName: row.useName, 
                                                                /*useType: row.useType,*/ useWeight: row.useWeight,
                                                                 useDate:row.useDate ,useReason: row.useReason})} 
                                                        
                                                        >
                                                            update
                                                        </Button>
                                                        <Button 
                                                        startIcon={<DeleteIcon/>}
                                                        sx={{ margin:'0px 10 px' ,ml:2,
                                                                borderRadius: '20px',
                                                                backgroundColor: '#FF0000', // Red color
                                                                color: '#FFF', // White text color
                                                                '&:hover': {
                                                                backgroundColor: '#B71C1C',} }}
                                                            onClick={() => deleteUseMaterial({useId: row.useId})}
                                                        >
                                                            delete
                                                        </Button>
                                                        

                                                    </TableCell>
                                        </TableRow>   


                                    ) ) :(
                                        <TableRow  sx={{ '&:last-child td, &:last-child th':{border: 0}}}> 

                                            <TableCell component='th' scope="row" >No data</TableCell>
                                        </TableRow>
                                        
                                    )

                        }
                        
                    </TableBody>
                </Table>


    </TableContainer>
    </Box>
)

}
export default useMaterialtable;