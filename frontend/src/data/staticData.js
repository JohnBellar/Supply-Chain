export const staticData = {
  shipments: {
    total: 320,
    active: 145,
    completed: 165,
    delayed: 10,
    byStatus: {
      'In Transit': 145,
      'Delivered': 165,
      'Delayed': 10,
      'Cancelled': 0
    },
    byRegion: {
      'North America': 150,
      'Europe': 85,
      'Asia': 65,
      'South America': 20
    }
  },
  alerts: {
    total: 8,
    critical: 2,
    warning: 4,
    info: 2
  },
  mockLocations: [
    { latitude: 40.7128, longitude: -74.0060, shipmentId: 'NYC-001' },
    { latitude: 51.5074, longitude: -0.1278, shipmentId: 'LON-002' },
    { latitude: 35.6762, longitude: 139.6503, shipmentId: 'TKY-003' },
    { latitude: 19.0760, longitude: 72.8777, shipmentId: 'MUM-004' },
    { latitude: -33.8688, longitude: 151.2093, shipmentId: 'SYD-005' }
  ]
};
