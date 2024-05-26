import multer from 'multer';
import express from 'express';
import { auth, ownerCheck } from '../middleware/auth.js';
import {
  getUserCollections, getCollection, createCollection, updateCollection, deleteCollection
} from '../controllers/collections.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router({ mergeParams: true });

router.get('/', getUserCollections);
router.get('/:collectionId', getCollection);
router.post('/', auth, ownerCheck, upload.single('image'), createCollection);
router.patch('/:collectionId', auth, ownerCheck, upload.single('image'), updateCollection);
router.delete('/:collectionId', auth, ownerCheck, deleteCollection);

export default router;
