import { useNavigate } from 'react-router-dom';
import TitlebarImageList from './components/TitlebarImageList'; 
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Slider from './components/Slider'
import Home from './pages/Home'
import {BrowserRouter as Router , Switch ,Route } from 'react-router-dom'


function App() {

  const navigate = useNavigate();

  return (
    <div className="App">
      <Navbar />
      <Home/>
     
<Footer/>
      
        
     
      
    </div>
  );
}

export default App;
