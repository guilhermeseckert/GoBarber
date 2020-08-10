import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Appointment from '../models/Appointment';
import Appointmentsrepository from '../repositories/Appointments.repository';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(Appointmentsrepository);
    const AppointmentDate = startOfHour(date);

    const findAppointmentInsameDate = await appointmentsRepository.fidBbyDate(
      AppointmentDate,
    );

    if (findAppointmentInsameDate) {
      throw AppError('this appointment is already booked');
    }
    const appointment = appointmentsRepository.create({
      provider_id,
      date: AppointmentDate,
    });
    await appointmentsRepository.save(appointment);
    return appointment;
  }
}
export default CreateAppointmentService;
