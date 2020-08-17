import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import './database';
import celebrateErrors from './routes/middlewares/celebrateErrors';
import exceptionHandler from './routes/middlewares/exceptionHandler';
import rateLimiter from './routes/middlewares/rateLimiter';

const app = express();

app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  }),
);
app.use(express.json());
app.use(rateLimiter);
app.use(routes);
app.use(celebrateErrors());
app.use(exceptionHandler());

app.listen(process.env.PORT || 3333, () =>
  console.log('Server is running on port 3333!'),
);
