// import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderService from './ListProviderService';

let fakeUserRepository: FakeUserRepository;
let fakeCacheProvider: FakeCacheProvider;

let listProviderService: ListProviderService;

describe('listProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderService = new ListProviderService(
      fakeUserRepository,
      fakeCacheProvider,
    );
  });
  it('Should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'Guilherme',
      email: 'test@hotmail.com',
      password: '123456',
    });
    const user2 = await fakeUserRepository.create({
      name: 'John Tre',
      email: 'tedsdst@hotmail.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'John Qua',
      email: 'dsdddw@hotmail.com',
      password: '123456',
    });

    const providers = await listProviderService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
