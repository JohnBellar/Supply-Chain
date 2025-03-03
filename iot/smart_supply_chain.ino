#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <ArduinoJson.h>

// WiFi credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// MQTT Broker settings
const char* mqtt_server = "YOUR_MQTT_BROKER";
const int mqtt_port = 1883;
const char* mqtt_topic = "sensor/data";
const char* mqtt_client_id = "ESP8266Client";  // Added client ID

// Pin definitions
#define DHTPIN 4        // DHT22 data pin (D2)
#define DHTTYPE DHT22   // DHT22 sensor type
#define GPS_RX 12       // GPS RX pin (D6)
#define GPS_TX 14       // GPS TX pin (D5)

// Initialize components
DHT dht(DHTPIN, DHTTYPE);
SoftwareSerial gpsSerial(GPS_RX, GPS_TX);
TinyGPSPlus gps;
WiFiClient espClient;
PubSubClient client(espClient);

// Variables for sensor data
float temperature = 0.0;
float humidity = 0.0;
float latitude = 0.0;
float longitude = 0.0;
unsigned long lastReadTime = 0;
const unsigned long READ_INTERVAL = 5000;  // 5 seconds

void setup() {
  Serial.begin(115200);
  gpsSerial.begin(9600);
  dht.begin();
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  
  // Configure MQTT
  client.setServer(mqtt_server, mqtt_port);
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect with client ID
    if (client.connect(mqtt_client_id)) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" retrying in 5 seconds");
      delay(5000);
    }
  }
}

bool readSensors() {
  // Read DHT22 sensor
  float newTemp = dht.readTemperature();
  float newHum = dht.readHumidity();
  
  // Check if readings are valid
  if (isnan(newTemp) || isnan(newHum)) {
    Serial.println("Failed to read from DHT sensor!");
    return false;
  }
  
  temperature = newTemp;
  humidity = newHum;
  
  // Read GPS data
  bool newGPSData = false;
  unsigned long startTime = millis();
  
  // Try reading GPS for up to 1 second
  while (millis() - startTime < 1000) {
    while (gpsSerial.available() > 0) {
      if (gps.encode(gpsSerial.read())) {
        if (gps.location.isValid()) {
          latitude = gps.location.lat();
          longitude = gps.location.lng();
          newGPSData = true;
        }
      }
    }
    if (newGPSData) break;
  }
  
  return true;
}

void publishData() {
  StaticJsonDocument<200> doc;
  doc["temperature"] = temperature;
  doc["humidity"] = humidity;
  doc["latitude"] = latitude;
  doc["longitude"] = longitude;
  doc["timestamp"] = millis();
  
  char buffer[200];
  serializeJson(doc, buffer);
  
  if (client.publish(mqtt_topic, buffer)) {
    Serial.println("Data published successfully");
  } else {
    Serial.println("Failed to publish data");
  }
}

void loop() {
  // Handle WiFi connection
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi connection lost. Reconnecting...");
    WiFi.begin(ssid, password);
    return;
  }
  
  // Handle MQTT connection
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  
  // Read sensors at intervals
  unsigned long currentTime = millis();
  if (currentTime - lastReadTime >= READ_INTERVAL) {
    if (readSensors()) {
      publishData();
      
      // Debug output
      Serial.println("Data published:");
      Serial.print("Temperature: ");
      Serial.print(temperature);
      Serial.println(" °C");
      Serial.print("Humidity: ");
      Serial.print(humidity);
      Serial.println(" %");
      Serial.print("Location: ");
      Serial.print(latitude, 6);
      Serial.print(", ");
      Serial.println(longitude, 6);
    }
    lastReadTime = currentTime;
  }
}
