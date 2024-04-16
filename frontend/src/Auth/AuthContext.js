import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

// Create the context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  // State to store username, token, and user data
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [type, setType] = useState('');
  const [user, setUser] = useState(null);

  // useEffect to retrieve user details from cookies when component mounts
  useEffect(() => {
    const storedUsername = Cookies.get('username') || 'No username found';
    const storedToken = Cookies.get('token') || 'No token found';
    const storedType = Cookies.get('type') || 'No type found';

    setUsername(storedUsername);
    setToken(storedToken);
    setType(storedType);

    // Fetch user data using the token
    const fetchUser = async () => {
      try {
        const config = {
          headers: {
            'token': storedToken
          }
        };
        const res = await axios.get('http://localhost:5002/api/user/myaccount', config);
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (storedToken !== 'No token found') {
      fetchUser();
    }
  }, []);

  // Value to be provided by the context
  const value = {
    username,
    token,
    type,
    user
  };

  // Return the provider with its children
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
