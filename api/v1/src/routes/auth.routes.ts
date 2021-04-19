import { Router } from 'express';
import * as authsCtrl from '../controllers/auths.controller';
import { validNewEmailUsername, validUsernamePassword, validToken } from '../middlewares/auth';

const router = Router();

router.post('/signup', [validNewEmailUsername], authsCtrl.signUp);
router.post('/signin', [validUsernamePassword], authsCtrl.signIn);

export default router;
