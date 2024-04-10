import React, { useEffect, useState } from "react";
import { Box, Button ,Paper} from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import Axios from "axios";
import GroupAddIcon from '@mui/icons-material/ContactEmergency';



const Users = () => {
    const [users, setUsers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [selectUser, setSelectUser] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        Axios.get('http://localhost:5002/api/users/users')
            .then(response => {
                setUsers(response.data.response);
                setEdit(false);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }

    const addUser = (data) => {
        setSubmitted(true);
        const payload = {
           
            name: data.name,
            username: data.username,
            email: data.email,
            tp: data.tp,
            password: data.password,
            type: data.type,
        }
        Axios.post('http://localhost:5002/api/users/createuser', payload)
            .then(() => {
                getUsers();
                setSubmitted(false);
                setEdit(false);
                setShowForm(false);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }

    const updateUser = (data) => {
        setSubmitted(true);
        const payload = {
            id: data.id,
            name: data.name,
            email: data.email,
            tp: data.tp,
            username: data.username,
            password: data.password,
            type: data.type,

        }
        Axios.post('http://localhost:5002/api/users/updateuser', payload)
            .then(() => {
                getUsers();
                setSubmitted(false);
                setEdit(false);
                setShowForm(false);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }

    const deleteUser = (id) => {
        setSubmitted(true);
        Axios.post('http://localhost:5002/api/users/deleteuser', id)
            .then(() => {
                getUsers();
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }

    return (
        <Box sx={{
            width: 'calc(100% - 100px)',
            margin: 'auto',
            marginTop: 5,
            
        }}>
            {!showForm && (
                <Paper elevation={3} sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    
                     // Center content vertically
                    borderRadius: '20px', 
                    width: 250, 
                    height: 180,
                    ml:'35%',
                  
                    padding: '20px' // Add padding for better appearance
                  }}><GroupAddIcon sx={{fontSize:40, color:'#1565c0'}}/>
                    <Button  
                      onClick={() => { setShowForm(true); setSelectUser(null); }}
                      sx={{
                        mt:3,
                        justifySelf: 'center',
                        alignSelf:'center',
                        color: "white", // Change text color to white for better contrast
                        fontWeight: 'bold', // Change fontStyle to fontWeight
                        fontSize: 14, // Increase font size for better readability
                        borderRadius: '40px', 
                        width: '50%', // Adjust button width for better proportion
                        backgroundColor: '#1565c0', // Change button color to a darker shade of blue
                        '&:hover': {
                          backgroundColor: '#0d47a1', 
                        },
                      }} 
                    >
                      Add User
                    </Button>
                  </Paper>
                  
            )}
            {showForm && (
                <UserForm
                    addUser={addUser}
                    updateUser={updateUser}
                    submitted={submitted}
                    data={selectUser}
                    isEdit={isEdit}
                />
            )}
            <UsersTable
                rows={users}
                selectUser={(data) => { setSelectUser(data); setEdit(true); setShowForm(true); }}
                deleteUser={(data) => { window.confirm("Are you sure?") && deleteUser(data) }}
            />
        </Box>
    );
}

export default Users;
