import express from 'express';
import {
  createProductReview,
  deleteProduct,
  updateProduct
} from '../controller/product-controller';
import { notAllowed } from './utility-handlers/not-allowed';

const router = express.Router();

router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.all('/:id', notAllowed);

router.post('/:id/reviews', createProductReview);

export default router;
