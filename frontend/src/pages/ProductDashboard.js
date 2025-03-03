import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
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
import { products } from '../data/productsData';
import { staticData } from '../data/staticData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Mock data for time-series visualization
const generateTimeData = (parameter, min, max) => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: min + Math.random() * (max - min),
  }));
};

function ProductDashboard() {
  const { id } = useParams();
  const theme = useTheme();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" color="error">
          Product not found
        </Typography>
      </Box>
    );
  }

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

  // Generate time series data for each parameter that has thresholds
  const parameterData = {};
  Object.entries(product.thresholds).forEach(([param, threshold]) => {
    parameterData[param] = generateTimeData(param, threshold.min, threshold.max);
  });

  // Distribution data for pie chart based on static data
  const distributionData = [
    { name: 'On Time', value: staticData.shipments.completed },
    { name: 'In Transit', value: staticData.shipments.active },
    { name: 'Delayed', value: staticData.shipments.delayed }
  ];

  // Regional distribution from static data
  const regionData = Object.entries(staticData.shipments.byRegion).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.light }}>
        {product.name}
      </Typography>

      {/* Parameter Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {Object.entries(product.parameters).map(([param, data]) => (
          <Grid item xs={12} md={4} key={param}>
            <Card sx={cardStyle}>
              <CardContent>
                <Typography color="primary" gutterBottom>
                  {param.charAt(0).toUpperCase() + param.slice(1)}
                </Typography>
                <Typography variant="h4" sx={{ color: theme.palette.primary.light }}>
                  {param === 'location' ? data.desc : `${data.value}${data.unit}`}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  {data.range && `Range: ${data.range}`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Parameter Charts */}
      <Grid container spacing={3}>
        {/* Time Series Charts for Parameters with Thresholds */}
        {Object.entries(parameterData).map(([param, data]) => (
          <Grid item xs={12} key={param}>
            <Paper sx={chartStyle}>
              <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.light }}>
                {param.charAt(0).toUpperCase() + param.slice(1)} Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis 
                    domain={[
                      product.thresholds[param].min - 2,
                      product.thresholds[param].max + 2
                    ]} 
                  />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name={`${param.charAt(0).toUpperCase() + param.slice(1)} ${
                      param === 'temperature' ? '(°C)' : 
                      param === 'humidity' ? '(%)' : ''
                    }`} 
                    stroke="#8884d8" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        ))}

        {/* Shipment Status Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={chartStyle}>
            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.light }}>
              Shipment Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Regional Distribution */}
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

export default ProductDashboard;
