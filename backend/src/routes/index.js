const express = require('express');
const router = express.Router();
const databaseService = require('../services/database');

// Get all shipments
router.get('/shipments', async (req, res) => {
  try {
    const shipments = await databaseService.getShipments();
    res.json(shipments);
  } catch (error) {
    console.error('Error fetching shipments:', error);
    res.status(500).json({ message: 'Error fetching shipments' });
  }
});

// Get stats
router.get('/stats', async (req, res) => {
  try {
    const shipments = await databaseService.getShipments();
    const alerts = await databaseService.getAlerts();
    
    const stats = {
      totalShipments: shipments.length,
      activeShipments: shipments.filter(s => s.status === 'In Transit').length,
      completedShipments: shipments.filter(s => s.status === 'Delivered').length,
      alertsToday: alerts.filter(a => 
        new Date(a.timestamp).toDateString() === new Date().toDateString()
      ).length,
      shipmentsByStatus: {
        'In Transit': shipments.filter(s => s.status === 'In Transit').length,
        'Delivered': shipments.filter(s => s.status === 'Delivered').length,
        'Processing': shipments.filter(s => s.status === 'Processing').length
      },
      shipmentsByRegion: {
        'North America': shipments.filter(s => s.region === 'North America').length,
        'Europe': shipments.filter(s => s.region === 'Europe').length,
        'Asia': shipments.filter(s => s.region === 'Asia').length,
        'Others': shipments.filter(s => s.region === 'Others').length
      }
    };
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

// Get alerts
router.get('/alerts', async (req, res) => {
  try {
    const alerts = await databaseService.getAlerts();
    res.json(alerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ message: 'Error fetching alerts' });
  }
});

// Create a new shipment
router.post('/shipments', async (req, res) => {
  try {
    const shipment = await databaseService.createShipment(req.body);
    res.status(201).json(shipment);
  } catch (error) {
    console.error('Error creating shipment:', error);
    res.status(500).json({ message: 'Error creating shipment' });
  }
});

// Update shipment status
router.put('/shipments/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const shipment = await databaseService.updateShipmentStatus(id, status);
    res.json(shipment);
  } catch (error) {
    console.error('Error updating shipment status:', error);
    res.status(500).json({ message: 'Error updating shipment status' });
  }
});

// Get sensor data for a shipment
router.get('/shipments/:id/sensor-data', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await databaseService.getShipmentData(id);
    res.json(data);
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    res.status(500).json({ message: 'Error fetching sensor data' });
  }
});

module.exports = router;
