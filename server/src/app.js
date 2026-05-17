import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import productRoutes from './routes/productRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req, res) => {
  res.json({
    message: 'ShoppyGlobe API is running',
    endpoints: ['/register', '/login', '/products', '/cart'],
  });
});

app.use(authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
