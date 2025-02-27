import { Router } from 'express';
import { getAllUsers, createUser, deleteUser, deleteAll, updateUser, findOneUser, getUsersByLimit } from '../controllers/userController';

const router = Router();

router.get('/', getAllUsers);
router.get('/', getUsersByLimit);
router.get('/:id', findOneUser);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.delete('/delete', deleteAll);
router.put('/:id', updateUser);

export default router;