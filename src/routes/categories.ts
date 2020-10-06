import express from 'express';
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategoryList,
  getCategoryProducts,
  updateCategory
} from '../controller/category-controller';
import { notAllowed } from './utility-handlers/not-allowed';

const router = express.Router();

router.get('/', getCategoryList);
router.post('/', createCategory);
router.all('/', notAllowed);

router.get('/:id', getCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);
router.all('/:id', notAllowed);

router.get('/:id/products', getCategoryProducts);
router.all('/:id/products', notAllowed);

export default router;
