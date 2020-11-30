import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductsList,
  updateProduct
} from '../controller/product-controller';
import { notAllowed } from './utility-handlers/not-allowed';

const router = express.Router();

router.get('/', getProductsList);
// router.post('/', createProduct);
router.all('/', notAllowed);

router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.all('/:id', notAllowed);

export default router;
