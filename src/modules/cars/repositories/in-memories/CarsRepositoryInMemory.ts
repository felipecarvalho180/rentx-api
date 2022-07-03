import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, data);

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAvalable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]> {
    return this.cars
      .filter(car => car.available)
      .filter(
        car =>
          (brand && brand === car.brand) ||
          (category_id && category_id === car.category_id) ||
          (name && name === car.name) ||
          (!name && !category_id && !brand),
      );
  }

  async findById(car_id: string): Promise<Car> {
    return this.cars.find(car => car.id === car_id);
  }
}

export { CarsRepositoryInMemory };
