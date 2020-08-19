import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentServices';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });
  it('Should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '1212212',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1212212');
  });

  it('should not be able to create a two appointment on the same time', async () => {
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
