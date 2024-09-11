import express from 'express'
import { pinoHttp } from 'pino-http'

import type { MongoClient } from '../db/mongo/client'
import type { PinoLogger } from '../log/pino/logger'
import { ExpressRouter } from '../router/router'

export class ExpressServer {
  private _app: express.Express
  private _port: number
  private _mongoClient: MongoClient
  private _logger: PinoLogger

  constructor(port: number, mongoClient: MongoClient, logger: PinoLogger) {
    this._app = express()
    this._port = port
    this._mongoClient = mongoClient
    this._logger = logger
  }

  /**
   * サーバーの起動
   */
  public start() {
    try {
      this._app.use(express.json()) // JSONをパースするミドルウェア
      this._app.use(express.urlencoded({ extended: true })) // URLエンコードされたデータをパースするミドルウェア
      this._app.use(pinoHttp({ logger: this._logger.getLogger() })) // HTTPリクエスト・レスポンスのロギング

      // ルーティングの設定
      const router = new ExpressRouter(this._mongoClient, this._logger)
      this._app.use('/api',router.getRouter())

      this._app.listen(this._port, () => {
        this._logger.info(`Server is running on http://localhost:${this._port}`)
      })
    } catch (error) {
      this._logger.error(new Error(`Failed to start server: ${error}`))
      process.exit(1)
    }
  }
}
