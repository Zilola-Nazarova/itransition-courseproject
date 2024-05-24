import express from 'express';
import { getItemsBySearch } from '../controllers/search.js';

const router = express.Router();

router.get('/', getItemsBySearch);

export default router;
