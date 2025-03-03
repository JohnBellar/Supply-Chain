const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const databaseService = require('./services/database');
const mqttService = require('./services/mqtt');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Initialize services
async function initializeServices() {
  try {
    // Connect to MongoDB
    await databaseService.connect();
    console.log('Connected to MongoDB');

    // Connect to MQTT broker
    mqttService.connect();
    console.log('MQTT service initialized');
  } catch (error) {
    console.error('Error initializing services:', error);
    process.exit(1);
  }
}

// Routes
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
initializeServices().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
