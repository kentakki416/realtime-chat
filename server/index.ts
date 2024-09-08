import { MongoClient } from './src/4-infrastructure/db/mongo/client'
import { ExpressServer } from './src/4-infrastructure/server/server'

(async() => {
  const apiPort = 8080
  const mongoClient = new MongoClient()
  await mongoClient.connect()
  const apiServer = new ExpressServer(apiPort, mongoClient)
  apiServer.start()
})()
