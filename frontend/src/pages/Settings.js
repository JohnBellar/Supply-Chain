import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';

function Settings() {
  const theme = useTheme();
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.light }}>
        Settings
      </Typography>
      <Paper sx={{ p: 3, background: 'linear-gradient(145deg, #1a2027 0%, #121212 100%)' }}>
        <Typography variant="body1" color="text.secondary">
          Settings page content will be added here.
        </Typography>
      </Paper>
    </Box>
  );
}

export default Settings;
