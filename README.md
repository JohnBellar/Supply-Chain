# Smart Supply Chain Management System

A comprehensive supply chain management system that integrates IoT sensors, blockchain, machine learning, and real-time monitoring to ensure product quality and traceability.

## System Architecture

### 1. IoT Layer
- **Arduino Sensor Nodes**: DHT22 temperature/humidity sensors and GPS modules
- **ESP32 Gateway**: Connects sensor nodes to the network via WiFi and MQTT
- **Sensors**: Temperature, Humidity, Vibration, Light, GPS location
- **Communication**: MQTT protocol for real-time data transmission

### 2. Blockchain Layer
- **Smart Contracts**: 
  - `SupplyChainTracker.sol`: Handles shipment tracking and sensor data
  - `SupplyChainMonitor.sol`: Manages monitoring and alerts
- **Features**:
  - Immutable record of shipment history
  - Real-time sensor data storage
  - Automated compliance monitoring
  - Smart contract-based alerts

### 3. Backend Layer (Node.js)
- **API Server**: Express.js REST API
- **Database**: MongoDB for sensor data and analytics
- **Services**:
  - MQTT Service: Handles IoT data ingestion
  - Blockchain Service: Interacts with smart contracts
  - ML Service: Predictive analytics and quality monitoring
  - Database Service: Data persistence and retrieval

### 4. Frontend Layer (React)
- **Dashboard**: Real-time monitoring and analytics
- **Features**:
  - Product monitoring
  - Shipment tracking
  - Analytics and reporting
  - Alert management

### 5. Machine Learning Layer
- **Features**:
  - Carbon footprint prediction
  - Quality impact analysis
  - Toxic footprint calculation
  - Threshold-based quality monitoring

## Prerequisites

1. **Hardware Requirements**:
   - Arduino boards with sensors
   - ESP32 development board
   - DHT22 sensors
   - GPS modules

2. **Software Requirements**:
   - Node.js (v14 or higher)
   - MongoDB
   - MQTT Broker (e.g., Mosquitto)
   - Truffle/Hardhat for blockchain
   - Arduino IDE
   - React development environment

## Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd smart-supply-chain
   ```

2. **Set Up Backend**:
   ```bash
   cd backend
   npm install
   # Create .env file with:
   # MONGODB_URI=your_mongodb_uri
   # MQTT_BROKER=mqtt://localhost:1883
   npm start
   ```

3. **Set Up Frontend**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Configure IoT Devices**:
   - Upload `arduino_sensor_node.ino` to Arduino boards
   - Update WiFi credentials in `esp32_gateway/config.h`
   - Upload `esp32_gateway.ino` to ESP32

5. **Deploy Smart Contracts**:
   ```bash
   cd blockchain
   npm install
   npx hardhat compile
   npx hardhat deploy
   ```

6. **Start MQTT Broker**:
   ```bash
   # Install Mosquitto
   brew install mosquitto
   # Start Mosquitto
   mosquitto -c /usr/local/etc/mosquitto/mosquitto.conf
   ```

## Running the System

1. **Start Backend Server**:
   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend Development Server**:
   ```bash
   cd frontend
   npm start
   ```

3. **Access the Dashboard**:
   - Open browser and navigate to `http://localhost:3000`
   - Default login credentials:
     - Username: admin
     - Password: admin123

4. **Monitor IoT Data**:
   - View real-time sensor data on the dashboard
   - Check shipment status and location
   - Monitor environmental parameters

## Development and Testing

1. **Run Tests**:
   ```bash
   # Backend tests
   cd backend
   npm test

   # Frontend tests
   cd frontend
   npm test

   # Smart contract tests
   cd blockchain
   npx hardhat test
   ```

2. **Development Mode**:
   ```bash
   # Start backend in dev mode
   cd backend
   npm run dev

   # Start frontend in dev mode
   cd frontend
   npm start
   ```
## For hardware simulation, copy and paste the given URL on your browsers and clcik on the run button to view the simulation

Arduino with gps module

https://wokwi.com/projects/424228913022340097

Esp32 with gsm module

https://wokwi.com/projects/424282487318210561

Arduino with dht22

https://wokwi.com/projects/424319734039570433

## The working model of the hardware is uploaded as a video along with the other submissions
## Troubleshooting

1. **MQTT Connection Issues**:
   - Check if MQTT broker is running
   - Verify WiFi credentials
   - Check MQTT topic subscriptions

2. **Database Issues**:
   - Verify MongoDB connection string
   - Check if MongoDB service is running
   - Verify database permissions

3. **Blockchain Issues**:
   - Check network configuration in hardhat.config.js
   - Verify smart contract deployment
   - Check gas prices and account balance

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details
