import { Router } from 'express';
import { classToClass } from 'class-transformer';

import { createUserValidation } from './middlewares/usersValidations';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', createUserValidation, async (request, response) => {
  const { username, password } = request.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({
    username,
    password,
  });

  return response.json(classToClass(user));
});

export default usersRouter;
