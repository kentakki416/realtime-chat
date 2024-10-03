import { Router } from 'express'
import type { Db } from 'mongodb'

import { AuthRouter } from './auth_router'
import type { MongoClient } from '../db/mongo/client'
import type { PinoLogger } from '../log/pino/logger'

export class ExpressRouter {
  private _router: Router
  private _mongoClient: MongoClient
  private _db: Db
  private _logger: PinoLogger

  constructor(mongoClient: MongoClient, logger: PinoLogger) {
    this._router = Router()
    this._mongoClient = mongoClient
    this._db = this._mongoClient.getDb(process.env.DB_NAME || 'chat-app')
    this._logger = logger
    this._setupRoutes()
  }

  /**
   * ルーティングを設定
   */
  private _setupRoutes() {
    this._router.get('/', (_, res) => {
      res.send('Hello World')
    })
    const authRouter = new AuthRouter(this._router, this._db, this._logger)
    this._router.use('/api', authRouter.getRouter())
  }

  /**
   * ルーターを返す
   */
  public getRouter(): Router {
    return this._router
  }
}
