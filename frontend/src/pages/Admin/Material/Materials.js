import { useEffect, useState } from "react"; 
import Materialtable from "./Materialtable";
import  Axios  from "axios";    
import { Box, Button, Paper } from "@mui/material";
import Maddform from "./Maddform";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ReorderIcon from '@mui/icons-material/Reorder';
import Dashboard from '../Dashboard';






const Materials = () =>{
    
            const[materials, setMaterials] = useState([]);
            const [submitted , setSubmitted]  = useState(false); 
            const [selectedMaterial , setSelectedMaterial] = useState({});
            const [isEdit , setIsEdit] =   useState(false); 
            const [showForm, setShowForm] = useState(false);


    useEffect(() => {
            getMaterials();
            }, []);


    const getMaterials = () => {  

        Axios.get('http://localhost:5002/api/materials')

            .then(response => {             
                setMaterials(response.data?.response || [] );
            })
            .catch(error => {
                console.error("Axios Error : " , error);
            })
    }


    const addMaterials = (data) =>{

        setSubmitted(true);

        const payload = {
                id: data.id ,
                name: data.name ,
            //   type : data.type,
                weight : data.weight,
                order : data.order,
                supplierName : data.supplierName,
                cost : data.cost,
                voucher :data.voucher,
                date : data.date,
                special : data.special,          
            
        }

        Axios.post('http://localhost:5002/api/addmaterial' , payload)
            
            .then(() => {
                getMaterials();
                setSubmitted(false);
                setShowForm(false);
            })
            .catch(error => {
                console.error("Axios Error : " ,error);
            })
    }


    const updateMaterial = (data) => {

        setSubmitted(true);

        const payload = {
            id: data.id ,
            name: data.name ,
        // type : data.type,
            weight : data.weight,
            order : data.order,
            supplierName : data.supplierName,
            cost : data.cost,
            voucher :data.voucher,
            date : data.date,
            special : data.special,          
        
    }

    Axios.post('http://localhost:5002/api/updatematerial' , payload)
            
    .then(() => {
        getMaterials();
        setSubmitted(false);
        setIsEdit(false);
        setShowForm(false);
    })
    .catch(error => {
        console.error("Axios Error : " ,error);
    })


    }


    const deleteMaterial = (data) => {

    

    /*  const payload = {
                id: data.id ,
                name: data.name ,
                type : data.type,
                weight : data.weight,
                order : data.order,
                supplierID : data.supplierID,
                cost : data.cost,
                voucher :data.voucher,
                date : data.date,
                special : data.special,          
            
        }*/

        Axios.post('http://localhost:5002/api/deletematerial' , data)
            
            .then(() => {
                getMaterials();
                
            })
            .catch(error => {
                console.error("Axios Error : " ,error);
            })

    }   



    return(

        <Dashboard title="Material Management">

        <Box sx={{
          
            margin: 'auto',
             marginTop: '10px',
            display: 'flex',
            flexDirection : 'column',
         
        //    alignItems :'center',
        //    justifyContent :'center'
            
        }}>
            

            <Box sx={{
                
                 margin: 'auto',

                 display: 'flex',
                
                 alignItems:'center',
                 justifyContent :'center',
                 marginBottom:3,
            }}>

            {!showForm && (
                <Paper elevation={3} sx={{   //  sx for the button env to add material entry
                    marginBottom: 2,
                    borderRadius: '20px',
                    width: 250,
                    height: 180,
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column', // Set flex direction to column
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ReorderIcon  sx={{ marginBottom: '10px',fontSize:40, color: '#1565c0' }} />
                    <Button  
                    onClick={() => { setShowForm(true); setSelectedMaterial(null); }}
                    sx={{                          // sx for button
                       
                        justifySelf: 'center',
                        alignSelf:'center',
                        color: "white", 
                        fontWeight: 'bold', 
                        fontSize: 14, 
                        borderRadius: '10px', 
                     //   width: '50%', 
                        backgroundColor: '#1565c0', 
                        '&:hover': {
                        backgroundColor: '#0d47a1', 
                        },
                    }} 
                    >
                    Add New Entry
                    </Button>
                </Paper>
                
            )}
            
            {showForm && (

            // <Paper elevation={3} sx={{   
                
            //     borderRadius: '20px',
            //     width: 1000,
            //     height : 550,
            //     padding: '20px',
            //     display: 'flex',
            //     alignItems: 'center',
              
            //     justifyContent: 'center'
            //       }}>
                <Maddform  
                
                addMaterials = {addMaterials}
                updateMaterial ={updateMaterial}
                submitted  = {submitted}
                data = {selectedMaterial}
                isEdit ={isEdit}
            
            />
           // </Paper>
            
            )}
            
            
            </Box>
        
            <Materialtable 
                rows={materials}
                selectedMaterial ={data =>   {
                    setSelectedMaterial(data);
                    setIsEdit(true);
                    setShowForm(true);
                }   }
                deleteMaterial ={data => window.confirm('Are you Sure? ')  && deleteMaterial(data)}
            
            />
            

        </Box>
        </Dashboard>

    );

}
export default Materials; 