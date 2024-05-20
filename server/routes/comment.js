import express from 'express';
import { auth } from '../middleware/auth.js';
import { getComments, createComment, updateComment, deleteComment } from '../controllers/comments.js';

const router = express.Router({ mergeParams: true });

router.get('/', getComments);
router.post('/', auth, createComment);
router.patch('/:commentId', auth, updateComment);
router.delete('/:commentId', auth, deleteComment);

export default router;
