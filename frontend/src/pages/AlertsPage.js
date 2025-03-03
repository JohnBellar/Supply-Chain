import React from 'react';
import { Grid, Card, CardContent, Typography, Alert } from '@mui/material';

const AlertsPage = ({ alerts }) => {
  return (
    <Grid container spacing={2}>
      {alerts.map((alert) => (
        <Grid item xs={12} key={alert.id}>
          <Card>
            <CardContent>
              <Alert severity={alert.severity.toLowerCase()}>
                <Typography variant="h6">{alert.type}</Typography>
                <Typography>{alert.message}</Typography>
                <Typography variant="caption">
                  Shipment ID: {alert.shipmentId} | Time: {new Date(alert.timestamp).toLocaleString()}
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AlertsPage;
