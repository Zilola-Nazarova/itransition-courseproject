import express from 'express';
import auth from '../middleware/auth.js';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/users.js';

const router = express.Router();

router.get('/', auth, getUsers);
router.get('/:userId', getUser);
router.post('/', auth, createUser); // not using auth now, but will to detect if it's admin
router.patch('/:userId', auth, updateUser);
router.delete('/:userId', auth, deleteUser);

export default router;
