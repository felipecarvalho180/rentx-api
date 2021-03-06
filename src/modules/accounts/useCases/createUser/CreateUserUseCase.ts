import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUsersDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRespository: IUsersRepository,
  ) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRespository.findByEmail(
      data.email,
    );

    if (userAlreadyExists) throw new AppError('User already exists', 409);

    const passwordHash = await hash(data.password, 8);

    await this.usersRespository.create({
      ...data,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
