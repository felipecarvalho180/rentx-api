import { CreateCarController } from '@modules/cars/useCases/crateCar/CreateCarController';
import { ListCarsController } from '@modules/cars/useCases/listCars/ListCarsController';
import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { ensureAdmin } from '../middlewares/ensureAdmin';

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.get('/', listCarsController.handle);

export { carsRoutes };
