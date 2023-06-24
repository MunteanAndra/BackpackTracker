/*
 Arduino pin 2 -> HX711 CLK
 Arduino pin 3 -> HX711 DOUT
 Arduino pin 5V -> HX711 VCC
 Arduino pin GND -> HX711 GND
*/

#include "HX711.h"
#include <Firebase_Arduino_WiFiNINA_HTTPClient.h>
#include <Firebase_Arduino_WiFiNINA.h>
#include <Arduino_LSM6DS3.h>

#define FIREBASE_HOST
#define FIREBASE_AUTH

#define WIFI_SSID
#define WIFI_PASSWORD

HX711 scale;
FirebaseData firebaseData;

String path = "/weightValues/weight";
String jsonStr;
float calibration_factor = 406;
float units;
float ounces;

void setup() {
  Serial.begin(9600);

  int status = WL_IDLE_STATUS;
  while (status != WL_CONNECTED) {
      status = WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
      Serial.print(".");
      delay(300);
  }
  Serial.print(" IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH, WIFI_SSID, WIFI_PASSWORD);
  Firebase.reconnectWiFi(true);

  Serial.println("HX711 calibration sketch");
  Serial.println("Remove all weight from scale");
  Serial.println("After readings begin, place known weight on scale");

  scale.begin(3, 2);
  scale.set_scale();
  scale.tare();
}

void loop() {

  scale.set_scale(calibration_factor);

  Serial.print("Reading: ");
  units = scale.get_units(), 10;

  if (units < 0)
  {
    units = 0.00;
  }
  ounces = units * 0.035274;
  Serial.print(units);
  Serial.print(" grams\n");

  if( units > 10 ) {
    if (Firebase.setFloat(firebaseData, path, units)) {
            Serial.println(firebaseData.dataPath() + units);
          }
          jsonStr = "{ }";
      if (Firebase.pushJSON(firebaseData, "2-pushJSON", jsonStr)) {
            Serial.println(firebaseData.dataPath() + " = " + firebaseData.pushName());
          }
      else {
            Serial.println("Error firebase: " + firebaseData.errorReason());
          }
          Serial.println();

  }
  delay(5000);
}