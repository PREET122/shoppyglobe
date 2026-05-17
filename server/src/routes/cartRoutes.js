import express from 'express';

import {
  addToCart,
  getCartItems,
  removeCartItem,
  updateCartItemQuantity,
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {
  addToCartValidator,
  cartProductParamValidator,
  updateCartValidator,
} from '../validators/cartValidators.js';

const router = express.Router();

router.use(protect);

router.get('/', getCartItems);
router.post('/', addToCartValidator, validateRequest, addToCart);
router.put('/:productId', updateCartValidator, validateRequest, updateCartItemQuantity);
router.delete(
  '/:productId',
  cartProductParamValidator,
  validateRequest,
  removeCartItem,
);

export default router;
