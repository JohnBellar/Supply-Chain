const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    temperature: {
        value: Number,
        unit: String,
        timestamp: Date
    },
    humidity: {
        value: Number,
        unit: String,
        timestamp: Date
    },
    vibration: {
        value: Number,
        unit: String,
        timestamp: Date
    },
    light: {
        value: Number,
        unit: String,
        timestamp: Date
    },
    location: {
        lat: Number,
        lng: Number,
        desc: String,
        timestamp: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('SensorData', sensorDataSchema);
