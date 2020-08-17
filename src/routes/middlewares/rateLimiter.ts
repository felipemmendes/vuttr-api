import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';

import AppError from '../../errors/AppError';

const rateLimiterRedis = new Redis(process.env.REDIS_URL);
const limiter = new RateLimiterRedis({
  storeClient: rateLimiterRedis,
  keyPrefix: 'rateLimit',
  points: 5,
  duration: 1,
});

export async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError({ message: 'Too many request', statusCode: 429 });
  }
}

export default rateLimiter;
