import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip,
  useTheme,
  IconButton,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  LocalShipping as ShippingIcon,
  CheckCircle as DeliveredIcon,
  Error as DelayedIcon,
  Cancel as CancelledIcon,
} from '@mui/icons-material';

function Shipments() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [shipments, setShipments] = useState([
    {
      shipmentId: 'SHIP001',
      origin: 'New York',
      destination: 'Los Angeles',
      status: 'In Transit',
      region: 'North America',
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    },
    {
      shipmentId: 'SHIP002',
      origin: 'San Francisco',
      destination: 'Chicago',
      status: 'In Transit',
      region: 'North America',
      createdAt: new Date(Date.now() - 24 * 60 * 60000).toISOString(),
      lastUpdated: new Date().toISOString(),
    },
    {
      shipmentId: 'SHIP003',
      origin: 'Miami',
      destination: 'Boston',
      status: 'Delivered',
      region: 'North America',
      createdAt: new Date(Date.now() - 48 * 60 * 60000).toISOString(),
      lastUpdated: new Date(Date.now() - 12 * 60 * 60000).toISOString(),
    },
    {
      shipmentId: 'SHIP004',
      origin: 'Seattle',
      destination: 'Denver',
      status: 'Delayed',
      region: 'North America',
      createdAt: new Date(Date.now() - 72 * 60 * 60000).toISOString(),
      lastUpdated: new Date(Date.now() - 6 * 60 * 60000).toISOString(),
    },
  ]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'in transit':
        return {
          color: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.dark + '20',
        };
      case 'delivered':
        return {
          color: theme.palette.success.main,
          borderColor: theme.palette.success.main,
          backgroundColor: theme.palette.success.dark + '20',
        };
      case 'delayed':
        return {
          color: theme.palette.warning.main,
          borderColor: theme.palette.warning.main,
          backgroundColor: theme.palette.warning.dark + '20',
        };
      case 'cancelled':
        return {
          color: theme.palette.error.main,
          borderColor: theme.palette.error.main,
          backgroundColor: theme.palette.error.dark + '20',
        };
      default:
        return {};
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'in transit':
        return <ShippingIcon sx={{ color: theme.palette.primary.main }} />;
      case 'delivered':
        return <DeliveredIcon sx={{ color: theme.palette.success.main }} />;
      case 'delayed':
        return <DelayedIcon sx={{ color: theme.palette.warning.main }} />;
      case 'cancelled':
        return <CancelledIcon sx={{ color: theme.palette.error.main }} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.light }}>
        Shipment Management
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ background: 'linear-gradient(145deg, #1a2027 0%, #121212 100%)' }}>
            <CardContent>
              <Typography color="primary" gutterBottom>
                Total Shipments
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.primary.light }}>
                {shipments.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ background: 'linear-gradient(145deg, #1a2027 0%, #121212 100%)' }}>
            <CardContent>
              <Typography color="primary" gutterBottom>
                In Transit
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.primary.light }}>
                {shipments.filter(s => s.status === 'In Transit').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ background: 'linear-gradient(145deg, #1a2027 0%, #121212 100%)' }}>
            <CardContent>
              <Typography color="primary" gutterBottom>
                Delivered
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.success.light }}>
                {shipments.filter(s => s.status === 'Delivered').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ background: 'linear-gradient(145deg, #1a2027 0%, #121212 100%)' }}>
            <CardContent>
              <Typography color="primary" gutterBottom>
                Delayed
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.warning.light }}>
                {shipments.filter(s => s.status === 'Delayed').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableContainer 
        component={Paper}
        sx={{
          background: 'linear-gradient(145deg, #1a2027 0%, #121212 100%)',
          '& .MuiTableCell-root': {
            borderColor: theme.palette.divider,
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>Shipment ID</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipments.map((shipment) => (
              <TableRow
                key={shipment.shipmentId}
                hover
                onClick={() => navigate(`/shipments/${shipment.shipmentId}`)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getStatusIcon(shipment.status)}
                    <Chip
                      label={shipment.status}
                      size="small"
                      sx={getStatusColor(shipment.status)}
                      variant="outlined"
                    />
                  </Box>
                </TableCell>
                <TableCell>{shipment.shipmentId}</TableCell>
                <TableCell>{shipment.origin}</TableCell>
                <TableCell>{shipment.destination}</TableCell>
                <TableCell>{shipment.region}</TableCell>
                <TableCell>{new Date(shipment.createdAt).toLocaleString()}</TableCell>
                <TableCell>{new Date(shipment.lastUpdated).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Shipments;
