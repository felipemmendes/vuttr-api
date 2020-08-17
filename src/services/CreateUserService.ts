import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../database/models/User';
import AppError from '../errors/AppError';

interface Request {
  username: string;
  password: string;
}

class CreateUserService {
  public async execute({ username, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const usernameExists = await usersRepository.findOne({
      where: { username },
    });

    if (usernameExists) {
      throw new AppError({
        message: 'Username not available',
        statusCode: 409,
      });
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      username,
      password: passwordHash,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
