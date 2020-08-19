import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileServiice from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;

let showProfileService: ShowProfileServiice;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showProfileService = new ShowProfileServiice(fakeUserRepository);
  });
  it('Should be able to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Guilherme',
      email: 'test@hotmail.com',
      password: '123456',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Guilherme');
    expect(profile.email).toBe('test@hotmail.com');
  });

  it('Should not be able to show the profile from non-existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'no-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
