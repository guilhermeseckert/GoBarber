import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/Appointments.repository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentServices';
import ensureAuthenticated from '@modules/users/infra/http/Middlewares/ensureAuthenticated';
// DTO

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);

  const createappointment = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createappointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
