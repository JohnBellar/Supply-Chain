const express = require('express');
const router = express.Router();
const SensorData = require('../models/SensorData');

// Get latest sensor data for a product
router.get('/:productId/latest', async (req, res) => {
    try {
        const data = await SensorData.findOne(
            { productId: req.params.productId },
            {},
            { sort: { 'createdAt': -1 } }
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get sensor data history for a product
router.get('/:productId/history', async (req, res) => {
    try {
        const data = await SensorData.find(
            { productId: req.params.productId },
            {},
            { 
                sort: { 'createdAt': -1 },
                limit: 100
            }
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
