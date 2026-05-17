import { notFoundMessage } from './errorHandler.js';

export const notFound = (_req, _res, next) => {
  const error = new Error(notFoundMessage);
  error.statusCode = 404;
  next(error);
};
