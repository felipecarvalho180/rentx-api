import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memories/CarsRepositoryInMemory';

import { ListCarsUseCase } from './ListCarsUseCase';

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
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

  const car2 = {
    name: 'Name Car 2',
    description: 'Description Car',
    daily_rate: 100,
    license_plate: 'CBA-1234',
    fine_amount: 60,
    brand: 'Brand2',
    category_id: 'category2',
  };

  it('should be able to list all cars', async () => {
    await carsRepositoryInMemory.create(car1);
    await carsRepositoryInMemory.create(car2);

    const cars = await listCarsUseCase.execute({});

    expect(cars).toHaveLength(2);
  });

  it('should be able to list all cars by name', async () => {
    await carsRepositoryInMemory.create(car1);
    await carsRepositoryInMemory.create(car2);

    const cars = await listCarsUseCase.execute({ name: car1.name });

    expect(cars).toHaveLength(1);
  });
  it('should be able to list all cars by brand', async () => {
    await carsRepositoryInMemory.create(car1);
    await carsRepositoryInMemory.create(car2);

    const cars = await listCarsUseCase.execute({ brand: car1.brand });

    expect(cars).toHaveLength(1);
  });
  it('should be able to list all cars by category', async () => {
    await carsRepositoryInMemory.create(car1);
    await carsRepositoryInMemory.create(car2);

    const cars = await listCarsUseCase.execute({
      category_id: car1.category_id,
    });

    expect(cars).toHaveLength(1);
  });
});
