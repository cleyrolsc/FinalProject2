import pool from '../config/db'; // Adjust the import according to your database connection setup

export const createAccountForEmployee = async (username: string, password: string, role_id: number) => {
    try {
        const result = await pool.query(
            'INSERT INTO account (username, password, active, role_idrole) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, password, true, role_id] // Assuming 'active' is set to true by default
        );

        return result.rows[0]; // Return the created account
    } catch (error) {
        console.error('Failed to create account:', error);
        throw new Error('Failed to create account');
    }
};

export const getAllAccounts = async () => {
    const result = await pool.query('SELECT * FROM public.account'); // Query to fetch all accounts
    return result.rows; // Return all accounts
};