import { body, param } from 'express-validator';

export const addToCartValidator = [
  body('productId').isMongoId().withMessage('A valid productId is required'),
  body('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive number'),
];

export const updateCartValidator = [
  param('productId').isMongoId().withMessage('A valid productId is required'),
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive number'),
];

export const cartProductParamValidator = [
  param('productId').isMongoId().withMessage('A valid productId is required'),
];
