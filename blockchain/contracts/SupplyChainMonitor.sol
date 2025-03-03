// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChainMonitor {
    struct SensorData {
        int temperature;    // Temperature * 100 (to handle 2 decimal places)
        int humidity;       // Humidity * 100 (to handle 2 decimal places)
        int latitude;       // Latitude * 1000000 (to handle 6 decimal places)
        int longitude;      // Longitude * 1000000 (to handle 6 decimal places)
        uint256 timestamp;
    }

    SensorData[] public sensorDataHistory;
    
    event NewSensorData(
        int temperature,
        int humidity,
        int latitude,
        int longitude,
        uint256 timestamp
    );

    function logSensorData(
        int _temperature,
        int _humidity,
        int _latitude,
        int _longitude
    ) public {
        SensorData memory newData = SensorData({
            temperature: _temperature,
            humidity: _humidity,
            latitude: _latitude,
            longitude: _longitude,
            timestamp: block.timestamp
        });

        sensorDataHistory.push(newData);
        
        emit NewSensorData(
            _temperature,
            _humidity,
            _latitude,
            _longitude,
            block.timestamp
        );
    }

    function getLatestSensorData() public view returns (
        int temperature,
        int humidity,
        int latitude,
        int longitude,
        uint256 timestamp
    ) {
        require(sensorDataHistory.length > 0, "No sensor data available");
        SensorData memory latestData = sensorDataHistory[sensorDataHistory.length - 1];
        return (
            latestData.temperature,
            latestData.humidity,
            latestData.latitude,
            latestData.longitude,
            latestData.timestamp
        );
    }

    function getSensorDataCount() public view returns (uint256) {
        return sensorDataHistory.length;
    }

    function getSensorDataAtIndex(uint256 index) public view returns (
        int temperature,
        int humidity,
        int latitude,
        int longitude,
        uint256 timestamp
    ) {
        require(index < sensorDataHistory.length, "Index out of bounds");
        SensorData memory data = sensorDataHistory[index];
        return (
            data.temperature,
            data.humidity,
            data.latitude,
            data.longitude,
            data.timestamp
        );
    }
}
