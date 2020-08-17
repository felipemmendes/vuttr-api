import { Router } from 'express';
import { classToClass } from 'class-transformer';

import { sessionValidation } from './middlewares/usersValidations';
import CreateSessionService from '../services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', sessionValidation, async (request, response) => {
  const { username, password } = request.body;

  const createSessionService = new CreateSessionService();

  const { user, token } = await createSessionService.execute({
    username,
    password,
  });

  return response.json({ user: classToClass(user), token });
});

export default sessionsRouter;
