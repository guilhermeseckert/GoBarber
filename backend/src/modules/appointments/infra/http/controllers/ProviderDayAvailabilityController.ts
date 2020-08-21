import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvalibilityService from '@modules/appointments/services/ListProviderDayAvalibilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year, day } = request.body;

    const listProviderDayAvalibilityService = container.resolve(
      ListProviderDayAvalibilityService,
    );

    const avalibility = await listProviderDayAvalibilityService.execute({
      provider_id,
      month,
      year,
      day,
    });

    return response.json(avalibility);
  }
}
