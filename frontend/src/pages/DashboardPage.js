import React from 'react';
import { Grid, Paper, Box, Typography } from '@mui/material';
import { ShipmentHistoryChart, ShipmentStatusChart, ShipmentRegionChart } from '../components/ShipmentCharts';
import StatisticsCards from '../components/StatisticsCards';

const DashboardPage = ({ shipments, stats }) => {
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
    </Grid>
  );
};

export default DashboardPage;
