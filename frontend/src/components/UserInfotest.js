import React, { useEffect, useState } from 'react';
//this code is for get the user details from anyware. 
const UserInfo = () => {
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        // Retrieve username and token from local storage
        const storedUsername = localStorage.getItem('username');
        const storedToken = localStorage.getItem('token');
        
        // Update state with retrieved values
        setUsername(storedUsername || 'No username found');
        setToken(storedToken || 'No token found');
    }, []);

    return (
        <div>
            <h2>User Information</h2>
            <p>Username: {username}</p>
            <p>Token: {token}</p>
        </div>
    );
};

export default UserInfo;
