import AppError from '@shared/errors/AppError';
import path from 'path';
import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
  email: string;
}
@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('MailProvider')
    private iMailProvider: IMailProvider,

    @inject('UserTokenRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const { token } = await this.userTokensRepository.generate(user.id);
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'Forgot_password.hbs',
    );

    await this.iMailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Reset password',
      templateData: {
        file: forgotPasswordTemplate,
        variable: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
