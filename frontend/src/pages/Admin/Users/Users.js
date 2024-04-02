import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import Axios from "axios";




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
            marginTop: '80px'
        }}>
            {!showForm && (
                <Button onClick={() => { setShowForm(true); setSelectUser(null); }}>Add User</Button>
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
