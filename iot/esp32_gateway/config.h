#ifndef CONFIG_H
#define CONFIG_H

// WiFi credentials
const char* ssid = "YourWiFiSSID";         // Replace with your WiFi SSID
const char* password = "YourWiFiPassword";  // Replace with your WiFi password

// MQTT Broker settings
const char* mqtt_server = "localhost";      // Replace with your MQTT broker IP
const int mqtt_port = 1883;
const char* mqtt_topic = "supply-chain/pharmaceuticals";  // Topic specific to pharmaceuticals

#endif
