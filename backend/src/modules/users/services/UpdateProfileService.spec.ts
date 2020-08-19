import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../provider/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('Should be able to updated the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Guilherme',
      email: 'test@hotmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Riviana',
      email: 'riviana@test.com',
    });

    expect(updatedUser.name).toBe('Riviana');
    expect(updatedUser.email).toBe('riviana@test.com');
  });

  it('Should not be able to change the email aready used', async () => {
    await fakeUserRepository.create({
      name: 'Guilherme',
      email: 'test233@hotmail.com',
      password: '123456',
    });

    const user = await fakeUserRepository.create({
      name: 'Guilherme',
      email: 'test@hotmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Riviana',
        email: 'test233@hotmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to updated the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Guilherme',
      email: 'test@hotmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Riviana',
      email: 'riviana@test.com',
      old_password: '123456',
      password: '12122323',
    });

    expect(updatedUser.password).toBe('12122323');
  });

  it('Should not be able to updated the password without old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Guilherme',
      email: 'test@hotmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Riviana',
        email: 'riviana@test.com',
        password: '12122323',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to updated the password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Guilherme',
      email: 'test@hotmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Riviana',
        email: 'riviana@test.com',
        old_password: 'wrong-old-password',
        password: '12122323',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
