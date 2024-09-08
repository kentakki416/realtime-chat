import express from 'express'

import type { MongoClient } from '../db/mongo/client'
import { ExpressRouter } from '../router/router'

export class ExpressServer {
  private _app: express.Express
  private _port: number
  private _mongoClient: MongoClient

  constructor(port: number, mongoClient: MongoClient) {
    this._app = express()
    this._port = port
    this._mongoClient = mongoClient
  }

  /**
   * サーバーの起動
   */
  public start() {
    try {
      this._app.use(express.json()) // JSONをパースするミドルウェア
      this._app.use(express.urlencoded({ extended: true })) // URLエンコードされたデータをパースするミドルウェア

      // ルーティングの設定
      const router = new ExpressRouter(this._mongoClient)
      this._app.use('/api',router.getRouter())

      this._app.listen(this._port, () => {
        console.log(`Server is running on http://localhost:${this._port}`)
      })
    } catch (error) {
      console.error(`Failed to start server: ${error}`)
      process.exit(1)
    }
  }
}
