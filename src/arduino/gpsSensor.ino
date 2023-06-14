#include <TinyGPS++.h>

TinyGPSPlus gps;

#include <Firebase_Arduino_WiFiNINA_HTTPClient.h>
#include <Firebase_Arduino_WiFiNINA.h>
#include <Arduino_LSM6DS3.h>

// import env.txt

FirebaseData firebaseData;

String path = "/coordinates";
String jsonStr;

void setup() {
  Serial.begin(9600);
  Serial1.begin(9600);

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


void loop() {

  while (Serial1.available() > 0) {
    if (gps.encode(Serial1.read())) {

      if (gps.location.isValid()) {
        if (gps.time.isValid()) {
        int hourVal = gps.time.hour();
        int minuteVal = gps.time.minute();
        Serial.print("Time: ");
        Serial.print(hourVal);
        Serial.print(":");
        if (minuteVal < 10) {
          Serial.print("0");
        }
        Serial.println(minuteVal);
        if (Firebase.setFloat(firebaseData, path + "/hour", hourVal)) {
        Serial.println(firebaseData.dataPath() + " = " + hourVal);
        }

        if (Firebase.setFloat(firebaseData, path + "/minute", minuteVal)) {
        Serial.println(firebaseData.dataPath() + " = " + minuteVal);
        }
      }

        double latitude = gps.location.lat();
        double longitude = gps.location.lng();

        Serial.print("Latitude: ");
        Serial.println(latitude, 6);
        Serial.print("Longitude: ");
        Serial.println(longitude, 6);

        if (Firebase.setFloat(firebaseData, path + "/latitude", latitude)) {
          Serial.println(firebaseData.dataPath() + " = " + latitude);
        }

        if (Firebase.setFloat(firebaseData, path + "/longitude", longitude)) {
        Serial.println(firebaseData.dataPath() + " = " + longitude);
        }

        jsonStr = "{ }";
        if (Firebase.pushJSON(firebaseData, "2-pushJSON", jsonStr)) {
              Serial.println(firebaseData.dataPath() + " = " + firebaseData.pushName());
            }
        else {
              Serial.println("Error firebase: " + firebaseData.errorReason());
            }
            Serial.println();

        delay(10000);

      }
    }
  }
}