import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../provider/HashProvider/fakes/FakeHashProvider';

import AuthenticateUseService from './AuthenticateUserService';
import CreateUserService from './CreateUserServices';

describe('AuthentiicateUser', () => {
  it('Should be able to autenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const authenticateUseService = new AuthenticateUseService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
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
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUseService = new AuthenticateUseService(
      fakeUserRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUseService.execute({
        email: 'gui@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to autenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const authenticateUseService = new AuthenticateUseService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'guilherme',
      email: 'gui@hotmail.com',
      password: '123456',
    });

    expect(
      authenticateUseService.execute({
        email: 'gui@hotmail.com',
        password: '323d',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
