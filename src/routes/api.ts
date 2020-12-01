import express from 'express';
import usersRouter from './users';
import categoryRouter from './categories';
import productsRouter from './products';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/categories', categoryRouter);
router.use('/products', productsRouter);

export default router;
