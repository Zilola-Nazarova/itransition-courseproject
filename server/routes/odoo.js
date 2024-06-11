import express from 'express';
import { auth } from '../middleware/auth.js';
import { createOdooToken, getOdooCollections } from '../controllers/odoo.js';

const router = express.Router();

router.get('/token', auth, createOdooToken);
router.get('/collections', getOdooCollections);

export default router;
