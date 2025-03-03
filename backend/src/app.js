require('dotenv').config();
const express = require('express');
const cors = require('cors');
const databaseService = require('./services/database');
const blockchainService = require('./services/blockchain');
const WebSocket = require('ws');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
databaseService.connect()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err));

// Initialize blockchain service
blockchainService.initialize()
    .then(() => console.log('Blockchain service initialized'))
    .catch(err => console.error('Blockchain initialization error:', err));

// WebSocket server for real-time updates
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('New client connected');
    
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Broadcast to all connected clients
const broadcast = (data) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
};

// Routes
app.post('/api/shipments', async (req, res) => {
    try {
        const shipment = await databaseService.createShipment(req.body);
        await blockchainService.createShipment(
            shipment.shipmentId,
            shipment.origin,
            shipment.destination
        );
        broadcast({ type: 'NEW_SHIPMENT', data: shipment });
        res.json(shipment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/sensor-data', async (req, res) => {
    try {
        await databaseService.saveToDatabase(req.body);
        await blockchainService.addSensorData(
            req.body.shipmentId,
            req.body.temperature,
            req.body.humidity,
            req.body.latitude,
            req.body.longitude
        );
        broadcast({ type: 'NEW_SENSOR_DATA', data: req.body });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/shipments', async (req, res) => {
    try {
        const shipments = await databaseService.getShipments();
        res.json(shipments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/shipments/:id', async (req, res) => {
    try {
        const data = await databaseService.getShipmentData(req.params.id);
        const blockchainData = await blockchainService.getShipmentData(req.params.id);
        res.json({ mongoData: data, blockchainData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/alerts', async (req, res) => {
    try {
        const alerts = await databaseService.getAlerts();
        res.json(alerts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
