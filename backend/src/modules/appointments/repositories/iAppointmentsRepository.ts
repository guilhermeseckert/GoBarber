import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  fidBbyDate(date: Date): Promise<Appointment | undefined>;
}
