import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Sample data for demonstration
const sampleData = {
  shipmentsByMonth: [
    { month: 'Jan', count: 45 },
    { month: 'Feb', count: 52 },
    { month: 'Mar', count: 38 },
    { month: 'Apr', count: 65 },
    { month: 'May', count: 48 },
    { month: 'Jun', count: 59 },
  ],
  shipmentsByRegion: {
    'North America': 150,
    'Europe': 120,
    'Asia': 95,
    'South America': 45,
  },
  averageTemperature: 26.8,
  averageHumidity: 68.5,
  deliveryPerformance: {
    onTime: 285,
    delayed: 35,
    total: 320,
  },
  alertsByType: {
    'Temperature Alert': 15,
    'Humidity Alert': 8,
    'Delay Alert': 12,
    'Location Alert': 5,
  },
};

const CHART_COLORS = ['#2196f3', '#00b0ff', '#00e5ff', '#18ffff'];

function Analytics() {
  const theme = useTheme();
  const [stats, setStats] = useState(sampleData);

  const deliveryPerformanceData = [
    {
      name: 'On Time',
      value: stats.deliveryPerformance.onTime,
    },
    {
      name: 'Delayed',
      value: stats.deliveryPerformance.delayed,
    },
  ];

  const alertTypeData = Object.entries(stats.alertsByType).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.light }}>
        Analytics Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Performance Metrics */}
        <Grid item xs={12} md={3}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography color="primary" gutterBottom>
                Average Temperature
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.primary.light }}>
                {stats.averageTemperature.toFixed(1)}°C
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography color="primary" gutterBottom>
                Average Humidity
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.primary.light }}>
                {stats.averageHumidity.toFixed(1)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography color="primary" gutterBottom>
                Total Shipments
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.primary.light }}>
                {stats.deliveryPerformance.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography color="primary" gutterBottom>
                On-Time Delivery Rate
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.primary.light }}>
                {((stats.deliveryPerformance.onTime / stats.deliveryPerformance.total) * 100).toFixed(1)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Shipments by Month */}
        <Grid item xs={12}>
          <Paper sx={chartStyle}>
            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.light }}>
              Monthly Shipment Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.shipmentsByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
                <YAxis stroke={theme.palette.text.secondary} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                />
                <Legend />
                <Bar dataKey="count" fill={theme.palette.primary.main} name="Shipments" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Delivery Performance */}
        <Grid item xs={12} md={6}>
          <Paper sx={chartStyle}>
            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.light }}>
              Delivery Performance
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deliveryPerformanceData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {deliveryPerformanceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Alerts by Type */}
        <Grid item xs={12} md={6}>
          <Paper sx={chartStyle}>
            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.light }}>
              Alert Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={alertTypeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {alertTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Analytics;
