import { User } from '../../../src/1-domain/entity/user'

describe(__filename, () => {
  describe('【正常系', () => {
    test('ユーザーを作成できる'), () => {
      const name = 'test'
      const password = 'testPassword'
      const gender = 'male'
      const profilePic = 'http://example.com/profile.jpg'

      const user = new User(name, password, gender, profilePic)

      expect(user.name).toBe(name)
      expect(user.password).toBe(password)
      expect(user.gender).toBe(gender)
      expect(user.profilePic).toBe(profilePic)
    }
  })
})
