const mqtt = require('mqtt');
const SensorData = require('../models/SensorData');

const MQTT_BROKER = process.env.MQTT_BROKER || 'mqtt://localhost:1883';
const MQTT_TOPICS = ['supply-chain/pharmaceuticals'];

class MQTTService {
    constructor() {
        this.client = null;
    }

    connect() {
        this.client = mqtt.connect(MQTT_BROKER);

        this.client.on('connect', () => {
            console.log('Connected to MQTT broker');
            MQTT_TOPICS.forEach(topic => {
                this.client.subscribe(topic, (err) => {
                    if (!err) {
                        console.log(`Subscribed to ${topic}`);
                    }
                });
            });
        });

        this.client.on('message', async (topic, message) => {
            try {
                const data = JSON.parse(message.toString());
                console.log('Received sensor data:', data);

                // Create new sensor data record
                const sensorData = new SensorData({
                    productId: 'pharmaceuticals',
                    temperature: {
                        value: data.temperature,
                        unit: '°C',
                        timestamp: new Date()
                    },
                    humidity: {
                        value: data.humidity,
                        unit: '%',
                        timestamp: new Date()
                    },
                    vibration: {
                        value: data.vibration || 0,
                        unit: 'g',
                        timestamp: new Date()
                    },
                    light: {
                        value: data.light || 0,
                        unit: 'lux',
                        timestamp: new Date()
                    },
                    location: {
                        lat: data.latitude,
                        lng: data.longitude,
                        desc: 'Current Location',
                        timestamp: new Date()
                    }
                });

                await sensorData.save();
                console.log('Sensor data saved to database');
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
}

module.exports = new MQTTService();
