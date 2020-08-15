import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentServices';

export default class AppintmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const parsedDate = parseISO(date);

    const createappointment = container.resolve(CreateAppointmentService);

    const appointment = await createappointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  }
}
