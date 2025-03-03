import React from 'react';
import { Grid } from '@mui/material';
import ShipmentCard from '../components/ShipmentCard';

const ShipmentsPage = ({ shipments }) => {
  return (
    <Grid container spacing={2}>
      {shipments.map((shipment) => (
        <Grid item xs={12} md={6} lg={4} key={shipment.id}>
          <ShipmentCard shipment={shipment} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ShipmentsPage;
