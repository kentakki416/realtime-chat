import { type Collection, type Db } from 'mongodb'
import * as uuid from 'uuid'

import type { UserCollection } from '../../../../../types/mongo'
import { User } from '../../../../1-domain/entity/user'
import type { ILogger } from '../../../../3-adapter/interface/ilogger'
import type { IUserRepository } from '../../../../3-adapter/interface/repository/iuser_repository'

export class UserRepository implements IUserRepository {
  private _collection: Collection<UserCollection>
  private _logger: ILogger
  constructor(db: Db, logger: ILogger) {
    this._collection = db.collection('User')
    this._logger = logger
  }

  /**
   * ユーザー情報を取得
   */
  public async findOne(condition: any ) {
    try {
      const result = await this._collection.findOne(condition)
      if (!result || Object.keys(result).length === 0 ) {
        return null
      }
      return new User(result.name, result.password, result.gender, result.profilePic)
    } catch(error) {
      this._logger.error(new Error(`Failed to findOne condition: ${condition}`))
      throw error
    }
  }

  /**
   * ユーザー情報を保存
   */
  public async save(user: User) {
    try {
      const userId = uuid.v4()
      await this._collection.insertOne({
        id: userId,
        name: user.name,
        password: user.password,
        gender: user.gender,
        profilePic: user.profilePic
      })
      return userId
    } catch(error) {
      this._logger.error(new Error(`Failed to save user: ${user}`))
      throw error
    }
  }
}
