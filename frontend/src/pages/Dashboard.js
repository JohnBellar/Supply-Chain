import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
  useTheme,
} from '@mui/material';
import {
  LineChart,
  Line,
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

const COLORS = ['#2196f3', '#00b0ff', '#00e5ff', '#18ffff'];

// Sample data
const sampleStats = {
  totalShipments: 320,
  activeShipments: 145,
  completedShipments: 165,
  alertsToday: 8,
  shipmentsByStatus: {
    'In Transit': 145,
    'Delivered': 155,
    'Delayed': 15,
    'Cancelled': 5,
  },
  shipmentsByRegion: {
    'North America': 150,
    'Europe': 85,
    'Asia': 65,
    'South America': 20,
  },
};

const sampleSensorData = [
  { timestamp: Date.now() - 6 * 3600000, temperature: 25.4, humidity: 68 },
  { timestamp: Date.now() - 5 * 3600000, temperature: 26.1, humidity: 65 },
  { timestamp: Date.now() - 4 * 3600000, temperature: 26.8, humidity: 63 },
  { timestamp: Date.now() - 3 * 3600000, temperature: 27.2, humidity: 62 },
  { timestamp: Date.now() - 2 * 3600000, temperature: 26.9, humidity: 64 },
  { timestamp: Date.now() - 1 * 3600000, temperature: 26.5, humidity: 66 },
  { timestamp: Date.now(), temperature: 26.2, humidity: 67 },
];

function Dashboard() {
  const theme = useTheme();
  const [stats, setStats] = useState(sampleStats);
  const [sensorData, setSensorData] = useState(sampleSensorData);

  const statusData = Object.entries(stats.shipmentsByStatus || {}).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const regionData = Object.entries(stats.shipmentsByRegion || {}).map(
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
        Supply Chain Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} md={3}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography color="primary" gutterBottom>
                Total Shipments
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.primary.light }}>
                {stats.totalShipments}
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
                {stats.activeShipments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography color="primary" gutterBottom>
                Completed Shipments
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.success.light }}>
                {stats.completedShipments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography color="primary" gutterBottom>
                Alerts Today
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.error.light }}>
                {stats.alertsToday}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Temperature & Humidity Chart */}
        <Grid item xs={12}>
          <Paper sx={chartStyle}>
            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.light }}>
              Temperature & Humidity History
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                  stroke={theme.palette.text.secondary}
                />
                <YAxis
                  yAxisId="left"
                  stroke={theme.palette.text.secondary}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke={theme.palette.text.secondary}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="temperature"
                  stroke={theme.palette.primary.main}
                  name="Temperature (°C)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="humidity"
                  stroke={theme.palette.secondary.main}
                  name="Humidity (%)"
                />
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
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
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

        <Grid item xs={12} md={6}>
          <Paper sx={chartStyle}>
            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.light }}>
              Regional Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={regionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {regionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
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

export default Dashboard;
