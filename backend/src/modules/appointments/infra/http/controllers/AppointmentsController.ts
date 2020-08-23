import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentServices';

export default class AppintmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const createappointment = container.resolve(CreateAppointmentService);

    const appointment = await createappointment.execute({
      date,
      provider_id,
      user_id,
    });

    return response.json(appointment);
  }
}
