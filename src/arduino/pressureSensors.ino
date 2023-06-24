#include <Firebase_Arduino_WiFiNINA_HTTPClient.h>
#include <Firebase_Arduino_WiFiNINA.h>
#include <Arduino_LSM6DS3.h>

#define FIREBASE_HOST
#define FIREBASE_AUTH

#define WIFI_SSID
#define WIFI_PASSWORD

FirebaseData firebaseData;

#define sensorPin1 A0
#define sensorPin2 A1
#define sensorPin3 A2
#define sensorPin4 A3

String path = "/pressure";
String jsonStr;

void setup() {
  Serial.begin(115200);

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

  int x1=analogRead(sensorPin1);
  int x2=analogRead(sensorPin2);
  int x3=analogRead(sensorPin3);
  int x4=analogRead(sensorPin4);

  Serial.println("Sensor 1");
  Serial.println(x1);
  delay(500);
  Serial.println("Sensor 2");
  Serial.println(x2);
  delay(500);
  Serial.println("Sensor 3");
  Serial.println(x3);
  delay(500);
  Serial.println("Sensor 4");
  Serial.println(x4);
  delay(500);

    if (x1>0 && Firebase.setFloat(firebaseData, path + "Sensor1", x1)) {
          Serial.println(firebaseData.dataPath() + " = " + x1);
    }

    if (x2>0 && Firebase.setFloat(firebaseData, path + "Sensor2", x2)) {
          Serial.println(firebaseData.dataPath() + " = " + x2);
    }

    if (x3>0 && Firebase.setFloat(firebaseData, path + "Sensor3", x3)) {
          Serial.println(firebaseData.dataPath() + " = " + x3);
    }

    if (x4>0 && Firebase.setFloat(firebaseData, path + "Sensor4", x4)) {
      Serial.println(firebaseData.dataPath() + " = " + x4);
    }

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