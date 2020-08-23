import AppError from '@shared/errors/AppError';
import FakeNoticattionsRepository from '@modules/notifications/repositories/fakes/FakeNoticattionsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateAppointmentService from './CreateAppointmentServices';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNoticattionsRepository: FakeNoticattionsRepository;
let createAppointmentService: CreateAppointmentService;
let fakeCacheProvider: FakeCacheProvider;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNoticattionsRepository = new FakeNoticattionsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNoticattionsRepository,
      fakeCacheProvider,
    );
  });
  it('Should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointmentService.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '1234',
      provider_id: '1212212',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1212212');
  });

  it('should not be able to create a two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 8, 10, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      user_id: '1234',
      provider_id: '1212212',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        user_id: '1234',
        provider_id: '1212212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '1234',
        provider_id: '1212212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: '1212212',
        provider_id: '1212212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointment before 8am and after 6pm ', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 11, 7),
        user_id: '1212212',
        provider_id: '121322e',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 11, 18),
        user_id: '1212212',
        provider_id: '121322e',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
