import { useEffect, useState } from "react"; 
import UseMaterialform from "./useMaterialform";
import  Axios  from "axios";    
import { Box, Button, Paper } from "@mui/material";
import UseMaterialtable from './useMaterialtable';
import ReorderIcon from '@mui/icons-material/Reorder';
import Dashboard from '../Dashboard';






const useMaterial = () =>{
    
    

            const[usematerials, setuseMaterials] = useState([]);
            const [submitted , setSubmitted]  = useState(false); 
            const [selecteduseMaterial , setSelecteduseMaterial] = useState({});
            const [isEdit , setIsEdit] =   useState(false); 
            const [showForm, setShowForm] = useState(false);



    useEffect(() => {
            getUseMaterials();
            }, []);


    const getUseMaterials = () => {  

        Axios.get('http://localhost:5002/api/usematerials')

            .then(response => {             
                setuseMaterials(response.data?.response || [] );
            })
            .catch(error => {
                console.error("Axios Error : " , error);
            })
    }


    const addUseMaterials = (data) =>{

        setSubmitted(true);

        const payload = {
            useId: data.useId ,
            useName: data.useName ,
          //  useType : data.useType,
            useWeight : data.useWeight,
            useDate : data.useDate,
            useReason : data.useReason,          
            
        }

        Axios.post('http://localhost:5002/api/addusematerial' , payload)
            
            .then(() => {
                getUseMaterials();
                setSubmitted(false);
                setShowForm(false);
            })
            .catch(error => {
                console.error("Axios Error : " ,error);
            })
    }


    const updateUSeMaterial = (data) => {

        setSubmitted(true);

        const payload = {
            useId: data.useId ,
            useName: data.useName ,
           // useType : data.useType,
            useWeight : data.useWeight,
            useDate : data.useDate,
            useReason : data.useReason,          
        
    }

    Axios.post('http://localhost:5002/api/updateusematerial' , payload)
            
    .then(() => {
        getUseMaterials();
        setSubmitted(false);
        setIsEdit(false);
        setShowForm(false);
    })
    .catch(error => {
        console.error("Axios Error : " ,error);
    })


    }


    const deleteUseMaterial = (data) => {

       

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

        Axios.post('http://localhost:5002/api/deleteusematerial' , data)
            
            .then(() => {
                getUseMaterials();
                
            })
            .catch(error => {
                console.error("Axios Error : " ,error);
            })

    }   



    return(

        <Dashboard title="Material Management">
        <Box 
        sx={{
            
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
                    marginBottom:3,
                   
                    alignItems:'center',
                    justifyContent :'center',
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
                        <ReorderIcon  sx={{marginBottom: '10px',fontSize:40, color: '#1565c0' }} />
                        <Button  
                        onClick={() => { setShowForm(true); setSelecteduseMaterial(null); }}
                        sx={{                          // sx for button
                           
                            justifySelf: 'center',
                            alignSelf:'center',
                            color: "white", 
                            fontWeight: 'bold', 
                            fontSize: 14, 
                            borderRadius: '10px', 
                           // width: '50%', 
                            backgroundColor: '#1565c0', 
                            '&:hover': {
                            backgroundColor: '#0d47a1', 
                            },
                        }} 
                        >
                        Add use Entry
                        </Button>
                    </Paper>
                    
                )}
                
                {showForm && (

                // <Paper elevation={3} sx={{
                   
                //     borderRadius: '20px',
                //     width: 1000,
                //     height : 450,
                //     padding: '20px',
                //     display: 'flex',
                //     alignItems: 'center',
                //     flexDirection:'column',
                //     justifContent: 'center'
                //       }}>
        
                        
            <UseMaterialform 
                addUseMaterials = {addUseMaterials}
                updateUSeMaterial ={updateUSeMaterial}
                submitted  = {submitted}
                data = {selecteduseMaterial}
                isEdit ={isEdit}
            
            />

           // </Paper>
                )}

                </Box>
            <UseMaterialtable
                rows={usematerials}
                selecteduseMaterial ={data =>   {
                    setSelecteduseMaterial(data);
                    setIsEdit(true);
                    setShowForm(true);
                }   }
                deleteUseMaterial ={data => window.confirm('Are you Sure? ')  && deleteUseMaterial(data)}
            
            />
            

        </Box></Dashboard>


    );

}
export default useMaterial;