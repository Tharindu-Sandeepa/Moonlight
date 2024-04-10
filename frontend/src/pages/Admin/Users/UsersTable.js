import React, { useState } from "react";
import { Button, Typography, InputAdornment,Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Select, MenuItem } from "@mui/material";
import { CSVLink } from "react-csv";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import Search from '@mui/icons-material/Search';
import PeopleAltIcon from '@mui/icons-material/AccountBox';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UsersTable = ({ rows, selectUser, deleteUser }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");

  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Telephone", key: "tp" },
    { label: "Username", key: "username" },
    { label: "Type", key: "type" }
  ];

  const countUsersByType = () => {
    const counts = {};
    rows.forEach(row => {
      counts[row.type] = (counts[row.type] || 0) + 1;
    });
    return counts;
  };
  const userCounts = countUsersByType();

  const csvReport = {
    data: rows,
    headers: headers,
    filename: "user_report.csv"
  };

  const filteredRows = rows.filter(row =>
    [row.name, row.email, row.tp, row.username, row.type].some(field =>
      field ? field.toString().toLowerCase().includes(searchQuery.toLowerCase()) : false
    )
  ).filter(row => {
    if (filterType === "") {
      return true;
    } else {
      return row.type === filterType;
    }
  });

  const theme = createTheme();
  

  return (
    <ThemeProvider theme={theme}>
      <div>
      


{/* Paper displaying user counts */}
<Paper elevation={3} sx={{ 
         
         
          display: 'flex', 
          flexDirection: 'column', 
         ml:4,
         mb:18, mt:-22.5,
         
          justifyContent: 'center', // Center content vertically
          borderRadius: '20px', 
          width: 250, 
          height: 180,
          padding: '20px' // Add padding for better appearance
        }}><PeopleAltIcon sx={{fontSize:40, color:'#1565c0'}}/>  

<Typography variant="h6" sx={{alignSelf:'center', color:'#1565c0',fontWeight: 'bold'}}>Total Users</Typography>

          {Object.entries(userCounts).map(([type, count]) => (
            
            <Typography sx={{ml:3 ,fontWeight: 'bold'}} key={type}> {`${type}: ${count}`}</Typography>
          ))}

         </Paper>
        
        <Paper elevation={3} sx={{ 
          ml:'70%',
          mt:-41,
          display: 'flex', 
          flexDirection: 'column', 
          
          borderRadius: '20px', 
          width: 250, 
          height: 180,
          padding: '20px' // Add padding for better appearance
        }}><AssessmentIcon sx={{fontSize:40, color:'#1565c0'}}/>
          <Button  
            sx={{
              mt:3,
              justifySelf: 'center',
              alignSelf:'center',
              color: "white", // Change text color to white for better contrast
              fontWeight: 'bold', // Change fontStyle to fontWeight
              fontSize: 14, // Increase font size for better readability
              borderRadius: '40px', 
              width: '80%', // Adjust button width for better proportion
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
        <Paper sx={{ p:3,mt:5,  display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{mt:2}} variant="h6">Type : 
          <Select
            value={filterType}
            label="Type"
            onChange={e => setFilterType(e.target.value)}
            sx={{
              width: '150px',
              borderRadius: '20px',
              marginLeft: '20px'
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Supplier">Supplier</MenuItem>
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
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}></TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Telephone</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>UserName</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Type</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows.length > 0 ? (
                  filteredRows.map(row => (
                    <TableRow key={row._id}>
                       <TableCell><AccountCircleIcon sx={{fontSize:30,color:'#757575'}}/></TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.tp}</TableCell>
                      <TableCell>{row.username}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>
                        <Button 
                          onClick={() => selectUser({ id: row._id, name: row.name, email: row.email, tp: row.tp, username: row.username, password: row.password, type: row.type })}
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
                          onClick={() => deleteUser({ id: row._id })}
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
                    <TableCell colSpan={6} sx={{ color: '#000' }}>No data!</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper></Paper>
      </div>
    </ThemeProvider>
  );
}

export default UsersTable;
