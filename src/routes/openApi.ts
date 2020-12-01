import express from 'express';
import { getCategoryProducts } from '../controller/category-controller';
import {
  getProduct,
  getProductReview,
  getProductReviews,
  getProductsList
} from '../controller/product-controller';
import { notAllowed } from './utility-handlers/not-allowed';

const router = express.Router();

router.get('/category/:id/products', getCategoryProducts);

router.get('/products/', getProductsList);
router.all('/products/', notAllowed);

router.get('/products/:id', getProduct);
router.get('/products/:id/reviews', getProductReviews);
router.get('/products/:id/reviews/:reviewId', getProductReview);

export default router;
