import {Router} from 'express'
import type { MongoClient } from '../db/mongo/client'

export class ExpressRouter {
  private _router: Router
  private _db: MongoClient

  constructor(db: MongoClient) {
    this._db = db
    this._router = Router()
  }

  public async AuthRouter(): Promise<Router> {
    const db = this._db.getDb(process.env.DB_NAME || 'test')

    this._router.get('/auth/signup', (_, res) => {
      const userRepo = new UserRepository(db)
      const usecase = new SignUpUseCase()
      res.send('signup')
    })
    this._router.get('/auth/login', (_, res) => {
      res.send('login')
    })
    this._router.get('/auth/logout', (_, res) => {
      res.send('logout')
    })



    return this._router
  }
}
