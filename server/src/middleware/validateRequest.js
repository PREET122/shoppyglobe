import { validationResult } from 'express-validator';

export const validateRequest = (req, _res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    next();
    return;
  }

  const error = new Error('Validation failed');
  error.statusCode = 400;
  error.details = errors.array();
  error.message = errors
    .array()
    .map((entry) => entry.msg)
    .join(', ');

  next(error);
};
