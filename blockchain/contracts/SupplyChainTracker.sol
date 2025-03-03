// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChainTracker {
    struct SensorData {
        uint256 timestamp;
        int256 temperature;  // Stored as temperature * 100 to handle decimals
        int256 humidity;     // Stored as humidity * 100 to handle decimals
        int256 latitude;     // Stored as latitude * 1000000 to handle decimals
        int256 longitude;    // Stored as longitude * 1000000 to handle decimals
        string shipmentId;
    }
    
    struct Shipment {
        string id;
        string origin;
        string destination;
        string status;
        uint256 createdAt;
        bool exists;
    }
    
    mapping(string => Shipment) public shipments;
    mapping(string => SensorData[]) public shipmentData;
    
    event ShipmentCreated(string shipmentId, string origin, string destination);
    event SensorDataAdded(string shipmentId, uint256 timestamp, int256 temperature, int256 humidity);
    event ShipmentStatusUpdated(string shipmentId, string status);
    
    function createShipment(
        string memory _id,
        string memory _origin,
        string memory _destination
    ) public {
        require(!shipments[_id].exists, "Shipment already exists");
        
        shipments[_id] = Shipment({
            id: _id,
            origin: _origin,
            destination: _destination,
            status: "Created",
            createdAt: block.timestamp,
            exists: true
        });
        
        emit ShipmentCreated(_id, _origin, _destination);
    }
    
    function addSensorData(
        string memory _shipmentId,
        int256 _temperature,
        int256 _humidity,
        int256 _latitude,
        int256 _longitude
    ) public {
        require(shipments[_shipmentId].exists, "Shipment does not exist");
        
        SensorData memory newData = SensorData({
            timestamp: block.timestamp,
            temperature: _temperature,
            humidity: _humidity,
            latitude: _latitude,
            longitude: _longitude,
            shipmentId: _shipmentId
        });
        
        shipmentData[_shipmentId].push(newData);
        emit SensorDataAdded(_shipmentId, block.timestamp, _temperature, _humidity);
    }
    
    function updateShipmentStatus(
        string memory _shipmentId,
        string memory _status
    ) public {
        require(shipments[_shipmentId].exists, "Shipment does not exist");
        shipments[_shipmentId].status = _status;
        emit ShipmentStatusUpdated(_shipmentId, _status);
    }
    
    function getShipmentData(string memory _shipmentId) public view returns (SensorData[] memory) {
        require(shipments[_shipmentId].exists, "Shipment does not exist");
        return shipmentData[_shipmentId];
    }
    
    function getShipment(string memory _shipmentId) public view returns (Shipment memory) {
        require(shipments[_shipmentId].exists, "Shipment does not exist");
        return shipments[_shipmentId];
    }
}
