import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './Auth/AuthContext';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Admin/AdminDashboard';

import Newum from './pages/Admin/Users/Usermanage';

import Login from './components/userComponents/Login';

import Cookies from 'js-cookie';
import Register from './components/userComponents/Register';

import MyAccount from './components/userComponents/MyAccount';
import Userinfotest from './components/userComponents/UserInfotest';
import Usermanage from './pages/Admin/Usermanage';
import Ordermanage from './pages/Admin/Orders/Orders';
import LoadingScreen from './components/LoadingScreen';

import CustomerCart from './components/orderComponents/Cart';

import SupplyOrder from './pages/Admin/Supplier_Manager/SupplyOrder';
import OrderForm from './pages/Admin/Supplier_Manager/OrderForm';
import EditSupplyOrderForm from './pages/Admin/Supplier_Manager/EditSupplyOrderForm';
import Suppliers from './pages/Admin/Supplier_Manager/Suppliers';
import AddSupplier from './pages/Admin/Supplier_Manager/AddSupplier';
import SupplierForm from './pages/Admin/Supplier_Manager/SupplierForm';

import AddItem from "./pages/Admin/Jewellry/AddItem";
import ImageGridPage from "./components/jewellryComponents/ImageGridPage";
import Itemlist from "./pages/Admin/Jewellry/jewellryManage";
import ItemPage from "./components/jewellryComponents/ItemPage"
import Footer from './components/Footer';
import UpdateImageForm from './pages/Admin/Jewellry/UpdateImageForm';
import Checkout  from './components/orderComponents/Checkout';

import Forgotpw from './components//userComponents/ForgotPassword';

import OptionPage from './components/feedbackComponents/OptionPage';
import AdminFeedbackView from './pages/Admin/Feedback/AdminFeedbackView';
import ViewFeedback from './components/feedbackComponents/ViewFeedback';

import GemImageGridPage from "./components/gemComponents/ImageGridPage";
import AddItemGem from "./pages/Admin/Gemstone/AddItem";
import GemItemlist from "./pages/Admin/Gemstone/itemlist";
import GemDashboard from './pages/Admin/Gemstone/GDashboard';
import HomePage from './components/gemComponents/HomeGem';
import Gemtable from './pages/Admin/Gemstone/gemtable';
import Gem from './pages/Admin/Gemstone/Gem';
import Inquiry from './components/gemComponents/Inquiry';
import AllInquiry from './pages/Admin/Gemstone/Allinquiry';
import SapphireHomePage from './components/gemComponents/Sapphirepage';
import Aquamarinepage from './components/gemComponents/Aquamarinepage';
import SapphireProduct from './components/gemComponents/BlueSapphirePage';
import BlueSapphireProduct from './components/gemComponents/BluesapphireProducts';
import GemItem from './components/gemComponents/GemItemPage';

import Materials from './pages/Admin/Material/Materials';
import UseMaterial from './pages/Admin/Material/useMaterial';
import MManager from './pages/Admin/Material/MManager';
import EmpHome from './pages/Admin/EmployeeComponent/EmpHome';
import AddEmployee from './pages/Admin/EmployeeComponent/addEmployee';
import ViewEmployee from './pages/Admin/EmployeeComponent/viewEmployee';
import UpdateEmployee from './pages/Admin/EmployeeComponent/updateEmployee';
import ViewAllEmployees from './pages/Admin/EmployeeComponent/viewAllEmployees';
import ReportEmployee from './pages/Admin/EmployeeComponent/reportEmployee';

import OTPVerificationPage from './components/userComponents/OTPVerificationPage';
import PasswordUpdatePage from './components/userComponents/PasswordUpdatePage';


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true); 
  const location = useLocation();
  const navigate = useNavigate();



  useEffect(() => {
    
    const storedToken = Cookies.get('token');
    
    if (storedToken) {
      setToken(storedToken);
      setLoggedIn(true);
    }
   
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const handleLogin = (userData) => {
   
    setToken(userData.token);
    setLoggedIn(true);
    
    Cookies.set('token', userData.token);
   
  };

  const handleLogout = () => {
  
    setToken('');
    setLoggedIn(false);
    
    Cookies.remove('token');
    navigate('/');
  };

  
  const renderNavbar = () => {
    const adminRoutes = ['/admin', '/newum', '/admin/Orders','/itemlist','/GDashboard','/AdminFeedbackView','/supplyorder','/mManager','/Materials','/useMaterial','/emplyee']; //  admin routes
    if (!adminRoutes.includes(location.pathname)) {
      return <Navbar loggedIn={loggedIn} username={username} onLogout={handleLogout} token={token} />;
    }
    return null;
  };

  return (
    <div>
      <ToastContainer />
      {loading ? ( // Render LoadingScreen 
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
            <Route path='/forgotpw' element={<Forgotpw />} />
            <Route path="/checkout" element={<Checkout />} />
            
            
            <Route path="/jewllery-grid" element={<ImageGridPage />} />
          <Route path="/add-jewllery" element={<AddItem />} />
          <Route path="/itemlist" element={<Itemlist />} />
          <Route path="/item/:itemId" element={<ItemPage/>} />

          <Route path='cart' element={<CustomerCart />} />
            
          
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/users" element={<Usermanage />} />
            <Route path="/admin/Orders" element={<Ordermanage />} />

            <Route path='/newum' element={<Newum />} />

            <Route path="/update-image/:id" element={<UpdateImageForm />} />
            
           

            <Route path='/supplyorder' element={<SupplyOrder />} />
            <Route path='/orderform' element={<OrderForm/>} />
            <Route path='/edit-supply-order' element={<EditSupplyOrderForm/>} />
            <Route path='/suppliers' element={<Suppliers/>} />
            <Route path='/add-supplier' element={<AddSupplier/>}/>
            <Route path='/update-supplier' element={<SupplierForm/>}/>

            <Route path='/feedback' element={<OptionPage/>}/>
      <Route path='/AdminFeedbackView' element={<AdminFeedbackView/>}/>
      <Route path='/ViewFeedback' element={<ViewFeedback/>}/>



     
            <Route path="/GDashboard" element={< GemDashboard/>} /> 
            <Route path="/gemtable" element={< Gemtable/>} />
            <Route path="/Gem" element={<Gem />} />
            <Route path="/Inquiry" element={<Inquiry />} />
            <Route path="/Allinquiry" element={<AllInquiry />} />
            <Route path="/AddGemItem" element={< AddItemGem/>} />
            <Route path="/GemItemlist" element={<GemItemlist />} />

            <Route path="/GemHome" element={< HomePage/>} />
            <Route path="/image-grid" element={<GemImageGridPage />} />
            <Route path="/components/Sapphirepage" element={< SapphireHomePage/>} />
            <Route path="/components/Aquamarinepage" element={< Aquamarinepage/>} />
            <Route path="/components/BluesapphirePage" element={< SapphireProduct/>} />
            <Route path="/components/BluesapphireProducts" element={< BlueSapphireProduct/>} />
            <Route path="/Gemitem/:itemId" element={< GemItem/>} />
      
            <Route path='/mManager' element={<MManager />}>
              </Route>

              <Route path='/Materials' element={<Materials />}>
              </Route>

              <Route path='/useMaterial' element={<UseMaterial />}>
              </Route>

         <Route path="/emplyee" element={<EmpHome />} />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/view/:id" element={<ViewEmployee />} />
        <Route path="/update/:id" element={<UpdateEmployee />} />
        <Route path="/view-all" element={<ViewAllEmployees />} />
        <Route path="/report" element={<ReportEmployee />} />

        <Route path="/otp-verification" element={<OTPVerificationPage />} />
                <Route path="/update-password" element={<PasswordUpdatePage />} />
                

      

          </Routes>
         </AuthProvider><Footer/>
        </>
      )}
       
    </div>
  );
};

export default App;
