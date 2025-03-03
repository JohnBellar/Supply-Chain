#include <DHT.h>
#include <TinyGPS++.h>
#include <SoftwareSerial.h>

#define DHTPIN 2          // DHT22 data pin
#define DHTTYPE DHT22     // DHT22 sensor type
#define GPS_RX 4          // GPS RX pin
#define GPS_TX 3          // GPS TX pin
#define ESP_RX 6          // ESP32 RX pin
#define ESP_TX 5          // ESP32 TX pin

DHT dht(DHTPIN, DHTTYPE);
TinyGPSPlus gps;
SoftwareSerial gpsSerial(GPS_RX, GPS_TX);
SoftwareSerial espSerial(ESP_RX, ESP_TX);

struct SensorData {
  float temperature;
  float humidity;
  double latitude;
  double longitude;
  bool gpsValid;
};

void setup() {
  Serial.begin(9600);
  gpsSerial.begin(9600);
  espSerial.begin(9600);
  dht.begin();
  
  Serial.println("Arduino Sensor Node Initialized");
}

void loop() {
  SensorData data;
  
  // Read DHT22 sensor
  data.temperature = dht.readTemperature();
  data.humidity = dht.readHumidity();
  
  // Read GPS data
  data.gpsValid = false;
  while (gpsSerial.available() > 0) {
    if (gps.encode(gpsSerial.read())) {
      if (gps.location.isValid()) {
        data.latitude = gps.location.lat();
        data.longitude = gps.location.lng();
        data.gpsValid = true;
      }
    }
  }
  
  // Send data to ESP32
  String jsonData = createJson(data);
  espSerial.println(jsonData);
  
  // Also print to Serial for debugging
  Serial.println(jsonData);
  
  delay(5000); // Read every 5 seconds
}

String createJson(SensorData data) {
  String json = "{";
  json += "\"temperature\":" + String(data.temperature, 2) + ",";
  json += "\"humidity\":" + String(data.humidity, 2) + ",";
  if (data.gpsValid) {
    json += "\"latitude\":" + String(data.latitude, 6) + ",";
    json += "\"longitude\":" + String(data.longitude, 6) + ",";
  }
  json += "\"timestamp\":\"" + String(millis()) + "\"";
  json += "}";
  return json;
}
