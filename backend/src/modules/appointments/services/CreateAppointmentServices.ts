import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/iAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const AppointmentDate = startOfHour(date);

    const findAppointmentInsameDate = await this.appointmentsRepository.fidBbyDate(
      AppointmentDate,
    );

    if (findAppointmentInsameDate) {
      throw new AppError('this appointment is already booked');
    }
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: AppointmentDate,
    });

    return appointment;
  }
}
export default CreateAppointmentService;
