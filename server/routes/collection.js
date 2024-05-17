import express from 'express';
import auth from '../middleware/auth.js';
import {
  getUserCollections, getCollection, createCollection, updateCollection, deleteCollection
} from '../controllers/collections.js';

const router = express.Router({ mergeParams: true });

router.get('/', getUserCollections);
router.get('/:collectionId', getCollection);
router.post('/', auth, createCollection);
router.patch('/:collectionId', auth, updateCollection);
router.delete('/:collectionId', auth, deleteCollection);

export default router;
