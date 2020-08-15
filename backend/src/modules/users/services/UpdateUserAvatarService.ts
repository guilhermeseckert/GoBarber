import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import UploadConfig from '@config/upload';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(UploadConfig.directory, user.avatar);
      const userAvatarFilexists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFilexists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
