import express from 'express';
import { getTags, getTagItems } from '../controllers/tags.js';
import { checkParams } from '../middleware/params.js';

const router = express.Router();

router.get('/', getTags);
router.get('/:tagId', checkParams, getTagItems);

export default router;
