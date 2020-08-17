import Redis from 'ioredis';

import cacheConfig from '../../config/cache';

const cacheClient = new Redis(cacheConfig.options);

const invalidateCachePrefix = async (prefix: string): Promise<void> => {
  const keys = await cacheClient.keys(prefix);
  const pipeline = cacheClient.pipeline();

  keys.forEach(key => pipeline.del(key));

  await pipeline.exec();
};

export { cacheClient, invalidateCachePrefix };
