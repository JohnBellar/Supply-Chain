const mongoose = require('mongoose');

// Shipment Schema
const shipmentSchema = new mongoose.Schema({
    shipmentId: { type: String, required: true, unique: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    status: { type: String, required: true },
    region: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }
});

// Sensor Data Schema
const sensorDataSchema = new mongoose.Schema({
    shipmentId: { type: String, required: true },
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    timestamp: { type: Date, default: Date.now }
});

// Alert Schema
const alertSchema = new mongoose.Schema({
    shipmentId: { type: String, required: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    severity: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Shipment = mongoose.model('Shipment', shipmentSchema);
const SensorData = mongoose.model('SensorData', sensorDataSchema);
const Alert = mongoose.model('Alert', alertSchema);

class DatabaseService {
    async connect() {
        try {
            await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/supply-chain', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('MongoDB connection error:', error);
            throw error;
        }
    }

    async createShipment(data) {
        try {
            const shipment = new Shipment({
                shipmentId: data.id,
                origin: data.origin,
                destination: data.destination,
                status: data.status,
                region: data.region
            });
            return await shipment.save();
        } catch (error) {
            console.error('Error creating shipment:', error);
            throw error;
        }
    }

    async saveToDatabase(data) {
        try {
            // Save sensor data
            const sensorData = new SensorData({
                shipmentId: data.shipmentId,
                temperature: data.temperature,
                humidity: data.humidity,
                latitude: data.latitude,
                longitude: data.longitude
            });
            await sensorData.save();

            // Update shipment last updated time
            await Shipment.updateOne(
                { shipmentId: data.shipmentId },
                { lastUpdated: new Date() }
            );

            // Check for alerts
            await this.checkForAlerts(data);

            return true;
        } catch (error) {
            console.error('Error saving to database:', error);
            throw error;
        }
    }

    async checkForAlerts(data) {
        // Temperature threshold alert
        if (data.temperature > 30) {
            const alert = new Alert({
                shipmentId: data.shipmentId,
                type: 'Temperature Alert',
                message: `High temperature detected: ${data.temperature}°C`,
                severity: 'high'
            });
            await alert.save();
        }

        // Humidity threshold alert
        if (data.humidity > 80) {
            const alert = new Alert({
                shipmentId: data.shipmentId,
                type: 'Humidity Alert',
                message: `High humidity detected: ${data.humidity}%`,
                severity: 'high'
            });
            await alert.save();
        }
    }

    async getShipments() {
        return await Shipment.find().sort({ createdAt: -1 });
    }

    async getShipmentData(shipmentId) {
        return await SensorData.find({ shipmentId }).sort({ timestamp: -1 });
    }

    async getAlerts() {
        return await Alert.find().sort({ timestamp: -1 });
    }

    async updateShipmentStatus(shipmentId, status) {
        return await Shipment.findOneAndUpdate(
            { shipmentId },
            { status, lastUpdated: new Date() },
            { new: true }
        );
    }
}

module.exports = new DatabaseService();
