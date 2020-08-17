import { Router } from 'express';

import ensureAuthenticated from './middlewares/ensureAuthenticated';

import CreateToolService from '../services/CreateToolService';
import ListToolsService from '../services/ListToolsService';
import DeleteToolService from '../services/DeleteToolService';

const toolsRouter = Router();

toolsRouter.use(ensureAuthenticated);

toolsRouter.get('/', async (request, response) => {
  const { user_id } = request.user;
  const { q, tags_like, page } = request.query;
  const query = {
    q: q as string,
    tags_like: tags_like as string,
    page: Number(page),
  };
  const listTool = new ListToolsService();

  const tools = await listTool.execute({ user_id, query });

  return response.json(tools);
});

toolsRouter.post('/', async (request, response) => {
  const { user_id } = request.user;
  const { title, link, description, tags } = request.body;

  const createTool = new CreateToolService();

  const tool = await createTool.execute({
    user_id,
    title,
    link,
    description,
    tags,
  });

  return response.json(tool);
});

toolsRouter.delete('/:tool_id', async (request, response) => {
  const { user_id } = request.user;
  const { tool_id } = request.params;

  const deleteTool = new DeleteToolService();

  await deleteTool.execute({ user_id, tool_id });

  return response.status(200).json({});
});

export default toolsRouter;
