import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserServices';
import FakeHashProvider from '../provider/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('Should be able to create a new User', async () => {
    const user = await createUserService.execute({
      name: 'Guilherme',
      email: 'guilherme@hotmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user with saame email from another', async () => {
    await createUserService.execute({
      name: 'Guilherme',
      email: 'guilherme@hotmail.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'Guilherme',
        email: 'guilherme@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
