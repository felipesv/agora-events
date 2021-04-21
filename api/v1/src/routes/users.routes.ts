import { Router } from 'express';
import * as usersCtrl from '../controllers/users.controller';
import { validToken, isAdmin } from '../middlewares/auth';

const router = Router();

router.get('/users', [validToken, isAdmin], usersCtrl.getUsers);
router.get('/users/:id', [validToken, isAdmin], usersCtrl.getUser);
router.delete('/users/:id', [validToken, isAdmin], usersCtrl.deleteUser);
router.put('/users', [validToken], usersCtrl.updateUser);
router.get('/user/profile', [validToken], usersCtrl.getProfile);
export default router;
