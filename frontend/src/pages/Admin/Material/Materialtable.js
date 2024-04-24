import { Box, Button,  InputAdornment,  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

const Materialtable = ({rows , selectedMaterial , deleteMaterial}) =>{

    const [groupedRows, setGroupedRows] = useState([]);

    const [query,setquery] = useState("");
 
  
    //Function to group rows by name and calculate total weight for each group
    // useEffect(() => {
    //     const grouped = rows.reduce((acc, curr) => {
    //         if (!acc[curr.name]) {
    //             acc[curr.name] = { name: curr.name, totalWeight: 0, rows: [] };
    //         }
    //         acc[curr.name].totalWeight += curr.weight;
    //         acc[curr.name].rows.push(curr);
    //         return acc;
    //     }, {});

    //     setGroupedRows(Object.values(grouped));
    // }, [rows]);


    const filteredRows = rows.filter(row =>
        [row.id, row.name, row.weight, row.order, row.supplierID,row.cost,row.voucher,row.date,row.special].some(field =>
          field ? field.toString().toLowerCase().includes(query.toLowerCase()) : false
        ));

     // Function to generate PDF report
    //  const generatePDF = () => {
    //     const input = document.getElementById("material-table");

    //     html2canvas(input).then((canvas) => {
    //         const imgData = canvas.toDataURL("image/png");
    //         const pdf = new jsPDF();
    //         const imgHeight = (canvas.height * 208) / canvas.width;
    //         pdf.addImage(imgData, 0, 0, 208, imgHeight);
    //         pdf.save("material-table-report.pdf");
    //     });
    // };
  
    const headers = [
       
        { label: "Id", key: "id" },
        { label: "Name", key: "name" },
        { label: "Weight", key: "weight" },
        { label: "Order", key: "order" },
        { label: "supplierID (gram)", key: "supplierID  " },
        { label: "cost", key: "cost" },
        { label: "voucher ", key: "voucher" },
        { label: "date", key: "date" },
        { label: "special", key: "special" }
      ];
    
    const csvReport = {
        data: rows,
        headers: headers,
        filename: "material_report.csv"
      };

    


    
return(

   // <TableCell  sx={{textAlign:"center"}}>Type</TableCell>
   //<TableCell  sx={{textAlign:"center"}} component='th' scope="row" >{row.type}</TableCell>
<Box 
sx={{
    width: '100%',
           
    
}}>

{/* <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{textAlign:"center"}}>Name</TableCell>
                        <TableCell sx={{textAlign:"center"}}>Total Weight</TableCell>
                        <TableCell sx={{textAlign:"center"}}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {groupedRows.map(group => (
                        <TableRow key={group.name}>
                            <TableCell sx={{textAlign:"center"}}>{group.name}</TableCell>
                            <TableCell sx={{textAlign:"center"}}>{group.totalWeight}</TableCell>
                            <TableCell sx={{textAlign:"center"}}>
                              
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> */}
  
        
  {/* <Button variant="contained" color="primary"  
            sx={{ 
                mt: 2, 
                minWidth: 200, 
                display :'flex',
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
               Generate Report</CSVLink>

    </Button> */}
       
           
           

            

       <TableContainer component={Paper}>
        <Box sx={{ display: 'flex',  alignItems: 'center', justifyContent:'center'}}>
       <Box sx={{ display: 'flex',  alignItems: 'center',justifyContent : 'space-between' , width:'97%' ,marginTop:'30px', marginBottom:'20px'}}>
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

            {/* <Paper elevation={3} sx={{
                
             
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center',            
                borderRadius: '10px',
                width: 260,
                height: 20,
                padding: '20px'
            }}> */}
               
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

                   
          
        >
          
     
                    <CSVLink
                        {...csvReport}
                        style={{
                            textDecoration: 'none',
                            color: 'inherit'
                        }}
                    >
Download CSV Report                    </CSVLink>
                </Button>
          
        </Box>
        </Box>
        {/* <Box sx={{
                
                
            }}>

       <TextField
                                sx={{
                                    borderRadius: '20px',
                                    marginLeft: 20,
                                    width: 350,
                                    textAlign: 'center',
                                    marginTop : 5,
                                    marginBottom : 2,
                                }}
                                label="Search"
                                value={query}
                                onChange={e => setquery(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <search sx={{ fontSize: '2rem', borderRadius: '50%' }} />
                                    </InputAdornment>
                                    )
                                }}
                                />
        
          
            <Paper elevation={3} sx={{ 
          ml:'79%',
          mt:-40,
          display: 'flex', 
          flexDirection: 'column', 
          marginBottom : 20,
          borderRadius: '20px', 
          width: 250, 
          height: 180,
          padding: '20px' // Add padding for better appearance
        }}>
  <Button  
            sx={{
              mt:3,
              justifySelf: 'center',
              alignSelf:'center',
             
              
              color: "white", // Change text color to white for better contrast
              fontWeight: 'bold', // Change fontStyle to fontWeight
              fontSize: 14, // Increase font size for better readability
              borderRadius: '40px', 
              width: '10 ', // Adjust button width for better proportion
              backgroundColor: '#1565c0', // Change button color to a darker shade of blue
              '&:hover': {
                backgroundColor: '#0d47a1', 
              },
            }} 
          >
            <CSVLink 
              {...csvReport} 
              style={{ 
                textDecoration: 'none', // Remove underline from CSV link
                color: 'inherit' // Inherit text color from parent button
              }}
            >
              Generate Report
            </CSVLink>
          </Button>
          </Paper>
                
               
          </Box> */}
                                
                <Table>
                   
                
                    <TableHead sx={{ backgroundColor: '#1565c0' }}>

                    
                    
                    <TableRow >
                            
                            
                            <TableCell sx={{textAlign:"center" , color: '#fff', fontWeight: 'bold'}}>ID</TableCell>
                            <TableCell  sx={{textAlign:"center" , color: '#fff', fontWeight: 'bold'}}>Name</TableCell>
                            
                            <TableCell sx={{textAlign:"center" , color: '#fff', fontWeight: 'bold'}}>Weight</TableCell>
                            <TableCell  sx={{textAlign:"center" , color: '#fff', fontWeight: 'bold'}}>Order ID</TableCell>
                            <TableCell  sx={{textAlign:"center" , color: '#fff', fontWeight: 'bold'}}>Supplier ID</TableCell>
                            <TableCell  sx={{textAlign:"center" , color: '#fff', fontWeight: 'bold'}}>Cost</TableCell>
                            <TableCell  sx={{textAlign:"center" , color: '#fff', fontWeight: 'bold'}}>Voucher No</TableCell>
                            <TableCell  sx={{textAlign:"center" , color: '#fff', fontWeight: 'bold' }}>Date</TableCell>
                            <TableCell  sx={{textAlign:"center" , color: '#fff', fontWeight: 'bold'}}>Special Note</TableCell>
                            <TableCell  sx={{textAlign:"center" , color: '#fff', fontWeight: 'bold'}}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {  filteredRows.length > 0 ? filteredRows.map(row => (
                                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th':{border: 0}}}> 
                                                    <TableCell  sx={{textAlign:"center"}} component='th' scope="row" >{row.id}</TableCell>
                                                    <TableCell  sx={{textAlign:"center"}} component='th' scope="row" >{row.name}</TableCell>
                                                    
                                                    <TableCell  sx={{textAlign:"center"}} component='th' scope="row" >{row.weight}</TableCell>
                                                    <TableCell  sx={{textAlign:"center"}} component='th' scope="row" >{row.order}</TableCell>
                                                    <TableCell  sx={{textAlign:"center"}} component='th' scope="row" >{row.supplierID}</TableCell>
                                                    <TableCell  sx={{textAlign:"center"}} component='th' scope="row" >{row.cost}</TableCell>
                                                    <TableCell  sx={{textAlign:"center"}} component='th' scope="row" >{row.voucher}</TableCell>
                                                    <TableCell  sx={{textAlign:"center"}} component='th' scope="row" >{row.date}</TableCell>
                                                    <TableCell  sx={{textAlign:"center"}} component='th' scope="row" >{row.special}</TableCell>
                                                    <TableCell  sx={{textAlign:"center"}} >
                                                        <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                    <Button 
                                                    startIcon={<EditIcon/>}
                                                    sx={{ margin:'0px 10 px' ,ml:2,
                                                                borderRadius: '10px',
                                                                backgroundColor: '#FFD700',
                                                                    color: '#000',
                                                                    '&:hover': {
                                                                backgroundColor: '#FFC107',
                                                            },}}
                                                                
                                                            onClick={() => selectedMaterial({id: row.id, name: row.name, 
                                                            /*type: row.type,*/ weight: row.weight, order: row.order, supplierID: row.supplierID,
                                                        cost: row.cost,voucher: row.voucher, date:row.date ,special: row.special})
                                                     }
                                                        
                                                        >
                                                            update
                                                        </Button>
                                                        <Button 
                                                        startIcon={<DeleteIcon/>}
                                                        sx={{ margin:'0px 10 px' ,ml:2,
                                                                borderRadius: '10px',
                                                                backgroundColor: '#FF0000', // Red color
                                                                color: '#FFF', // White text color
                                                                '&:hover': {
                                                                backgroundColor: '#B71C1C',} }}
                                                            onClick={() => deleteMaterial({id: row.id})}
                                                            
                                                        >
                                                            delete
                                                        </Button>
                                                        </Box>

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
export default Materialtable;