import http from "http";
import Mongo from "./model/Mongo.js";
import dotenv from "dotenv";
dotenv.config()
//create a server object:

const handleDB = new Mongo(process.env.URI)
handleDB.Connect()


http.createServer(function (req, res) {
  switch (String(req.method)) {
    case "POST":
      console.log('POST /')
      let body = '';
      req.on('data', function (data) {
        body += data;
        let sensorData = JSON.parse(body)
        handleDB.Insert(sensorData)

        let msg = createMessage();
        let jsonStr = JSON.stringify(msg);
        res.write(jsonStr); //write a response to the client
        res.end(); //end the response
      });

      req.on('end', function () {
        console.log(JSON.parse(body));
      });
      break;

    case "GET":
      res.setHeader('Content-Type', 'application/json')
      console.log('GET /')
      SensorData(req, res)

      break;

    default:
      break;
  }


}).listen(process.env.PORT, () => console.log(`server listening on ${process.env.PORT}`)); //the server object listens on port 8080


function createMessage() {
  return {
    message: 'Sucsess',
    date: {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    }
  };
}

async function SensorData(req, res) {
  const add = []
  const x = await handleDB.List()
  add.push(...x)
  res.write(JSON.stringify(add))
  res.end()
  // return {
  //   message: 'Success',
  //   code: 200,
  //   data: add
  // }
}