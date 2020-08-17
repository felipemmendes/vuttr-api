import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../../config/auth';
import AppError from '../../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError({ message: 'JWT token is missing', statusCode: 401 });
  }

  const [, token] = authorization.split(' ');
  const { secret } = authConfig.jwt;

  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      user_id: sub,
    };

    return next();
  } catch {
    throw new AppError({ message: 'Invalid JWT token', statusCode: 401 });
  }
}
