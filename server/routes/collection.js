import express from 'express';
import { auth, ownerCheck} from '../middleware/auth.js';
import {
  getUserCollections, getCollection, createCollection, updateCollection, deleteCollection
} from '../controllers/collections.js';

const router = express.Router({ mergeParams: true });

router.get('/', getUserCollections);
router.get('/:collectionId', getCollection);
router.post('/', auth, ownerCheck, createCollection);
router.patch('/:collectionId', auth, ownerCheck, updateCollection);
router.delete('/:collectionId', auth, ownerCheck, deleteCollection);

export default router;
