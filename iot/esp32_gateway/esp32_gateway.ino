#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <SoftwareSerial.h>

// WiFi credentials
const char* ssid = "YourWiFiSSID";
const char* password = "YourWiFiPassword";

// MQTT Broker settings
const char* mqtt_server = "localhost";
const int mqtt_port = 1883;
const char* mqtt_topic = "supply-chain/sensor-data";

// GSM Module settings
#define GSM_RX 16
#define GSM_TX 17
#define ARDUINO_RX 18
#define ARDUINO_TX 19

WiFiClient espClient;
PubSubClient client(espClient);
SoftwareSerial gsmSerial(GSM_RX, GSM_TX);
SoftwareSerial arduinoSerial(ARDUINO_RX, ARDUINO_TX);

void setup_wifi() {
  delay(10);
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP32Client-" + String(random(0xffff), HEX);
    
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" retrying in 5 seconds");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  arduinoSerial.begin(9600);
  gsmSerial.begin(9600);
  
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  
  Serial.println("ESP32 Gateway Initialized");
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Read data from Arduino
  if (arduinoSerial.available()) {
    String data = arduinoSerial.readStringUntil('\n');
    
    // Send via MQTT
    client.publish(mqtt_topic, data.c_str());
    
    // Send via GSM as backup
    sendGSMData(data);
    
    Serial.println("Data forwarded: " + data);
  }
}

void sendGSMData(String data) {
  // AT commands for GSM module
  gsmSerial.println("AT+HTTPINIT");
  delay(1000);
  gsmSerial.println("AT+HTTPPARA=\"URL\",\"your-api-endpoint\"");
  delay(1000);
  gsmSerial.println("AT+HTTPPARA=\"CONTENT\",\"application/json\"");
  delay(1000);
  gsmSerial.println("AT+HTTPDATA=" + String(data.length()) + ",10000");
  delay(1000);
  gsmSerial.println(data);
  delay(1000);
  gsmSerial.println("AT+HTTPACTION=1");
  delay(5000);
}
