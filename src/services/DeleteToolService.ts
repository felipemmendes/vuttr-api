import { getRepository } from 'typeorm';

import { invalidateCachePrefix } from '../database/cache';

import AppError from '../errors/AppError';
import Tool from '../database/models/Tool';

interface Request {
  user_id: string;
  tool_id: string;
}

class DeleteToolService {
  public async execute({ user_id, tool_id }: Request): Promise<void> {
    const toolsRepository = getRepository(Tool);

    const tool = await toolsRepository.findOne({
      where: {
        user_id,
        id: tool_id,
      },
    });

    if (!tool) {
      throw new AppError({ message: 'Tool not found.', statusCode: 404 });
    }

    await toolsRepository.delete({
      id: tool_id,
      user_id,
    });

    await invalidateCachePrefix(`user-tools:${user_id}:*`);
  }
}

export default DeleteToolService;
