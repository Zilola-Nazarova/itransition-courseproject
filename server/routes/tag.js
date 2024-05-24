import express from 'express';
import { getTags, getTagItems } from '../controllers/tags.js';

const router = express.Router();

router.get('/', getTags);
router.get('/:tagId', getTagItems);

export default router;
