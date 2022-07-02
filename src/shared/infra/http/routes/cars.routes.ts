import { CreateCarController } from '@modules/cars/useCases/crateCar/CreateCarController';
import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { ensureAdmin } from '../middlewares/ensureAdmin';

const carsRoutes = Router();
const createCarController = new CreateCarController();

carsRoutes.use(ensureAuthenticated);
carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

export { carsRoutes };
