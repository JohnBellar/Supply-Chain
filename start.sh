#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting Smart Supply Chain Application...${NC}\n"

# Kill any existing processes on the required ports
echo -e "${GREEN}Cleaning up existing processes...${NC}"
lsof -ti:3000,5001,8545 | xargs kill -9 2>/dev/null

# Start Blockchain Network
echo -e "\n${GREEN}Starting Blockchain Network...${NC}"
cd blockchain
npx hardhat node &
BLOCKCHAIN_PID=$!

# Wait for blockchain to start
sleep 5

# Start Backend Server
echo -e "\n${GREEN}Starting Backend Server...${NC}"
cd ../backend
npm start &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

# Start Frontend
echo -e "\n${GREEN}Starting Frontend...${NC}"
cd ../frontend
npm start &
FRONTEND_PID=$!

# Print access information
echo -e "\n${BLUE}Application Started!${NC}"
echo -e "${GREEN}Frontend:${NC} http://localhost:3000"
echo -e "${GREEN}Backend:${NC} http://localhost:5001"
echo -e "${GREEN}Blockchain:${NC} http://localhost:8545"
echo -e "${GREEN}MQTT Broker:${NC} localhost:1883"

# Wait for user input
echo -e "\n${BLUE}Press Ctrl+C to stop all services${NC}"
wait $BLOCKCHAIN_PID $BACKEND_PID $FRONTEND_PID
