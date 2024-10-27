import { Router } from 'express';
import { loginAccount } from '../controllers/accountController';

const router = Router();

router.get('/login', loginAccount);

export default router;
