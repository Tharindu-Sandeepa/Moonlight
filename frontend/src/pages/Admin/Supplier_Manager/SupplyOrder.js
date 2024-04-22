import { Card, CardContent, Grid, Typography, Avatar } from "@mui/material";
import { Button } from "@mui/material";
import SupOrderTable from "./SupOrderTable";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Sidenav from "../../component/Sidenav";
import { Contacts, ShoppingBasket, Assignment, Add } from '@mui/icons-material';

const SupplyOrder = () => {
    const [supOrders, setsupOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = () => {
        Axios.get('http://localhost:3001/api/supOrders')
            .then(response => {
                setsupOrders(response.data?.response || []);
            })
            .catch(error => {
                console.error("Axios Error : ", error);
            });
    }

    const deletesupOrder = (data) => {
        Axios.post('http://localhost:3001/api/deletesupOrder', data)
            .then(() => {
                getOrders();
            })
            .catch(error => {
                console.error("Axios Error : ", error);
            });
    }

    const handleGenerateReport = () => {
        const headers = Object.keys(supOrders[0]);
        const csvData = [headers.join(',')];
        supOrders.forEach(order => {
            const rowData = headers.map(header => order[header]);
            csvData.push(rowData.join(','));
        });

        const csv = csvData.join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'supply_orders_report.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    return (
        <Sidenav>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={8} sm={4} md={3}>
                    <Card
                        sx={{
                            boxShadow: 5,
                            borderRadius: '20px',
                            height: '90%',
                            transition: 'transform 0.3s, box-shadow 0.3s', // Add transition for smoother hover
                            '&:hover': {
                                transform: 'translateY(-5px) scale(1.02)', // Scale and move the card on hover
                                boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.3)', // Increase shadow on hover
                            },
                        }}
                    >
                        <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                            <Avatar sx={{ bgcolor: '#1565c0', marginBottom: '10px' }}><Contacts /></Avatar>
                            <Typography variant="h6" gutterBottom>Total Orders</Typography>
                            <Typography variant="h4">{supOrders.length}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={8} sm={4} md={3}>
                    <Card
                        sx={{
                            boxShadow: 5,
                            borderRadius: '20px',
                            height: '90%',
                            transition: 'transform 0.3s, box-shadow 0.3s', // Add transition for smoother hover
                            '&:hover': {
                                transform: 'translateY(-5px) scale(1.02)', // Scale and move the card on hover
                                boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.3)', // Increase shadow on hover
                            },
                        }}
                    >
                        <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                            <Avatar sx={{ bgcolor: '#1976d2', marginBottom: '10px' }}><ShoppingBasket /></Avatar>
                            <Button variant="contained" sx={{ borderRadius: '20px', marginBottom: '10px' }} fullWidth onClick={() => navigate('/suppliers')}>
                                Go to Suppliers
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={8} sm={4} md={3}>
                    <Card
                        sx={{
                            boxShadow: 5,
                            borderRadius: '20px',
                            height: '90%',
                            transition: 'transform 0.3s, box-shadow 0.3s', // Add transition for smoother hover
                            '&:hover': {
                                transform: 'translateY(-5px) scale(1.02)', // Scale and move the card on hover
                                boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.3)', // Increase shadow on hover
                            },
                        }}
                    >
                        <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                            <Avatar sx={{ bgcolor: '#2196f3', marginBottom: '10px' }}><Assignment /></Avatar>
                            <Button variant="contained" sx={{ borderRadius: '20px', marginBottom: '10px' }} fullWidth onClick={handleGenerateReport}>
                                Generate Report
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={8} sm={4} md={3}>
                    <Card
                        sx={{
                            boxShadow: 5,
                            borderRadius: '20px',
                            height: '90%',
                            transition: 'transform 0.3s, box-shadow 0.3s', // Add transition for smoother hover
                            '&:hover': {
                                transform: 'translateY(-5px) scale(1.02)', // Scale and move the card on hover
                                boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.3)', // Increase shadow on hover
                            },
                        }}
                    >
                        <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                            <Avatar sx={{ bgcolor: '#1565c0', marginBottom: '10px' }}><Add /></Avatar>
                            <Button variant="contained" sx={{ borderRadius: '20px', marginBottom: '10px' }} fullWidth onClick={() => navigate('/orderform')}>
                                Add new Order
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <SupOrderTable
                rows={supOrders}
                deletesupOrder={data => window.confirm('Are you sure??') && deletesupOrder(data)}
            />
        </Sidenav>
    )
}

export default SupplyOrder;
