import { getRepository } from 'typeorm';

import { invalidateCachePrefix } from '../database/cache';

import Tool from '../database/models/Tool';

interface Request {
  user_id: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
}

class CreateToolService {
  public async execute({
    user_id,
    title,
    link,
    description,
    tags,
  }: Request): Promise<Tool> {
    const toolsRepository = getRepository(Tool);

    const tool = toolsRepository.create({
      user_id,
      title,
      link,
      description,
      tags,
    });

    await toolsRepository.save(tool);

    await invalidateCachePrefix(`user-tools:${user_id}:*`);

    return tool;
  }
}

export default CreateToolService;
