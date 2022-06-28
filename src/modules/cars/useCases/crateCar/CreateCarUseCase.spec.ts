import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memories/CarsRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  const car = {
    name: 'Name Car',
    description: 'Description Car',
    daily_rate: 100,
    license_plate: 'ABC-1234',
    fine_amount: 60,
    brand: 'Brand',
    category_id: 'category',
  };
  it('should be able to create a new car', async () => {
    const createdCar = await createCarUseCase.execute(car);

    expect(createdCar).toHaveProperty('id');
  });

  it('should not be able to create a car with exists license plate', () => {
    expect(async () => {
      await createCarUseCase.execute(car);
      await createCarUseCase.execute(car);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a car with available true by default', async () => {
    const createdCar = await createCarUseCase.execute(car);

    expect(createdCar.available).toBe(true);
  });
});
