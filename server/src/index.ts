import dotenv from 'dotenv'
import { ExpressServer } from './infrastructure/server/server'
import { MongoClient } from './infrastructure/db/mongo/client'

(async () => {
  dotenv.config() // .envファイルを環境変数に反映
  const port = Number(process.env.PORT) || 8080
  const mongoClient = new MongoClient()
  await mongoClient.connect()
  const server = new ExpressServer(port, mongoClient)
  await server.start()
})()

