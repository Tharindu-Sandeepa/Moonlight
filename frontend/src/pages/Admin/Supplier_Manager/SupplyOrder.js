import React, { useState, useEffect } from 'react';
import { Button, Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
import { Contacts, ShoppingBasket, Assignment, Add } from '@mui/icons-material';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import SupOrderTable from './SupOrderTable';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from '../Dashboard';

// Define styles for PDF
const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Box shadow for depth
    borderRadius: 8, // Rounded corners
    overflow: 'hidden', // Hide overflow content
  },
  tableRow: { 
    flexDirection: 'row', 
  },
  tableColHeader: { 
    width: '12.5%', 
    borderStyle: 'solid', 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0, 
    backgroundColor: '#6495ed',
    textAlign: 'center',
    color: '#333',
    padding: 8,
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(0, 0, 0, 0.1)', // Inset shadow for top and bottom borders
  },
  tableCol: { 
    width: '12.5%', 
    borderStyle: 'solid', 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0, 
    textAlign: 'center',
    padding: 8,
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(0, 0, 0, 0.1)', // Inset shadow for top and bottom borders
  },
});

const SupOrderPDF = ({ supOrders }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.section}>
        <Text style={{ ...pdfStyles.text, fontSize: 16 }}>Supply Orders Report</Text>
        <View style={pdfStyles.table}>
          <View style={pdfStyles.tableRow}>
            <Text style={{ ...pdfStyles.tableColHeader, fontSize: 12 }}>Supply Order ID</Text>
            <Text style={{ ...pdfStyles.tableColHeader, fontSize: 12 }}>Supplier Name</Text>
            <Text style={{ ...pdfStyles.tableColHeader, fontSize: 12 }}>Type</Text>
            <Text style={{ ...pdfStyles.tableColHeader, fontSize: 12 }}>Weight</Text>
            <Text style={{ ...pdfStyles.tableColHeader, fontSize: 12 }}>Supplier ID</Text>
            <Text style={{ ...pdfStyles.tableColHeader, fontSize: 12 }}>Material ID</Text>
            <Text style={{ ...pdfStyles.tableColHeader, fontSize: 12 }}>Gemstone ID</Text>
            <Text style={{ ...pdfStyles.tableColHeader, fontSize: 12 }}>Description</Text>
            <Text style={{ ...pdfStyles.tableColHeader, fontSize: 12 }}>Status</Text>
          </View>
          {supOrders.map(order => (
            <View key={order.supOrdId} style={pdfStyles.tableRow}>
              <Text style={{ ...pdfStyles.tableCol, fontSize: 10 }}>{order.supOrdId}</Text>
              <Text style={{ ...pdfStyles.tableCol, fontSize: 10 }}>{order.supName}</Text>
              <Text style={{ ...pdfStyles.tableCol, fontSize: 10 }}>{order.type}</Text>
              <Text style={{ ...pdfStyles.tableCol, fontSize: 10 }}>{order.quantity}</Text>
              <Text style={{ ...pdfStyles.tableCol, fontSize: 10 }}>{order.supID}</Text>
              <Text style={{ ...pdfStyles.tableCol, fontSize: 10 }}>{order.matID}</Text>
              <Text style={{ ...pdfStyles.tableCol, fontSize: 10 }}>{order.gemID}</Text>
              <Text style={{ ...pdfStyles.tableCol, fontSize: 10 }}>{order.description}</Text>
              <Text style={{ ...pdfStyles.tableCol, fontSize: 10 }}>{order.status}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

const SupplyOrder = () => {
  const [supOrders, setSupOrders] = useState([]);
  const [pdfData, setPdfData] = useState(null);
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

  const deletesupOrder = (data) => {
    Axios.post('http://localhost:5002/api/deletesupOrder', data)
      .then(() => {
        getOrders();
        toast.success('Order Deleted', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(error => {
        console.error("Axios Error : ", error);
      });
  }

  const handleGenerateReport = () => {
    setPdfData(
      <PDFDownloadLink document={<SupOrderPDF supOrders={supOrders} />} fileName="supply_orders_report.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>
    );
  };

  return (
    <Dashboard title= "Supplier Management">
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={8} sm={4} md={3}>
          <Card sx={{ boxShadow: 5, borderRadius: '20px', height: '90%', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-5px) scale(1.02)', boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.3)' } }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
              <Avatar sx={{ bgcolor: '#1565c0', marginBottom: '10px' }}><Contacts /></Avatar>
              <Typography variant="h6" gutterBottom>Total Orders</Typography>
              <Typography variant="h4">{supOrders.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8} sm={4} md={3}>
          <Card sx={{ boxShadow: 5, borderRadius: '20px', height: '90%', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-5px) scale(1.02)', boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.3)' } }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
              <Avatar sx={{ bgcolor: '#1976d2', marginBottom: '10px' }}><ShoppingBasket /></Avatar>
              <Button variant="contained" sx={{ borderRadius: '20px', marginBottom: '10px' }} fullWidth onClick={() => navigate('/suppliers')}>
                Go to Suppliers
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8} sm={4} md={3}>
          <Card sx={{ boxShadow: 5, borderRadius: '20px', height: '90%', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-5px) scale(1.02)', boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.3)' } }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
              <Avatar sx={{ bgcolor: '#2196f3', marginBottom: '10px' }}><Assignment /></Avatar>
              <Button variant="contained" sx={{ borderRadius: '20px', marginBottom: '10px' }} fullWidth onClick={handleGenerateReport}>
                Generate Report
              </Button>
              {/* Conditionally render the PDFDownloadLink inside the card content */}
              {pdfData && (
                <PDFDownloadLink document={<SupOrderPDF supOrders={supOrders} />} fileName="supply_orders_report.pdf">
                  {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
                </PDFDownloadLink>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8} sm={4} md={3}>
          <Card sx={{ boxShadow: 5, borderRadius: '20px', height: '90%', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-5px) scale(1.02)', boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.3)' } }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
              <Avatar sx={{ bgcolor: '#1565c0', marginBottom: '10px' }}><Add /></Avatar>
              <Button variant="contained" sx={{ borderRadius: '20px', marginBottom: '10px' }} fullWidth onClick={() => navigate('/orderform')}>
                Add new Order
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Removed the pdfData line */}
      <SupOrderTable
        rows={supOrders}
        deletesupOrder={data => window.confirm('Are you sure??') && deletesupOrder(data)}
      />
    </Dashboard>
  );
};

export default SupplyOrder;
