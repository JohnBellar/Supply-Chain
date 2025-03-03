const mqtt = require('mqtt');
const { saveToDatabase } = require('./database');

const MQTT_BROKER = 'mqtt://localhost:1883';
const MQTT_TOPIC = 'supply-chain/sensor-data';

class MQTTService {
    constructor() {
        this.client = null;
    }

    connect() {
        this.client = mqtt.connect(MQTT_BROKER);

        this.client.on('connect', () => {
            console.log('Connected to MQTT broker');
            this.client.subscribe(MQTT_TOPIC, (err) => {
                if (!err) {
                    console.log(`Subscribed to ${MQTT_TOPIC}`);
                }
            });
        });

        this.client.on('message', async (topic, message) => {
            try {
                const data = JSON.parse(message.toString());
                console.log('Received sensor data:', data);

                // Save to database
                await saveToDatabase(data);
            } catch (error) {
                console.error('Error processing sensor data:', error);
            }
        });

        this.client.on('error', (error) => {
            console.error('MQTT Error:', error);
        });
    }

    disconnect() {
        if (this.client) {
            this.client.end();
        }
    }

    // Method to simulate sensor data (for testing)
    simulateSensorData(shipmentId) {
        const data = {
            shipmentId,
            temperature: (20 + Math.random() * 15).toFixed(2),
            humidity: (50 + Math.random() * 30).toFixed(2),
            latitude: (Math.random() * 180 - 90).toFixed(6),
            longitude: (Math.random() * 360 - 180).toFixed(6),
            timestamp: new Date().toISOString()
        };

        if (this.client) {
            this.client.publish(MQTT_TOPIC, JSON.stringify(data));
        }
    }
}

module.exports = new MQTTService();
