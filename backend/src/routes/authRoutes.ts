// src/routes/authRoutes.ts

import express from 'express';
import { login } from '../controllers/authController'; // Import the login function

const authRouter = express.Router();

authRouter.post('/', login); // POST /login

export default authRouter;
