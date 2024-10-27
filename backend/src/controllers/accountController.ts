import { Request, Response } from 'express';
import { getAllAccounts } from '../services/accountService';

export const loginAccount = async (req: Request, res: Response) => {

    try {
        const accounts = await getAllAccounts();
        const formattedAccounts = accounts.map(account => ({
            id: `C-${String(account.idaccount).padStart(4, '0')}`,
            username: account.username,
            password: account.password,
            active: account.active
        }));

        res.status(200).json(formattedAccounts);
    } catch (error) {
        console.error('Error fetching accounts:', error);
        res.status(500).json({ message: 'Error fetching accounts' });
    }
};