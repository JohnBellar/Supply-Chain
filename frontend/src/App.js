import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Shipments from './pages/Shipments';
import ShipmentDetails from './pages/ShipmentDetails';
import Alerts from './pages/Alerts';
import Analytics from './pages/Analytics';
import Products from './pages/Products';
import ProductDashboard from './pages/ProductDashboard';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
      light: '#4dabf5',
      dark: '#1769aa',
    },
    secondary: {
      main: '#00b0ff',
      light: '#33bfff',
      dark: '#007bb2',
    },
    background: {
      default: '#0a1929',
      paper: '#1a2027',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Navbar />
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 0, mt: 8 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/shipments" element={<Shipments />} />
              <Route path="/shipments/:id" element={<ShipmentDetails />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDashboard />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
