import * as React from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const products = [
  {
    name: 'Deposit Payment',
    desc: 'Reserve your selection by paying a deposit online. You make an advance payment and can upload the receipt directly through our website.',
    //price: '$15.00',
  },
  {
    name: 'Bank Transfer',
    desc: 'Transfer the deposit amount to the provided bank account details.',
    //price: 'Free',
  },
  {
    name: 'Visit Our Store',
    desc: 'Come to our physical store to complete the purchase and collect your jewel.',
    //price: '$69.99',
  },
  {
    name: 'Final Payment',
    desc: 'Pay the remaining balance at the store and take possession of your exquisite Jewry.se',
    //price: '$49.99',
  },
];

function Info({ totalPrice }) {
  return (
    <React.Fragment>
      <Typography variant="subtitle2" color="text.secondary">
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.name}
              secondary={product.desc}
            />
            <Typography variant="body1" fontWeight="medium">
              {product.price}
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;