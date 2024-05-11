import express from 'express';

import { getItems, createItem, updateItem } from '../controllers/items.js';

const router = express.Router();

router.get('/', getItems);
router.post('/', createItem);
router.patch('/:id', updateItem);

export default router;
