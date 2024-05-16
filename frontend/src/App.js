import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './Auth/AuthContext';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Admin/AdminDashboard';

import Newum from './pages/Admin/Users/Usermanage';

import Login from './components/Login';
import NewLogin from './components/NewLogin';
import Cookies from 'js-cookie';
import Register from './components/Register';

import MyAccount from './components/MyAccount';
import Userinfotest from './components/UserInfotest';
import Usermanage from './pages/Admin/Usermanage';
import Ordermanage from './pages/Admin/Ordermanage';
import LoadingScreen from './components/LoadingScreen';

import CustomerCart from './components/Cart';

import SupplyOrder from './pages/Admin/Supplier_Manager/SupplyOrder';
import OrderForm from './pages/Admin/Supplier_Manager/OrderForm';
import EditSupplyOrderForm from './pages/Admin/Supplier_Manager/EditSupplyOrderForm';
import Suppliers from './pages/Admin/Supplier_Manager/Suppliers';
import AddSupplier from './pages/Admin/Supplier_Manager/AddSupplier';
import SupplierForm from './pages/Admin/Supplier_Manager/SupplierForm';
import SupplierDashboard from './pages/Admin/Supplier/SupplierDashboard';
import SupItemTable from './pages/Admin/Supplier/SupItemTable';

import AddItem from "./pages/Admin/Jewellry/AddItem";
import ImageGridPage from "./ImageGridPage";
import Itemlist from "./pages/Admin/Jewellry/jewellryManage";
import ItemPage from "./ItemPage"
import Footer from './components/Footer';
import AddSupItem from './pages/Admin/Supplier/AddSupItem';
import UpdateSupItem from './pages/Admin/Supplier/UpdateSupItem';



const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true); // State to control loading screen
  const location = useLocation();
  const navigate = useNavigate();



  useEffect(() => {
    // Check if user is already logged in (e.g., by having a token in localStorage)
    const storedToken = Cookies.get('token');
    
    if (storedToken) {
      setToken(storedToken);
      setLoggedIn(true);
    }
    // Simulate loading for 3 seconds
    setTimeout(() => {
      setLoading(false);
    }, 4300);
  }, []);

  const handleLogin = (userData) => {
   
    setToken(userData.token);
    setLoggedIn(true);
    // Store token and username in cookie for persistent login
    Cookies.set('token', userData.token);
   
  };

  const handleLogout = () => {
  
    setToken('');
    setLoggedIn(false);
    // Clear token and username from cookie
    Cookies.remove('token');
    navigate('/');
  };

  // Render Navbar conditionally based on current route
  const renderNavbar = () => {
    const adminRoutes = ['/admin', '/admin/users', '/admin/Orders']; //  admin routes
    if (!adminRoutes.includes(location.pathname)) {
      return <Navbar loggedIn={loggedIn} username={username} onLogout={handleLogout} token={token} />;
    }
    return null;
  };

  return (
    <div>
      <ToastContainer />
      {loading ? ( // Render LoadingScreen if loading state is true
        <LoadingScreen />
      ) : (
        <>
          {renderNavbar()}
          <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} setUsername={setUsername} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/userinfotest" element={<Userinfotest />} />
            <Route path="/newLogin" element={<NewLogin onLogin={handleLogin}/>} />
            

            <Route path="/jewllery-grid" element={<ImageGridPage />} />
          <Route path="/add-jewllery" element={<AddItem />} />
          <Route path="/itemlist" element={<Itemlist />} />
          <Route path="/item/:itemId" element={<ItemPage/>} />

          <Route path='cart' element={<CustomerCart />} />
            
          
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/users" element={<Usermanage />} />
            <Route path="/admin/Orders" element={<Ordermanage />} />
            <Route path="/Newum" element={<Newum />} />


            
            <Route path='/supplyorder' element={<SupplyOrder />} />
            <Route path='/orderform' element={<OrderForm/>} />
            <Route path='/edit-supply-order' element={<EditSupplyOrderForm/>} />
            <Route path='/suppliers' element={<Suppliers/>} />
            <Route path='/add-supplier' element={<AddSupplier/>}/>
            <Route path='/update-supplier' element={<SupplierForm/>}/>
            <Route path='/supdash' element={<SupplierDashboard/>}/>
            <Route path='/itemTable' element={<SupItemTable/>}/>
            <Route path='/addSupItem' element={<AddSupItem/>}/>
            <Route path='/updateSupItem' element={<UpdateSupItem/>}/>
            
           
          </Routes>
         </AuthProvider><Footer/>
        </>
      )}
       
    </div>
  );
};

export default App;
