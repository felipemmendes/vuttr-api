import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { isCelebrate, CelebrateInternalError } from 'celebrate';

type CelebrateError = CelebrateInternalError & Error;

const celebrateErrors = (): ErrorRequestHandler => {
  return (
    error: CelebrateError,
    _: Request,
    response: Response,
    next: NextFunction,
  ) => {
    if (!isCelebrate(error)) {
      return next(error);
    }

    const { joi } = error;

    return response
      .status(400)
      .json({ status: 'Input Error', message: joi.message });
  };
};

export default celebrateErrors;
