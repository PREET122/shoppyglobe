import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';
import asyncHandler from '../middleware/asyncHandler.js';

const calculateCartSummary = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.quantity * (item.product?.price || 0),
    0,
  );

  return { totalItems, totalPrice };
};

const getUserCart = async (userId) => {
  const items = await CartItem.find({ user: userId }).populate(
    'product',
    'name price description stockQuantity category imageUrl',
  );

  return {
    items,
    summary: calculateCartSummary(items),
  };
};

export const getCartItems = asyncHandler(async (req, res) => {
  const cart = await getUserCart(req.user._id);
  res.json(cart);
});

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  if (product.stockQuantity < quantity) {
    const error = new Error('Requested quantity exceeds available stock');
    error.statusCode = 400;
    throw error;
  }

  const existingItem = await CartItem.findOne({
    user: req.user._id,
    product: productId,
  });

  if (existingItem) {
    const updatedQuantity = existingItem.quantity + Number(quantity);

    if (product.stockQuantity < updatedQuantity) {
      const error = new Error('Requested quantity exceeds available stock');
      error.statusCode = 400;
      throw error;
    }

    existingItem.quantity = updatedQuantity;
    await existingItem.save();
  } else {
    await CartItem.create({
      user: req.user._id,
      product: productId,
      quantity,
    });
  }

  const cart = await getUserCart(req.user._id);

  res.status(201).json({
    message: 'Product added to cart',
    ...cart,
  });
});

export const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  const cartItem = await CartItem.findOne({
    user: req.user._id,
    product: productId,
  });

  if (!cartItem) {
    const error = new Error('Cart item not found');
    error.statusCode = 404;
    throw error;
  }

  const product = await Product.findById(productId);

  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  if (product.stockQuantity < quantity) {
    const error = new Error('Requested quantity exceeds available stock');
    error.statusCode = 400;
    throw error;
  }

  cartItem.quantity = quantity;
  await cartItem.save();

  const cart = await getUserCart(req.user._id);

  res.json({
    message: 'Cart item updated successfully',
    ...cart,
  });
});

export const removeCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const cartItem = await CartItem.findOneAndDelete({
    user: req.user._id,
    product: productId,
  });

  if (!cartItem) {
    const error = new Error('Cart item not found');
    error.statusCode = 404;
    throw error;
  }

  const cart = await getUserCart(req.user._id);

  res.json({
    message: 'Product removed from cart',
    ...cart,
  });
});
