import { body } from 'express-validator';

export const productValidator = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Product price must be a positive number'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Product description is required'),
  body('stockQuantity')
    .isInt({ min: 0 })
    .withMessage('Stock quantity must be zero or more'),
  body('category').optional().trim().notEmpty().withMessage('Category cannot be empty'),
  body('imageUrl').optional().isURL().withMessage('Image URL must be valid'),
];
