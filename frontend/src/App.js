import { useNavigate } from 'react-router-dom';
import TitlebarImageList from './homepage/TitlebarImageList'; 
import './App.css';



import Navbar from './homepage/Navbar';
import Footer from './homepage/Footer';


function App() {

  const navigate = useNavigate();

  return (
    <div className="App">
      <Navbar />
      <TitlebarImageList />
     
<Footer/>
      
        
     
      
    </div>
  );
}

export default App;
