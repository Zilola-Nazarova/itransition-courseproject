import express from 'express';
import auth from '../middleware/auth.js';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/users.js';

const router = express.Router();

router.get('/', auth, getUsers);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
