import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import { ICreateUserDTO } from "../../dtos/ICreateUsersDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRespository: IUsersRepository,
  ) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = this.usersRespository.findByEmail(data.email);

    if (userAlreadyExists) throw new AppError("User already exists", 409);

    const passwordHash = await hash(data.password, 8);

    await this.usersRespository.create({
      ...data,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
