import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';

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
  const [cart, setCart] = useState([]);

  // useEffect to retrieve user details from cookies when the component mounts
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

  // Functions to manage the cart
  const addItemToCart = (item) => {
    setCart((prev) => [...prev, { ...item, qty: 1 }]);
    toast.success('Item added');
    console.log(cart);
  };

  const removeItemFromCart = (item) => {
    setCart((prev) => prev.filter((it) => it._id !== item._id));
  };

  const addQty = (id) => {
    const index = cart.findIndex((it) => it._id === id);
    if (index === -1) return;
    const updatedItem = { ...cart[index], qty: cart[index].qty + 1 };
    const updatedCart = [...cart];
    updatedCart[index] = updatedItem;
    setCart(updatedCart);
    console.log(updatedCart);
  };

  const removeQty = (id) => {
    const index = cart.findIndex((it) => it._id === id);
    if (index === -1) return;

    if (cart[index].qty === 1) {
      const updatedCart = cart.filter((item) => item._id !== id);
      setCart(updatedCart);
      console.log(updatedCart);
      return;
    }

    const updatedItem = { ...cart[index], qty: cart[index].qty - 1 };

    const updatedCart = [...cart];
    updatedCart[index] = updatedItem;

    setCart(updatedCart);

    console.log(updatedCart);
  };

  // Create the context value to be provided to children
  const contextValue = {
    username,
    token,
    type,
    user,
    cart,
    addItemToCart,
    removeItemFromCart,
    addQty,
    removeQty,
  };

  // Provide the context to children
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
