import express from 'express';
import { getLargestCollections } from '../controllers/collections.js';
import { getLatestItems } from '../controllers/items.js';
import { getTagsCloud } from '../controllers/tags.js';

const router = express.Router({ mergeParams: true });

router.get('/largest', getLargestCollections);
router.get('/latest', getLatestItems);
router.get('/tags', getTagsCloud);

export default router;
