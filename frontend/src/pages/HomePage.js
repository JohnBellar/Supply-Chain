import React from 'react';
import { Grid, Paper, Box, Typography } from '@mui/material';
import ShipmentCard from '../components/ShipmentCard';
import StatisticsCards from '../components/StatisticsCards';
import { ShipmentHistoryChart, ShipmentStatusChart, ShipmentRegionChart } from '../components/ShipmentCharts';

const HomePage = ({ shipments, stats, alerts }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <StatisticsCards stats={stats} />
      </Grid>

      {/* Line Chart - Full Width */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Temperature & Humidity History</Typography>
          <Box sx={{ height: 300 }}>
            <ShipmentHistoryChart shipments={shipments} />
          </Box>
        </Paper>
      </Grid>

      {/* Two Pie Charts - Side by Side */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Shipment Status Distribution</Typography>
          <Box sx={{ height: 300 }}>
            <ShipmentStatusChart stats={stats} />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Regional Distribution</Typography>
          <Box sx={{ height: 300 }}>
            <ShipmentRegionChart stats={stats} />
          </Box>
        </Paper>
      </Grid>

      {/* Shipment Cards */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Active Shipments</Typography>
        <Grid container spacing={2}>
          {shipments.map((shipment) => (
            <Grid item xs={12} md={6} lg={4} key={shipment.id}>
              <ShipmentCard shipment={shipment} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomePage;
