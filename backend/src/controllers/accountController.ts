import { Request, Response } from 'express';
import { getAllAccounts } from '../services/accountService'; // Adjust path as necessary

export const loginAccount = async (req: Request, res: Response) => {
    // Fetch all accounts
    try {
        const accounts = await getAllAccounts(); // Fetch all accounts
        const formattedAccounts = accounts.map(account => ({
            id: `C-${String(account.idaccount).padStart(4, '0')}`, // Format ID
            username: account.username,
            password: account.password, // Include password
            active: account.active
        }));

        res.status(200).json(formattedAccounts); // Return all accounts
    } catch (error) {
        console.error('Error fetching accounts:', error); // Log the error
        res.status(500).json({ message: 'Error fetching accounts' }); // Internal server error
    }
};