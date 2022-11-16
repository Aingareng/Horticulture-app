
import { MongoClient } from "mongodb";


export default class Mongo {

  constructor(uri) {
    this._uri = uri
    this._client = new MongoClient(this._uri)

  }

  Connect() {

    this._client.connect()
      .then(client => {
        console.log("Database Connected")
      })
      .catch(err => console.error(err))

  }
  Insert(sensor) {
    const db = this._client.db(String(process.env.DB_NAME))
    const collections = db.collection(String(process.env.COLLECTION_NAME))
    collections.insertOne({
      date: new Date().toDateString(),
      clock: new Date().toLocaleTimeString(),
      sensor,
    }).then(res => {
      console.log("Insert data success :", sensor)
      return res
    })
      .catch(err => console.error(err))
  }
  List() {

    const db = this._client.db(String(process.env.DB_NAME))
    const collections = db.collection(String(process.env.COLLECTION_NAME))

    return collections.find().toArray()
    // res.json(add).statusCode = 200

  }


}