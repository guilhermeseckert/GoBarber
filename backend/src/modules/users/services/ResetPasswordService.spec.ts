import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeIUserTokensRepository';
import FakeHashProvider from '../provider/HashProvider/fakes/FakeHashProvider';

import ResetPasswordService from './ResetPasswordService';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'guilherme',
      email: 'guilherme@hotmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    await resetPasswordService.execute({
      password: '12342',
      token,
    });

    const updatedUser = await fakeUserRepository.findById(user.id);
    expect(generateHash).toHaveBeenCalledWith('12342');
    expect(updatedUser?.password).toBe('12342');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing token',
        password: '122324334',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing user',
    );

    await expect(
      resetPasswordService.execute({
        token,
        password: '122324334',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset password if passed more than 2 hours', async () => {
    const user = await fakeUserRepository.create({
      name: 'guilherme',
      email: 'guilherme@hotmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: '12342444',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
