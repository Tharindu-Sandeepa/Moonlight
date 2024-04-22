import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const SupplierBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  borderRadius: '20px',
  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)', // Increase the shadow intensity
  transition: 'transform 0.3s, box-shadow 0.3s', // Add transition for smoother hover
  '&:hover': {
    transform: 'translateY(-5px) scale(1.02)', // Scale and move the card on hover
    boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.3)', // Increase shadow on hover
  },
}));

const generateColor = (str) => {
  const hash = str.split('').reduce((acc, char) => char.charCodeAt(0) + (acc << 6) + (acc << 16) - acc, 0);
  const color = `rgb(${hash & 0xFF},${(hash & 0xFF00) >> 8},${(hash & 0xFF0000) >> 16})`;
  return color;
};

function SupplierCard({ supplier, onUpdateClick, onPlaceOrderClick, onRemoveClick }) {
  const handleUpdateClick = () => {
    onUpdateClick(supplier._id);
  };

  const handlePlaceOrderClick = () => {
    onPlaceOrderClick();
  };

  const handleRemoveClick = () => {
    onRemoveClick(supplier._id);
  };

  return (
    <SupplierBox elevation={3}>
      <Avatar
        alt={supplier.supName}
        sx={{
          width: 100,
          height: 100,
          margin: 'auto',
          backgroundColor: generateColor(supplier.supName),
        }}
      >
        {supplier.supName.charAt(0).toUpperCase()}
      </Avatar>
      <Typography variant="h5" component="h2" sx={{ marginTop: 2 }}>
        {supplier.supName}
      </Typography>
      <Typography variant="subtitle1" component="p" sx={{ marginTop: 1 }}>
        Items: {supplier.Items.join(', ')}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p" sx={{ marginTop: 1 }}>
        Description: {supplier.description}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '15px' }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ fontSize: '0.7rem', padding: '4px 8px', marginRight: '0.25rem', width: '70px' }}
          onClick={handleUpdateClick}
        >
          Update
        </Button>
        <Button
          variant="contained"
          color="success"
          size="small"
          sx={{ fontSize: '0.7rem', padding: '4px 8px', marginRight: '0.25rem', width: '100px' }}
          onClick={handlePlaceOrderClick}
        >
          Place an Order
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          sx={{ fontSize: '0.7rem', padding: '4px 8px', width: '70px' }}
          onClick={handleRemoveClick}
        >
          Remove
        </Button>
      </div>
    </SupplierBox>
  );
}

export default SupplierCard;
