#include <WiFi.h>
#include <HTTPClient.h>
//#include <Arduino_JSON.h>
#include <ArduinoJson.h>


int kelembabanPin = 32;
#define pHpin 33


void setup() {
  Serial.begin(115200);
  connectToWiFi("2022", "12121212");


}

void loop() {
  //  Serial.print("KELELEMBABAN : "); Serial.print(valueKelembaban()); Serial.print("   ");
  //  Serial.print("PH : "); Serial.print(valuePH()); Serial.println("   ");
  POST(valueKelembaban(), valuePH());
  delay(3000);
}


void connectToWiFi(char *ssid, char *password) {

  WiFi.begin(ssid, password);
  Serial.print("Trying to connect");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }
  Serial.print("Successfully connected on WiFi: "); Serial.println(WiFi.SSID());
  Serial.print("WiFi signal strength: "); Serial.println(WiFi.RSSI());
  Serial.print("IP Address: "); Serial.println(WiFi.localIP());

}

void parserMessage(String res) {
  DynamicJsonDocument doc(2048);
  deserializeJson(doc, res);
  const char* _message = doc["message"];
  const char* _name = doc["name"];
  Serial.print("message: ");
  Serial.println(_message);

  Serial.print("name: ");
  Serial.println(_name);
}

void POST(int hum, float pH) {
  HTTPClient http;
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Accept", "application/json");

  DynamicJsonDocument postMessage(2048);
  postMessage["Humidity"] = hum;
  postMessage["pH"] = pH;

  String jsonBody;
  serializeJson(postMessage, jsonBody);

  char *url = "http://192.168.88.248:8000/";

  http.begin(url);
  int resCode = http.POST(jsonBody);

  if (resCode > 0) {
    Serial.println("POST Data Success");
  } else {
    Serial.println("POST Data Failed");
  }

  Serial.println(resCode);

  String res = http.getString();
  Serial.println(res);

  //    parserMessage(res);

  http.end();

}




void postApi() {
  String url = "https://helda-app3.herokuapp.com/";
  WiFiClient client;
  HTTPClient http;
  String response;

  StaticJsonDocument<200> buff;
  String jsonParams;

  buff["userId"] = 100;
  buff["id"] = 100;
  buff["title"] = "Hello world";
  buff["body"] = "Hello";

  serializeJson(buff, jsonParams);
  //  Serial.println(jsonParams);

  http.begin(client, url);
  http.addHeader("Content-Type", "application/json");
  int httpResponseCode =  http.POST(String(jsonParams));

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("SUKSES");
    Serial.println(httpResponseCode);
    Serial.println(response);
  }
  else {
    Serial.println(httpResponseCode);
    Serial.println("Error on sending POST");
  }

  //  response = http.getString();
  //  Serial.println(response);

}

float valuePH() {
  float Po;
  Po = 4095 - analogRead(pHpin);
  Po = map(Po, 0, 4095, 3, 7.5);
  return Po;//
}

int valueKelembaban() {
  float kelembaban;
  kelembaban = 4095 - analogRead(kelembabanPin);
  kelembaban = map (kelembaban, 0, 4095, 5.0, 7.5);

  return kelembaban;
}



//void getApi() {
//  String url = "https://jsonplaceholder.typicode.com/users";
//  HTTPClient http;
//  String response;
//
//  http.begin(url);
//  http.GET();
//
//  response = http.getString();
//  for (int i = 0; i < sizeof(response); i++) {
//    Serial.println(response[i]["name"]);
//  }
//
//  delay(500);
//
//  StaticJsonDocument<1024> doc;
//  deserializeJson(doc, response);
//
//
//
//
//}
