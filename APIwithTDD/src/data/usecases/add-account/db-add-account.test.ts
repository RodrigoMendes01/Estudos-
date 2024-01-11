import { DbAddAccount } from './db-add-account'

describe('DbAddAccount Usecase', () => {
  test('Should call Encrpter with correct password', async () => {
    class EncrypterStub {
      async encrypt (value: string): Promise<string> {
        return await new Promise(resolve => { resolve('hashed_password') })
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const accounData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(accounData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
