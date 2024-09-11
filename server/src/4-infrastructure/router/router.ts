import { Router } from 'express'

import type { MongoClient } from '../db/mongo/client'
import type { PinoLogger } from '../log/pino/logger'

export class ExpressRouter {
  private _router: Router
  private _mongoClient: MongoClient
  private _logger: PinoLogger

  constructor(mongoClient: MongoClient, logger: PinoLogger) {
    this._router = Router()
    this._mongoClient = mongoClient
    this._logger = logger
    this._setupRoutes()
  }

  /**
   * ルーティングを設定
   */
  private _setupRoutes() {
    // TODO: ビルド時に使われていない変数があると失敗するので、回避策としてconsole.logで出力
    console.log(this._logger)
    console.log(this._mongoClient)
    this._router.use('/', (_, res) => {
      res.send('Hello World')
    })
  }

  /**
   * ルーターを返す
   */
  public getRouter(): Router {
    return this._router
  }
}
