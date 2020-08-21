import 'reflect-metadata';
import { startOfHour, isBefore, getHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/iAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
  user_id: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const AppointmentDate = startOfHour(date);

    if (isBefore(AppointmentDate, Date.now())) {
      throw new AppError('You can`t create an appointment on a past date ');
    }

    if (user_id === provider_id) {
      throw new AppError('You Can`t create an appointment with yourself ');
    }

    if (getHours(AppointmentDate) < 8 || getHours(AppointmentDate) > 18) {
      throw new AppError(
        'You Can`t create an appointment between 8am and 5 pm ',
      );
    }

    const findAppointmentInsameDate = await this.appointmentsRepository.fidBbyDate(
      AppointmentDate,
    );

    if (findAppointmentInsameDate) {
      throw new AppError('this appointment is already booked');
    }
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: AppointmentDate,
    });

    return appointment;
  }
}
export default CreateAppointmentService;
