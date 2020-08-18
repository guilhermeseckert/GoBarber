import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../provider/HashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
  token: string;
  password: string;
}
@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('UserTokenRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('user token does not exists ');
    }
    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('user does not exists ');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('token expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.userRepository.save(user);
  }
}

export default ResetPasswordService;
