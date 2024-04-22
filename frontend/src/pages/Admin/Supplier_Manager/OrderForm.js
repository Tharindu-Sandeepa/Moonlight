import { Box,Button } from "@mui/material";
import SupOrderForm from "./SupOrderForm";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Dashboard from "../Dashboard";


const OrderForm = () => {
    // eslint-disable-next-line
    const [supOrders, setSupOrders] = useState([]); 
    const [submitted, setSubmitted] = useState(false);
    // eslint-disable-next-line
    const [selectedsupOrder, setSelectedsupOrder] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = () => {
        Axios.get('http://localhost:5002/api/supOrders')
            .then(response => {
                setSupOrders(response.data?.response || []); 
            })
            .catch(error => {
                console.error("Axios Error : ", error);
            });
    }

    const addsupOrder = (data) => {
        setSubmitted(true); 

        const payload = {
            supOrdId: data.supOrdId,
            supName: data.supName,
            type: data.type,
            quantity: data.quantity,
            supID: data.supID,
            matID: data.matID,
            gemID: data.gemID,
            description: data.description,
            status: data.status,
        }
        Axios.post('http://localhost:5002/api/createsupOrder', payload)
            .then(() => {
                getOrders();
                setSubmitted(false); 
                setIsEdit(false);
            })
            .catch(error => {
                console.error("Axios Error : ", error);
            });
    }

    const updatesupOrder = (data) => {
        setSubmitted(true);
    
        const payload = {
            supOrdId: data.supOrdId,
            supName: data.supName,
            type: data.type,
            quantity: data.quantity,
            supID: data.supID,
            matID: data.matID,
            gemID: data.gemID,
            description: data.description,
            status: data.status,
        }
    
        Axios.post('http://localhost:5002/api/updatesupOrder', payload)
            .then(() => {
                
                navigate('/edit-supply-order', { state: { selectedsupOrder: data } }); // Passing selectedsupOrder as state
                setSubmitted(false);
                setIsEdit(false);
                
            })
            .catch(error => {
                console.error("Axios Error : ", error);
            });
    }
   
    return(
    <Dashboard>
       <Box>
        <Box
            sx={{
                width: 'calc(100% - 100px)',
                margin: 'auto',
                marginTop: '100px'
            }}
        >
        
       <SupOrderForm 
            addsupOrder={addsupOrder}
            updatesupOrder={updatesupOrder}
            submitted={submitted}
            data={selectedsupOrder}
            isEdit={isEdit}
        />
       
        </Box>

        <Button variant="contained" onClick={() => navigate('/supplyorder')}>
                Back
            </Button>

        
    </Box>

    </Dashboard>
    )

}

export default OrderForm;
