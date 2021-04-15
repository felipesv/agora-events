import { Router } from 'express';
import * as usersCtrl from '../controllers/users.controller';

const router = Router();

router.get('/users', usersCtrl.getUsers);
router.get('/users/:id', usersCtrl.getUser);
router.post('/users', usersCtrl.createUser);
router.delete('/users/:id', usersCtrl.deleteUser);
router.put('/users/:id', usersCtrl.updateUser);

export default router;
