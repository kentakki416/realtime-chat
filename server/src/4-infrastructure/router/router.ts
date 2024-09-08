import { Router } from 'express'

import type { MongoClient } from '../db/mongo/client'

export class ExpressRouter {
  private _router: Router
  private _mongoClient: MongoClient

  constructor(mongoClient: MongoClient) {
    this._mongoClient = mongoClient
    this._router = Router()
    this._setupRoutes()
  }

  /**
   * ルーティングを設定
   */
  private _setupRoutes() {
    // TODO: MongoDBが必要なAPIルーターにmongoClientを渡す
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
