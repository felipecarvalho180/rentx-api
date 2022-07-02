import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute(data: IRequest): Promise<Car> {
    const licensePlateAlreadyExists =
      await this.carsRepository.findByLicensePlate(data.license_plate);

    if (licensePlateAlreadyExists)
      throw new AppError('License Plate already exists', 409);

    const car = await this.carsRepository.create(data);

    return car;
  }
}

export { CreateCarUseCase };
