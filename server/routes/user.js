import express from 'express';
import { auth, ownerCheck } from '../middleware/auth.js';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', auth, createUser); // not using auth now, but will to detect if it's admin
router.patch('/:userId', auth, ownerCheck, updateUser);
router.delete('/:userId', auth, ownerCheck, deleteUser);

export default router;
