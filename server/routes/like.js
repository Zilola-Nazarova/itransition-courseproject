import express from 'express';
import { auth } from '../middleware/auth.js';
import { getLikes, createLike, deleteLike } from '../controllers/likes.js';

const router = express.Router({ mergeParams: true });

router.get('/', getLikes);
router.post('/', auth, createLike);
router.delete('/:likeId', auth, deleteLike);

export default router;
