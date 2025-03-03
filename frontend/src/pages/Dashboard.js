import React from 'react';
import { Grid, Paper, Typography, Card, CardContent, Box, useTheme } from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Dashboard() {
  const theme = useTheme();

  const cardStyle = {
    background: 'linear-gradient(145deg, #1a2027 0%, #121212 100%)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
    borderRadius: '12px',
    height: '100%',
  };

  const chartStyle = {
    background: 'linear-gradient(145deg, #1a2027 0%, #121212 100%)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
    borderRadius: '12px',
    padding: theme.spacing(3),
  };

  // Mock data for charts
  const temperatureData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    temperature: 20 + Math.random() * 5,
    humidity: 50 + Math.random() * 10,
  }));

  const shipmentStatusData = [
    { name: 'On Time', value: 75 },
    { name: 'In Transit', value: 15 },
    { name: 'Delayed', value: 10 },
  ];

  const regionData = [
    { name: 'North America', value: 35 },
    { name: 'Europe', value: 30 },
    { name: 'Asia', value: 25 },
    { name: 'Others', value: 10 },
  ];

  const alertsData = {
    total: 8,
    critical: 2,
    warning: 3,
    info: 3
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.light }}>
        Supply Chain Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography color="primary" gutterBottom>
                Total Shipments
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.primary.light }}>
                156
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography color="primary" gutterBottom>
                Active Shipments
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.primary.light }}>
                42
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography color="primary" gutterBottom>
                On-Time Deliveries
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.success.light }}>
                114
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography color="primary" gutterBottom>
                Alerts
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.warning.light }}>
                {alertsData.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Temperature & Humidity Chart */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={chartStyle}>
            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.light }}>
              Temperature & Humidity Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature (°C)" />
                <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidity (%)" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Pie Charts */}
        <Grid item xs={12} md={6}>
          <Paper sx={chartStyle}>
            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.light }}>
              Shipment Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={shipmentStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {shipmentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={chartStyle}>
            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.light }}>
              Regional Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
