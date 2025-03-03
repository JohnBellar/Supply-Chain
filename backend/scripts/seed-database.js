require('dotenv').config();
const mongoose = require('mongoose');
const { staticData } = require('../../frontend/src/data/staticData');
const { products } = require('../../frontend/src/data/productsData');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-supply-chain', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Shipment Schema
const shipmentSchema = new mongoose.Schema({
    shipmentId: { type: String, required: true, unique: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    status: { type: String, required: true },
    region: { type: String, required: true },
    productType: { type: String, required: true },
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

async function seedDatabase() {
    try {
        // Clear existing data
        await Shipment.deleteMany({});
        await SensorData.deleteMany({});
        await Alert.deleteMany({});

        // Create shipments based on static data
        const regions = Object.keys(staticData.shipments.byRegion);
        const statuses = Object.keys(staticData.shipments.byStatus);
        const productTypes = products.map(p => p.id);

        // Create shipments
        for (let i = 1; i <= staticData.shipments.total; i++) {
            const region = regions[Math.floor(Math.random() * regions.length)];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const productType = productTypes[Math.floor(Math.random() * productTypes.length)];
            const product = products.find(p => p.id === productType);

            const shipment = new Shipment({
                shipmentId: `SHIP${i.toString().padStart(4, '0')}`,
                origin: `${region} Warehouse`,
                destination: `${regions[Math.floor(Math.random() * regions.length)]} Distribution Center`,
                status: status,
                region: region,
                productType: productType
            });
            await shipment.save();

            // Add sensor data for each shipment
            const thresholds = product.thresholds;
            for (let j = 0; j < 24; j++) { // 24 hours of data
                const sensorData = new SensorData({
                    shipmentId: shipment.shipmentId,
                    temperature: thresholds.temperature ? 
                        thresholds.temperature.min + Math.random() * (thresholds.temperature.max - thresholds.temperature.min) :
                        20 + Math.random() * 5,
                    humidity: thresholds.humidity ?
                        thresholds.humidity.min + Math.random() * (thresholds.humidity.max - thresholds.humidity.min) :
                        50 + Math.random() * 10,
                    latitude: staticData.mockLocations[Math.floor(Math.random() * staticData.mockLocations.length)].latitude,
                    longitude: staticData.mockLocations[Math.floor(Math.random() * staticData.mockLocations.length)].longitude,
                    timestamp: new Date(Date.now() - (23 - j) * 3600000) // Last 24 hours
                });
                await sensorData.save();
            }
        }

        // Create alerts
        for (let i = 0; i < staticData.alerts.total; i++) {
            const shipments = await Shipment.find();
            const randomShipment = shipments[Math.floor(Math.random() * shipments.length)];
            
            const alert = new Alert({
                shipmentId: randomShipment.shipmentId,
                type: i < staticData.alerts.critical ? 'Temperature Alert' : 
                      i < staticData.alerts.critical + staticData.alerts.warning ? 'Humidity Alert' : 'Info',
                message: i < staticData.alerts.critical ? 'Critical: Temperature out of range' :
                        i < staticData.alerts.critical + staticData.alerts.warning ? 'Warning: Humidity approaching threshold' :
                        'Info: Shipment status updated',
                severity: i < staticData.alerts.critical ? 'high' :
                         i < staticData.alerts.critical + staticData.alerts.warning ? 'medium' : 'low',
                timestamp: new Date(Date.now() - Math.random() * 24 * 3600000) // Random time in last 24 hours
            });
            await alert.save();
        }

        console.log('Database seeded successfully!');
        console.log(`Created ${staticData.shipments.total} shipments`);
        console.log(`Added ${staticData.shipments.total * 24} sensor readings`);
        console.log(`Created ${staticData.alerts.total} alerts`);

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        mongoose.connection.close();
    }
}

seedDatabase();
