// Generate mock data for the supply chain dashboard
const generateMockData = () => {
  const now = Date.now();
  const hour = 3600000;
  
  const generateHistory = (hours) => {
    return Array.from({ length: hours }, (_, i) => ({
      timestamp: now - (hours - i) * hour,
      temperature: 20 + Math.random() * 10,
      humidity: 50 + Math.random() * 20
    }));
  };

  const shipments = [
    {
      id: 'SHIP001',
      status: 'In Transit',
      origin: 'New York',
      destination: 'Los Angeles',
      temperature: 25.4,
      humidity: 60,
      history: generateHistory(24)
    },
    {
      id: 'SHIP002',
      status: 'Delivered',
      origin: 'Chicago',
      destination: 'Miami',
      temperature: 23.1,
      humidity: 55,
      history: generateHistory(24)
    },
    {
      id: 'SHIP003',
      status: 'Processing',
      origin: 'Seattle',
      destination: 'Boston',
      temperature: 22.8,
      humidity: 58,
      history: generateHistory(24)
    }
  ];

  const alerts = [
    {
      id: 1,
      severity: 'warning',
      type: 'Temperature Alert',
      message: 'Temperature above threshold for Shipment SHIP001',
      shipmentId: 'SHIP001',
      timestamp: now - 2 * hour
    },
    {
      id: 2,
      severity: 'error',
      type: 'Humidity Alert',
      message: 'Humidity level critical for Shipment SHIP002',
      shipmentId: 'SHIP002',
      timestamp: now - hour
    },
    {
      id: 3,
      severity: 'info',
      type: 'Status Update',
      message: 'Shipment SHIP003 has started processing',
      shipmentId: 'SHIP003',
      timestamp: now
    }
  ];

  const stats = {
    totalShipments: 100,
    activeShipments: 45,
    completedShipments: 50,
    alertsToday: 5,
    shipmentsByStatus: {
      'In Transit': 45,
      'Delivered': 50,
      'Processing': 5
    },
    shipmentsByRegion: {
      'North America': 40,
      'Europe': 30,
      'Asia': 20,
      'Others': 10
    }
  };

  return {
    shipments,
    alerts,
    stats
  };
};

module.exports = generateMockData;
