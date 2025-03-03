export const products = [
  {
    id: 'pharmaceuticals',
    name: 'Pharmaceuticals and Medical Products',
    parameters: {
      temperature: { value: 5.2, unit: '°C', range: '2-8°C' },
      humidity: { value: 45, unit: '%', range: '30-60%' },
      vibration: { value: 0.15, unit: 'g', range: '0-0.5g' },
      light: { value: 250, unit: 'lux', range: '200-400 lux' },
      location: { lat: 12.9716, lng: 77.5946, desc: 'Bangalore' }
    },
    thresholds: {
      temperature: { min: 2, max: 8 },
      humidity: { min: 30, max: 60 }
    }
  },
  {
    id: 'perishable',
    name: 'Perishable Goods',
    parameters: {
      temperature: { value: -18.5, unit: '°C', range: '-20-(-15)°C' },
      humidity: { value: 85, unit: '%', range: '80-90%' },
      vibration: { value: 0.2, unit: 'g', range: '0-0.3g' },
      light: { value: 0, unit: 'lux', range: '0-50 lux' },
      location: { lat: 19.0760, lng: 72.8777, desc: 'Mumbai' },
      co2: { value: 400, unit: 'ppm', range: '350-1000 ppm' }
    },
    thresholds: {
      temperature: { min: 0, max: 4 },
      humidity: { min: 85, max: 95 },
      co2: { min: 350, max: 1000 }
    }
  },
  {
    id: 'luxury',
    name: 'Luxury Goods',
    parameters: {
      temperature: { value: 22.1, unit: '°C', range: '15-30°C' },
      humidity: { value: 35, unit: '%', range: '20-50%' },
      vibration: { value: 0.05, unit: 'g', range: '0-0.2g' },
      light: { value: 300, unit: 'lux', range: '200-500 lux' },
      location: { lat: 28.7041, lng: 77.1025, desc: 'Delhi' }
    },
    thresholds: {
      temperature: { min: 18, max: 24 },
      humidity: { min: 45, max: 55 },
      light: { max: 500 }
    }
  },
  {
    id: 'electronics',
    name: 'High-Value Electronics',
    parameters: {
      temperature: { value: 22.1, unit: '°C', range: '15-30°C' },
      humidity: { value: 35, unit: '%', range: '20-50%' },
      vibration: { value: 0.05, unit: 'g', range: '0-0.2g' },
      light: { value: 300, unit: 'lux', range: '200-500 lux' },
      location: { lat: 28.7041, lng: 77.1025, desc: 'Delhi' },
      motion: { value: 0, unit: 'm/s', range: '0-1 m/s' }
    },
    thresholds: {
      temperature: { min: 15, max: 25 },
      humidity: { min: 20, max: 60 }
    }
  },
  {
    id: 'flowers',
    name: 'Fresh Flowers and Plants',
    parameters: {
      temperature: { value: 5.2, unit: '°C', range: '2-8°C' },
      humidity: { value: 80, unit: '%', range: '70-90%' },
      vibration: { value: 0.15, unit: 'g', range: '0-0.5g' },
      light: { value: 250, unit: 'lux', range: '200-400 lux' },
      location: { lat: 12.9716, lng: 77.5946, desc: 'Bangalore' },
      co2: { value: 400, unit: 'ppm', range: '350-1000 ppm' }
    },
    thresholds: {
      temperature: { min: 2, max: 8 },
      humidity: { min: 80, max: 90 },
      co2: { min: 350, max: 1000 }
    }
  },
  {
    id: 'wine',
    name: 'Wine, Spirits, and Gourmet Foods',
    parameters: {
      temperature: { value: 12.5, unit: '°C', range: '10-15°C' },
      humidity: { value: 60, unit: '%', range: '50-70%' },
      vibration: { value: 0.1, unit: 'g', range: '0-0.3g' },
      light: { value: 200, unit: 'lux', range: '150-300 lux' },
      location: { lat: 13.0827, lng: 80.2707, desc: 'Chennai' }
    },
    thresholds: {
      temperature: { min: 10, max: 15 },
      humidity: { min: 50, max: 80 }
    }
  },
  {
    id: 'chemicals',
    name: 'Chemicals and Hazardous Materials',
    parameters: {
      temperature: { value: 15.8, unit: '°C', range: '10-20°C' },
      humidity: { value: 55, unit: '%', range: '40-60%' },
      vibration: { value: 0.1, unit: 'g', range: '0-0.4g' },
      light: { value: 150, unit: 'lux', range: '100-300 lux' },
      location: { lat: 13.0827, lng: 80.2707, desc: 'Chennai' },
      pressure: { value: 1, unit: 'atm', range: '0.9-1.1 atm' },
      gas: { value: 0, unit: '%', range: '0-5%' }
    },
    thresholds: {
      temperature: { min: 15, max: 25 },
      pressure: { min: 0.9, max: 1.1 }
    }
  },
  {
    id: 'livestock',
    name: 'Livestock and Animal Products',
    parameters: {
      temperature: { value: 3.2, unit: '°C', range: '2-4°C' },
      humidity: { value: 90, unit: '%', range: '85-95%' },
      vibration: { value: 0.2, unit: 'g', range: '0-0.3g' },
      light: { value: 0, unit: 'lux', range: '0-50 lux' },
      location: { lat: 19.0760, lng: 72.8777, desc: 'Mumbai' },
      oxygen: { value: 21, unit: '%', range: '19.5-23.5%' }
    },
    thresholds: {
      temperature: { min: 2, max: 4 },
      humidity: { min: 85, max: 95 },
      oxygen: { min: 19.5, max: 23.5 }
    }
  },
  {
    id: 'aerospace',
    name: 'Aerospace and Defense Components',
    parameters: {
      temperature: { value: 20.5, unit: '°C', range: '15-25°C' },
      humidity: { value: 40, unit: '%', range: '30-60%' },
      vibration: { value: 0.05, unit: 'g', range: '0-0.2g' },
      light: { value: 250, unit: 'lux', range: '200-400 lux' },
      location: { lat: 28.7041, lng: 77.1025, desc: 'Delhi' },
      pressure: { value: 1, unit: 'atm', range: '0.9-1.1 atm' }
    },
    thresholds: {
      temperature: { min: 15, max: 25 },
      humidity: { min: 30, max: 60 }
    }
  },
  {
    id: 'metals',
    name: 'Rare Earth Metals and Raw Materials',
    parameters: {
      temperature: { value: 20.5, unit: '°C', range: '15-25°C' },
      humidity: { value: 40, unit: '%', range: '30-50%' },
      vibration: { value: 0.05, unit: 'g', range: '0-0.2g' },
      light: { value: 250, unit: 'lux', range: '200-400 lux' },
      location: { lat: 28.7041, lng: 77.1025, desc: 'Delhi' },
      pressure: { value: 1, unit: 'atm', range: '0.9-1.1 atm' }
    },
    thresholds: {
      temperature: { min: 15, max: 25 },
      humidity: { min: 30, max: 50 }
    }
  },
  {
    id: 'renewable',
    name: 'Renewable Energy Equipment',
    parameters: {
      temperature: { value: 25.5, unit: '°C', range: '15-30°C' },
      humidity: { value: 50, unit: '%', range: '30-60%' },
      vibration: { value: 0.1, unit: 'g', range: '0-0.3g' },
      light: { value: 300, unit: 'lux', range: '200-500 lux' },
      location: { lat: 28.7041, lng: 77.1025, desc: 'Delhi' },
      pressure: { value: 1, unit: 'atm', range: '0.9-1.1 atm' }
    },
    thresholds: {
      temperature: { min: 15, max: 30 },
      humidity: { min: 30, max: 60 }
    }
  },
  {
    id: 'agricultural',
    name: 'High-Value Agricultural Products',
    parameters: {
      temperature: { value: 20.5, unit: '°C', range: '15-25°C' },
      humidity: { value: 70, unit: '%', range: '60-80%' },
      vibration: { value: 0.1, unit: 'g', range: '0-0.3g' },
      light: { value: 200, unit: 'lux', range: '150-300 lux' },
      location: { lat: 13.0827, lng: 80.2707, desc: 'Chennai' },
      co2: { value: 400, unit: 'ppm', range: '350-1000 ppm' }
    },
    thresholds: {
      temperature: { min: 15, max: 25 },
      humidity: { min: 60, max: 80 },
      co2: { min: 350, max: 1000 }
    }
  }
];
