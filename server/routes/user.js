import express from 'express';
import { auth, ownerCheck } from '../middleware/auth.js';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/users.js';
import { checkParams } from '../middleware/params.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', checkParams, getUser);
router.post('/', auth, createUser); // not using auth now, but will to detect if it's admin
router.patch('/:userId', checkParams, auth, ownerCheck, updateUser);
router.delete('/:userId', checkParams, auth, ownerCheck, deleteUser);

export default router;
