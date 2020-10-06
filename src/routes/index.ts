import express, { Request, Response } from 'express';
import usersRouter from './users';
import categoryRouter from './categories';
import productsRouter from './products';
import { notFound } from './utility-handlers/not-found';

const router = express.Router();

router.use(express.json());

router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the web shop application!');
});

router.use('/users', usersRouter);
router.use('/categories', categoryRouter);
router.use('/products', productsRouter);

router.use(notFound);

export default router;
