const ethers = require('ethers');
const SupplyChainTracker = require('../../blockchain/artifacts/contracts/SupplyChainTracker.sol/SupplyChainTracker.json');

class BlockchainService {
    constructor() {
        this.provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
        this.contract = null;
        this.signer = null;
    }

    async initialize() {
        try {
            // Get the deployer's wallet
            this.signer = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
            
            // Connect to the deployed contract
            this.contract = new ethers.Contract(
                process.env.CONTRACT_ADDRESS,
                SupplyChainTracker.abi,
                this.signer
            );

            console.log('Blockchain service initialized');
        } catch (error) {
            console.error('Error initializing blockchain service:', error);
            throw error;
        }
    }

    async createShipment(id, origin, destination) {
        try {
            const tx = await this.contract.createShipment(id, origin, destination);
            await tx.wait();
            console.log(`Shipment ${id} created on blockchain`);
            return true;
        } catch (error) {
            console.error('Error creating shipment on blockchain:', error);
            throw error;
        }
    }

    async addSensorData(shipmentId, temperature, humidity, latitude, longitude) {
        try {
            const tx = await this.contract.addSensorData(
                shipmentId,
                temperature,
                humidity,
                latitude,
                longitude
            );
            await tx.wait();
            console.log(`Sensor data added for shipment ${shipmentId}`);
            return true;
        } catch (error) {
            console.error('Error adding sensor data to blockchain:', error);
            throw error;
        }
    }

    async updateShipmentStatus(shipmentId, status) {
        try {
            const tx = await this.contract.updateShipmentStatus(shipmentId, status);
            await tx.wait();
            console.log(`Status updated for shipment ${shipmentId}`);
            return true;
        } catch (error) {
            console.error('Error updating shipment status on blockchain:', error);
            throw error;
        }
    }

    async getShipmentData(shipmentId) {
        try {
            const data = await this.contract.getShipmentData(shipmentId);
            return data.map(item => ({
                timestamp: new Date(item.timestamp.toNumber() * 1000),
                temperature: item.temperature.toNumber() / 100,
                humidity: item.humidity.toNumber() / 100,
                latitude: item.latitude.toNumber() / 1000000,
                longitude: item.longitude.toNumber() / 1000000
            }));
        } catch (error) {
            console.error('Error getting shipment data from blockchain:', error);
            throw error;
        }
    }
}

module.exports = new BlockchainService();
