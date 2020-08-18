import { getRepository, Brackets } from 'typeorm';

import { cacheClient } from '../database/cache';
import Tool from '../database/models/Tool';

interface Request {
  user_id: string;
  query: {
    q: string;
    tags_like: string;
    page: number;
  };
}

class ListToolsService {
  public async execute({ user_id, query }: Request): Promise<Tool[]> {
    const toolsRepository = getRepository(Tool);
    const { q, tags_like, page } = query;
    const cacheKey = `user-tools:${user_id}:${q}-${tags_like}-${page}`;

    const cacheData = await cacheClient.get(cacheKey);

    if (cacheData) {
      const tools = JSON.parse(cacheData);

      return tools;
    }

    const qQuery = `%${q || tags_like || ''}%`;

    const tools = await toolsRepository
      .createQueryBuilder('tool')
      .where('tool.user_id = :user_id', { user_id })
      .andWhere(
        new Brackets(qb => {
          qb.where('tool.title ILIKE :qQuery', { qQuery })
            .orWhere('tool.link ILIKE :qQuery', { qQuery })
            .orWhere('tool.description ILIKE :qQuery', { qQuery })
            .orWhere(
              'EXISTS (SELECT FROM unnest(tool.tags) tags WHERE tags ILIKE :qQuery)',
              { qQuery },
            );
        }),
      )
      .orderBy('tool.created_at', 'DESC')
      .getMany();

    cacheClient.set(cacheKey, JSON.stringify(tools));

    return tools;
  }
}

export default ListToolsService;
