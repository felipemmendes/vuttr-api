import { RedisOptions } from 'ioredis';

interface RedisConfig {
  options: RedisOptions;
}

export default {
  options: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS || undefined,
  },
} as RedisConfig;
