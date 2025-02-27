import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';

import User from '../database/models/User';
import AppError from '../errors/AppError';

interface Request {
  username: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ username, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { username } });

    if (!user) {
      throw new AppError({
        message: 'Incorrect username/password combination',
        statusCode: 401,
      });
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError({
        message: 'Incorrect username/password combination',
        statusCode: 401,
      });
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;
