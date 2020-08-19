import 'reflect-metadata';
// import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import iAppointmentsRepository from '../repositories/iAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvalibilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: iAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      },
    );

    console.log(appointments);

    return [{ day: 1, available: false }];
  }
}

export default ListProviderMonthAvalibilityService;
