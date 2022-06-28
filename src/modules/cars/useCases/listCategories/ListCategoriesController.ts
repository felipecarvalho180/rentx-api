import { ListCategoriesUseCase } from '@modules/cars/useCases/listCategories/ListCategoriesUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListCategoriesController {
  async handler(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    const all = await listCategoriesUseCase.execute();

    return response.json(all);
  }
}

export { ListCategoriesController };
