import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Paper,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
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
} from 'recharts';

function ShipmentDetails() {
  const { id } = useParams();
  const [shipment, setShipment] = useState(null);
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    // Fetch shipment details
    fetch(`http://localhost:5001/shipments/${id}`)
      .then((res) => res.json())
      .then(setShipment)
      .catch((err) => console.error('Error fetching shipment:', err));

    // Fetch sensor data
    fetch(`http://localhost:5001/shipments/${id}/sensor-data`)
      .then((res) => res.json())
      .then(setSensorData)
      .catch((err) => console.error('Error fetching sensor data:', err));
  }, [id]);

  if (!shipment) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h5" gutterBottom>
        Shipment Details - {shipment.shipmentId}
      </Typography>
      <Grid container spacing={3}>
        {/* Shipment Info Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Shipment Information
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Origin"
                    secondary={shipment.origin}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Destination"
                    secondary={shipment.destination}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Status"
                    secondary={shipment.status}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Region"
                    secondary={shipment.region}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Created At"
                    secondary={new Date(shipment.createdAt).toLocaleString()}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Last Updated"
                    secondary={new Date(shipment.lastUpdated).toLocaleString()}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Sensor Data Charts */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Temperature & Humidity History
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="temperature"
                  stroke="#8884d8"
                  name="Temperature (°C)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="humidity"
                  stroke="#82ca9d"
                  name="Humidity (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Location Map */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Last Known Location
            </Typography>
            {sensorData.length > 0 && (
              <Typography>
                Latitude: {sensorData[0].latitude}, Longitude:{' '}
                {sensorData[0].longitude}
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ShipmentDetails;
