import express from 'express';
import mongoose from 'mongoose';

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { productValidator } from '../validators/productValidators.js';

const router = express.Router();

router.param('id', (req, _res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('Invalid product ID');
    error.statusCode = 400;
    next(error);
    return;
  }

  next();
});

router.get('/', getProducts);
router.post('/', productValidator, validateRequest, createProduct);
router.get('/:id', getProductById);
router.put('/:id', productValidator, validateRequest, updateProduct);
router.delete('/:id', deleteProduct);

export default router;
