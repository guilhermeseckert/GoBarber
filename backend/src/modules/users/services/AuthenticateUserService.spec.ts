import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUseService from './AuthenticateUserService';
import CreateUserService from './CreateUserServices';

describe('AuthentiicateUser', () => {
  it('Should be able to autenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(fakeUserRepository);
    const authenticateUseService = new AuthenticateUseService(
      fakeUserRepository,
    );

    await createUserService.execute({
      name: 'guilherme',
      email: 'gui@hotmail.com',
      password: '123456',
    });

    const response = await authenticateUseService.execute({
      email: 'gui@hotmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });
});
