import express from 'express';
import auth from '../middleware/auth.js';
import {
  getCollectionItems, getItem, createItem, updateItem, deleteItem
} from '../controllers/items.js';

const router = express.Router({ mergeParams: true });

router.get('/', getCollectionItems);
router.get('/:itemId', getItem);
router.post('/', auth, createItem);
router.patch('/:itemId', auth, updateItem);
router.delete('/:itemId', auth, deleteItem);

export default router;
