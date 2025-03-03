import React from 'react';
import { Card, CardContent, Typography, Box, Chip, LinearProgress } from '@mui/material';
import { LocalShipping, CheckCircle, Pending } from '@mui/icons-material';

const statusIcons = {
  'In Transit': <LocalShipping />,
  'Delivered': <CheckCircle />,
  'Processing': <Pending />
};

const statusColors = {
  'In Transit': 'primary',
  'Delivered': 'success',
  'Processing': 'warning'
};

const ShipmentCard = ({ shipment }) => {
  if (!shipment) return null;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="div">
            {shipment.id}
          </Typography>
          <Chip
            icon={statusIcons[shipment.status]}
            label={shipment.status}
            color={statusColors[shipment.status] || 'default'}
            size="small"
          />
        </Box>
        
        <Typography color="text.secondary" gutterBottom>
          From: {shipment.origin}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          To: {shipment.destination}
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" gutterBottom>
            Temperature: {shipment.temperature}°C
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={Math.min((shipment.temperature / 40) * 100, 100)} 
            color={shipment.temperature > 30 ? 'error' : 'primary'}
            sx={{ mb: 1 }}
          />
          
          <Typography variant="body2" gutterBottom>
            Humidity: {shipment.humidity}%
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={Math.min(shipment.humidity, 100)} 
            color={shipment.humidity > 80 ? 'error' : 'primary'}
          />
        </Box>
        
        <Typography variant="caption" display="block" sx={{ mt: 2 }}>
          Last Updated: {new Date(shipment.lastUpdated).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ShipmentCard;
