// import http from 'http'
import express from 'express'
import { ExpressRouter } from './router'
import type { MongoClient } from '../db/mongo/client'

export class ExpressServer {
  private _app: express.Express
  private _port: number
  private _db: MongoClient
  // private _logger: any
  // private _server: http.Server


  constructor(port: number, db: MongoClient) {
    this._app = express()
    this._port = port
    this._db = db
    // this._logger = logger
  }

  async start(): Promise<void> {
    this._app.get('/', (_, res) => {
      res.send('Hello World!')
    })

    const router = new ExpressRouter(this._db)
    const authRouter = await router.AuthRouter()
    
    this._app.use(authRouter)


    this._app.listen(this._port, () => {
      console.log(`Server listening on port ${this._port}`)
    })
  }
}
