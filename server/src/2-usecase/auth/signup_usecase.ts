import type { Controller } from '../../../types'
import { User, userBisinessRule } from '../../1-domain/entity/user'
import { UserDomainService } from '../../1-domain/service/user/check_name_duplicate'
import type { IHash } from '../../3-adapter/interface/ihash'
import type { ILogger } from '../../3-adapter/interface/ilogger'
import type { IUserRepository } from '../../3-adapter/interface/repository/iuser_repository'

export class SignupUsecase {
  private _userRepo: IUserRepository
  private _logger: ILogger
  private _hash: IHash

  constructor(userRepo: IUserRepository, logger: ILogger, hash: IHash) {
    this._userRepo = userRepo
    this._logger = logger
    this._hash = hash
  }

  public async exucute(body: Controller.SignupRequest): Promise<User> {
    try {
      // ハッシュ化前のパスワードのチェック
      if (userBisinessRule.checkPasswordLength(body.password)) {
        throw new Error('パスワードは5文字以上12文字以下である必要があります')
      }
      // パスワードが一致しているかの確認
      if (body.password !== body.confirmPassword) {
        throw new Error('パスワードが一致しません')
      }
      // ユーザー名が重複していないかの確認
      const userDomainService = new UserDomainService(this._userRepo)
      if (!await userDomainService.checkNameDuplicate(body.name)) {
        throw new Error('ユーザー名が重複しています')
      }

      // パスワードのハッシュ化
      const hash = await this._hash.passwordToHash(body.password)

      // プロフィール画像の設定 https://avatar-placeholder.iran.liara.run/
      const profilePic = `https://avatar-placeholder.iran.liara.run/public/${body.gender}?${body.name}`

      // ユーザー情報の保存
      const user = new User(body.name, hash, body.gender, profilePic)
      const userId = await this._userRepo.save(user)
      user.userId = userId
      return user
    } catch(error) {
      this._logger.error(error as Error)
      throw error
    }
  }
}
