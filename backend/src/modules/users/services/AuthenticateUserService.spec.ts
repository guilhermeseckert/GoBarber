import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../provider/HashProvider/fakes/FakeHashProvider';

import AuthenticateUseService from './AuthenticateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUseService: AuthenticateUseService;

describe('AuthentiicateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUseService = new AuthenticateUseService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('Should be able to autenticate', async () => {
    const user = await fakeUserRepository.create({
      name: 'guilherme',
      email: 'gui@hotmail.com',
      password: '123456',
    });

    const response = await authenticateUseService.execute({
      email: 'gui@hotmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('Should be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUseService.execute({
        email: 'gui@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to autenticate with wrong password', async () => {
    await fakeUserRepository.create({
      name: 'guilherme',
      email: 'gui@hotmail.com',
      password: '123456',
    });

    await expect(
      authenticateUseService.execute({
        email: 'gui@hotmail.com',
        password: '323d',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
