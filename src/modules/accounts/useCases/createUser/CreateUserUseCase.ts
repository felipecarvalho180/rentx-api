import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import { ICreateUserDTO } from "../../dtos/ICreateUsersDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRespository: IUsersRepository,
  ) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = this.usersRespository.findByEmail(data.email);

    if (userAlreadyExists) throw new Error("User already exists");

    const passwordHash = await hash(data.password, 8);

    await this.usersRespository.create({
      ...data,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
