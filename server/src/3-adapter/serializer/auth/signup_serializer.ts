import { CONSTANT } from '../../../../constant'
import type { Response, SignupResponse } from '../../../../types/controller'
import type { User } from '../../../1-domain/entity/user'

export class SignupSerializer {
  /**
   * 正常系のレスポンスを生成
   */
  public execute(data: User): Response<SignupResponse> {
    return {
      status: CONSTANT.STATUS_CODE.SUCCESS,
      data: {
        id: data.userId,
        name: data.name,
        gender: data.gender,
        profilePic: data.profilePic,
      },
      responsedAt: new Date()
    }
  }

  /**
   * エラー系のレスポンスを生成
   */
  public error(error: Error): Response<object> {
    return {
      status : CONSTANT.STATUS_CODE.SERVER_ERROR,
      message: error.message,
      responsedAt: new Date(),
    }
  }
}
