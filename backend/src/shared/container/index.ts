import { container } from 'tsyringe';
import '@modules/users/provider/';
import './providers';
import iAppointmentsRepository from '@modules/appointments/repositories/iAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/Appointments.repository';

import iUsersRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

// import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
// import UsersRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<iAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<iUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
