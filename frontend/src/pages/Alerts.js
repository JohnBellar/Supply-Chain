import React, { useState, useEffect } from 'react';
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Chip,
  useTheme,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  Warning as WarningIcon,
  ErrorOutline as ErrorIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

// Sample alerts data
const sampleAlerts = [
  {
    _id: '1',
    shipmentId: 'SHIP002',
    type: 'Temperature Alert',
    message: 'High temperature detected: 31.2°C',
    severity: 'high',
    timestamp: new Date().toISOString(),
  },
  {
    _id: '2',
    shipmentId: 'SHIP001',
    type: 'Humidity Alert',
    message: 'Humidity level above threshold: 85.3%',
    severity: 'medium',
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
  },
  {
    _id: '3',
    shipmentId: 'SHIP004',
    type: 'Delay Alert',
    message: 'Shipment delayed by weather conditions',
    severity: 'high',
    timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
  },
  {
    _id: '4',
    shipmentId: 'SHIP003',
    type: 'Location Alert',
    message: 'Shipment deviated from planned route',
    severity: 'medium',
    timestamp: new Date(Date.now() - 90 * 60000).toISOString(),
  },
];

function Alerts() {
  const theme = useTheme();
  const [alerts, setAlerts] = useState(sampleAlerts);

  const getSeverityIcon = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return <ErrorIcon sx={{ color: theme.palette.error.main }} />;
      case 'medium':
        return <WarningIcon sx={{ color: theme.palette.warning.main }} />;
      case 'low':
        return <InfoIcon sx={{ color: theme.palette.info.main }} />;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return {
          color: theme.palette.error.main,
          borderColor: theme.palette.error.main,
          backgroundColor: theme.palette.error.dark + '20',
        };
      case 'medium':
        return {
          color: theme.palette.warning.main,
          borderColor: theme.palette.warning.main,
          backgroundColor: theme.palette.warning.dark + '20',
        };
      case 'low':
        return {
          color: theme.palette.info.main,
          borderColor: theme.palette.info.main,
          backgroundColor: theme.palette.info.dark + '20',
        };
      default:
        return {};
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.light }}>
        System Alerts
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card sx={{ background: 'linear-gradient(145deg, #1a2027 0%, #121212 100%)' }}>
            <CardContent>
              <Typography color="primary" gutterBottom>
                High Priority Alerts
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.error.main }}>
                {alerts.filter(a => a.severity === 'high').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ background: 'linear-gradient(145deg, #1a2027 0%, #121212 100%)' }}>
            <CardContent>
              <Typography color="primary" gutterBottom>
                Medium Priority Alerts
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.warning.main }}>
                {alerts.filter(a => a.severity === 'medium').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ background: 'linear-gradient(145deg, #1a2027 0%, #121212 100%)' }}>
            <CardContent>
              <Typography color="primary" gutterBottom>
                Total Active Alerts
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.primary.light }}>
                {alerts.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ mt: 3, background: 'linear-gradient(145deg, #1a2027 0%, #121212 100%)' }}>
        <List>
          {alerts.map((alert) => (
            <ListItem
              key={alert._id}
              divider
              sx={{
                borderColor: theme.palette.divider,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                {getSeverityIcon(alert.severity)}
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ color: theme.palette.primary.light, ml: 2 }}>
                      {alert.type}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ ml: 2 }}>
                      <Typography component="span" variant="body2" color="text.secondary">
                        {alert.message}
                      </Typography>
                      <br />
                      <Typography component="span" variant="caption" color="text.secondary">
                        Shipment: {alert.shipmentId} | {new Date(alert.timestamp).toLocaleString()}
                      </Typography>
                    </Box>
                  }
                />
                <Chip
                  label={alert.severity.toUpperCase()}
                  sx={{
                    ml: 2,
                    ...getSeverityColor(alert.severity),
                  }}
                  variant="outlined"
                />
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default Alerts;
