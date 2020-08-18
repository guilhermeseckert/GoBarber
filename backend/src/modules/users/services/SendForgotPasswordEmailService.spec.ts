// import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('Should be able to recover the password using the email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
    );

    await fakeUserRepository.create({
      name: 'guilherme',
      email: 'guilherme@hotmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'guilherme@hotmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
