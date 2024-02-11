import { useNavigate } from 'react-router-dom';
import TitlebarImageList from './TitlebarImageList'; 
import './App.css';



import Navbar from './Navbar';
import Footer from './Footer';


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
