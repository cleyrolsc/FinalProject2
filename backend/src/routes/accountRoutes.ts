import { Router } from 'express';
import { loginAccount } from '../controllers/accountController'; // Adjust the path as necessary

const router = Router();

// Define the login route
router.get('/login', loginAccount);

export default router;
