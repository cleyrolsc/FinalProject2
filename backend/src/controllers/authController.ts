import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getAccountByUsername } from '../services/authService';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required' });
        return;
    }

    try {
        const account = await getAccountByUsername(username);

        if (!account || account.password !== password) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }

        const token = jwt.sign({ id: account.idaccount, username: account.username }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
};
