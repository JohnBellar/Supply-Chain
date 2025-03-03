import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { LocalShipping, CheckCircle, Warning } from '@mui/icons-material';

const StatCard = ({ title, value, icon, color }) => (
  <Paper sx={{ p: 2, height: '100%' }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ mr: 2 }}>
        {React.cloneElement(icon, { sx: { fontSize: 40, color } })}
      </Box>
      <Box>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
        <Typography color="text.secondary" variant="subtitle1">
          {title}
        </Typography>
      </Box>
    </Box>
  </Paper>
);

const StatisticsCards = ({ stats }) => {
  if (!stats) return null;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Total Shipments"
          value={stats.totalShipments}
          icon={<LocalShipping />}
          color="primary.main"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Active Shipments"
          value={stats.activeShipments}
          icon={<LocalShipping />}
          color="info.main"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Completed"
          value={stats.completedShipments}
          icon={<CheckCircle />}
          color="success.main"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Alerts Today"
          value={stats.alertsToday}
          icon={<Warning />}
          color="warning.main"
        />
      </Grid>
    </Grid>
  );
};

export default StatisticsCards;
