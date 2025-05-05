import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

const stocktable = ({ reMaterial }) => {


  return (

    <Table sx={{width:750}} style={{ borderRadius: '10px', overflow: 'hidden', borderCollapse: 'collapse' , marginLeft:'25px' , border: '2px solid #000' }}>
                
               
                    <TableHead sx={{ backgroundColor: '#1565c0' }}>

                    
                    
                    <TableRow >
                            
                            
                            <TableCell sx={{textAlign:"center" , color: '#fff', fontWeight: 'bold'}}>ID</TableCell>
                            <TableCell  sx={{textAlign:"center" , color: '#fff', fontWeight: 'bold'}}>Name</TableCell>
                            
                            <TableCell sx={{textAlign:"center" , color: '#fff', fontWeight: 'bold'}}>Weight</TableCell>
                    
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {  reMaterial.map(reMaterial => (
                                    <TableRow key={reMaterial.id} sx={{ '&:last-child td, &:last-child th':{border: 0}}}> 
                                                    <TableCell  sx={{textAlign:"center"}} component='th' scope="row" >{reMaterial.id}</TableCell>
                                                    <TableCell  sx={{textAlign:"center"}} component='th' scope="row" >{reMaterial.name}</TableCell>
                                                    
                                                    <TableCell  sx={{textAlign:"center"}} component='th' scope="row" >{reMaterial.weight}</TableCell>
                                                    
                                        </TableRow>   


                                    ) ) 

                                }
                        
                    </TableBody>
                </Table>

    // <table>
    //   <thead>
    //     <tr>


    //       <th>Material ID</th>
    //       <th>Material Name</th>
    //       <th>Weight</th>
    //     </tr>


    //   </thead>
    //   <tbody>
    //     {reMaterial.map(reMaterial => (
    //       <tr key={reMaterial.id}>
    //         <td >{reMaterial.id}</td>
    //         <td>{reMaterial.name}</td>
    //         <td>{reMaterial.weight}</td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
  );
};

export default stocktable;