import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentServices';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('Should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '1212212',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1212212');
  });

  it('should not be able to create a two appointment on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 8, 10, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '1212212',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '1212212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
