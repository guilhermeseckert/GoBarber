import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvalibilityService from '@modules/appointments/services/ListProviderMonthAvalibilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.query;

    const listProviderMonthAvalibilityService = container.resolve(
      ListProviderMonthAvalibilityService,
    );

    const avalibility = await listProviderMonthAvalibilityService.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(avalibility);
  }
}
