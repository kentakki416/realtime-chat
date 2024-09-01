import { Router } from 'express'

export class ExpressRouter {
  private _router: Router

  constructor() {
    this._router = Router()
    this._setupRoutes()
  }

  /**
   * ルーティングを設定
   */
  private _setupRoutes() {
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
