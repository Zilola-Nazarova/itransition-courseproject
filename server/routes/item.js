import express from 'express';
import { auth, ownerCheck } from '../middleware/auth.js';
import {
  getCollectionItems, getItem, createItem, updateItem, deleteItem
} from '../controllers/items.js';

const router = express.Router({ mergeParams: true });

router.get('/', getCollectionItems);
router.get('/:itemId', getItem);
router.post('/', auth, ownerCheck, createItem);
router.patch('/:itemId', auth, ownerCheck, updateItem);
router.delete('/:itemId', auth, ownerCheck, deleteItem);

export default router;
