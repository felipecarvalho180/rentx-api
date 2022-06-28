import { ImportCategoryUseCase } from '@modules/cars/useCases/importCategory/ImportCategoryUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ImportCategoryController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importCategoryUseCase = await container.resolve(
      ImportCategoryUseCase,
    );
    importCategoryUseCase.execute(file);

    return response.status(201).send();
  }
}

export { ImportCategoryController };
