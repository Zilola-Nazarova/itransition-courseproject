import express from 'express';

import { getCollections, createCollection, updateCollection, deleteCollection } from '../controllers/collections.js';

const router = express.Router();

router.get('/', getCollections);
router.post('/', createCollection);
router.patch('/:id', updateCollection);
router.delete('/:id', deleteCollection);

export default router;
