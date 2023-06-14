#include <Firebase_Arduino_WiFiNINA_HTTPClient.h>
#include <Firebase_Arduino_WiFiNINA.h>
#include <Arduino_LSM6DS3.h>
#include "HX711.h"

// import env.txt

#define calibration_factor -7050.0 //This value is obtained using the SparkFun_HX711_Calibration sketch

#define LOADCELL_DOUT_PIN  3
#define LOADCELL_SCK_PIN  2

FirebaseData firebaseData;
HX711 scale;

String path = "/calibrated";
String jsonStr;
int y;

void setup()
{
  Serial.begin(9600);
  delay(1000);
  Serial.println();
  Serial.println("HX711 scale demo");

  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  scale.set_scale(calibration_factor); //This value is obtained by using the SparkFun_HX711_Calibration sketch
  scale.tare(); //Assuming there is no weight on the scale at start up, reset the scale to 0

  Serial.print("Connecting to WiFi...");

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
}

void loop()
{
    float x;
    x =  0.454 * scale.get_units();
    y++;

    Serial.print("Reading: ");
    Serial.print(0.454 * scale.get_units(), 1);
    Serial.print(" kg");
    Serial.println();

    // Send data to Firebase with specific path
    if (Firebase.setFloat(firebaseData, path + "Weight", x)) {
          Serial.println(firebaseData.dataPath() + y + " = " + x);
        }

    // Push data using pushJSON
        jsonStr = "{ }";
    if (Firebase.pushJSON(firebaseData, "2-pushJSON", jsonStr)) {
          Serial.println(firebaseData.dataPath() + " = " + firebaseData.pushName());
        }
    else {
          Serial.println("Error firebase: " + firebaseData.errorReason());
        }
        Serial.println();
    delay(2000);

}