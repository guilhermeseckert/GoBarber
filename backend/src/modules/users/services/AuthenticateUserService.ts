import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    password,
  }: IRequest): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('incorret email/password combination', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('incorret email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
