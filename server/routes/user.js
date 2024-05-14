import express from 'express';

import { getUsers, createUser, updateUser, deleteUser } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.patch('/', updateUser);
router.delete('/', deleteUser);

export default router;
