import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memories/CarsRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
    );
  });

  const car1 = {
    name: 'Name Car',
    description: 'Description Car',
    daily_rate: 100,
    license_plate: 'ABC-1234',
    fine_amount: 60,
    brand: 'Brand',
    category_id: 'category1',
  };

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create(car1);

    const specifications_id = ['123', '321'];

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
  });

  it('should not be able to add a new specification when not found a car', () => {
    expect(async () => {
      const car_id = '123';
      const specifications_id = ['123', '321'];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
