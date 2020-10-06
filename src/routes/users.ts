import express from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  getUserList,
  updateUser
} from '../controller/user-controller';
import { notAllowed } from './utility-handlers/not-allowed';

const router = express.Router();

router.get('/', getUserList);
router.post('/', createUser);
router.all('/', notAllowed);

router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.all('/:id', notAllowed);

export default router;
