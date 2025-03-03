# Smart Supply Chain Tracking System

A complete supply chain tracking system with IoT sensors, blockchain integration, and real-time monitoring.

## System Architecture

### Hardware Components
1. Arduino Uno
   - DHT22 Temperature/Humidity Sensor
   - GPS Module
2. ESP32
   - WiFi connectivity
   - Connected to Arduino
3. GSM Module
   - Connected to ESP32
   - Backup data transmission

### Software Components
1. Frontend (React)
   - Real-time dashboard
   - Shipment tracking
   - Alert monitoring
2. Backend (Node.js)
   - MQTT broker for IoT data
   - MongoDB for data storage
   - Blockchain integration
3. Blockchain (Ethereum)
   - Smart contract for data integrity
   - Immutable shipment records

## Setup Instructions

### 1. Hardware Setup
```
Arduino Uno:
- Connect DHT22 to pin 2
- Connect GPS RX to pin 4, TX to pin 3
- Connect to ESP32 via pins 5 (TX) and 6 (RX)

ESP32:
- Connect to Arduino via pins 18 (RX) and 19 (TX)
- Connect GSM module to pins 16 (RX) and 17 (TX)
```

### 2. Install Dependencies

```bash
# Install MongoDB
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Install MQTT Broker (Mosquitto)
brew install mosquitto
brew services start mosquitto

# Install Node.js dependencies
cd backend
npm install

cd ../frontend
npm install

# Install Blockchain dependencies
cd ../blockchain
npm install -g hardhat
npm install
```

### 3. Configure Environment Variables
Create .env files in backend and blockchain directories:

```env
# backend/.env
MONGODB_URI=mongodb://localhost:27017/supply-chain
MQTT_BROKER=mqtt://localhost:1883
CONTRACT_ADDRESS=your_contract_address
PRIVATE_KEY=your_private_key

# blockchain/.env
PRIVATE_KEY=your_private_key
```

### 4. Deploy Smart Contract
```bash
cd blockchain
npx hardhat node  # Start local blockchain
npx hardhat run scripts/deploy.js --network localhost
```

### 5. Start the Application
```bash
# Terminal 1: Start backend
cd backend
npm start

# Terminal 2: Start frontend
cd frontend
npm start
```

## Features

1. IoT Integration
   - Real-time temperature and humidity monitoring
   - GPS location tracking
   - Automatic alert generation
   - Redundant data transmission (WiFi + GSM)

2. Blockchain Integration
   - Immutable shipment records
   - Smart contract for data verification
   - Transparent supply chain tracking

3. Dashboard Features
   - Real-time sensor data visualization
   - Shipment tracking and status updates
   - Alert monitoring and notification
   - Historical data analysis

## Development Notes

### Current Setup (Development)
- Using mock data to simulate IoT sensors
- Local blockchain network for testing
- MongoDB for data persistence

### Production Deployment
1. Update ESP32 code with production WiFi credentials
2. Deploy smart contract to Ethereum testnet/mainnet
3. Configure production MongoDB instance
4. Set up proper security measures:
   - API authentication
   - MQTT security
   - Blockchain wallet management

## Troubleshooting

1. IoT Connection Issues
   - Check WiFi credentials in ESP32 code
   - Verify MQTT broker is running
   - Check serial connections between devices

2. Blockchain Issues
   - Ensure local blockchain is running
   - Check contract deployment status
   - Verify wallet has sufficient funds

3. Database Issues
   - Verify MongoDB service is running
   - Check connection string in .env
   - Ensure proper indexes are created
