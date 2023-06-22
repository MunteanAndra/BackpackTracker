
#include "HX711.h"
#include <Firebase_Arduino_WiFiNINA_HTTPClient.h>
#include <Firebase_Arduino_WiFiNINA.h>
#include <Arduino_LSM6DS3.h>

// env.txt

HX711 scale;
FirebaseData firebaseData;

String path = "/weightValues";
String jsonStr;
float calibration_factor = 406; // this calibration factor is adjusted according to my load cell
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
  Serial.println("Press + or a to increase calibration factor");
  Serial.println("Press - or z to decrease calibration factor");

  scale.begin(3, 2);
  scale.set_scale();
  scale.tare();  //Reset the scale to 0
}

void loop() {

  scale.set_scale(calibration_factor); //Adjust to this calibration factor
  int y=1;

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
    float aux = units;
    if (Firebase.pushFloat(firebaseData, path, units)) {
            Serial.println(firebaseData.dataPath() + units);
          }
          y++;
      // Push data using pushJSON
          jsonStr = "{ }";
      if (Firebase.pushJSON(firebaseData, "2-pushJSON", jsonStr)) {
            Serial.println(firebaseData.dataPath() + " = " + firebaseData.pushName());
          }
      else {
            Serial.println("Error firebase: " + firebaseData.errorReason());
          }
          Serial.println();

  }
  delay(3000);
}