import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    let authenticateInfo;
    try {
      authenticateInfo = await authenticateUserUseCase.execute({
        email,
        password,
      });
    } catch (e) {
      return response.status(409).json({ error: e.message });
    }

    return response.status(200).json(authenticateInfo);
  }
}

export { AuthenticateUserController };
