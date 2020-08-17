import Redis from 'ioredis';

const cacheClient = new Redis(process.env.REDIS_URL);

const invalidateCachePrefix = async (prefix: string): Promise<void> => {
  const keys = await cacheClient.keys(prefix);
  const pipeline = cacheClient.pipeline();

  keys.forEach(key => pipeline.del(key));

  await pipeline.exec();
};

export { cacheClient, invalidateCachePrefix };
