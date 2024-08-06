import type { SignUpUseCase } from '../../../usecase/auth/signup_usecase'

export class SignUpController {
  private _usecase: SignUpUseCase
  constructor(usecase: SignUpUseCase) {
    this._usecase = usecase
  }

  public async execute(body: {}): Promise<void> {
    const res = await this._usecase.execute(body) 
    
  }
}
