import express from 'express';

import { getCollections, createCollection, updateCollection } from '../controllers/collections.js';

const router = express.Router();

router.get('/', getCollections);
router.post('/', createCollection);
router.patch('/:id', updateCollection);

export default router;
