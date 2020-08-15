import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/IcreateUserDTO';

export default interface IUserRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(date: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
