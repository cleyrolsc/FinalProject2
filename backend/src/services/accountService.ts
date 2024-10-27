import pool from '../config/db';

export const createAccountForEmployee = async (username: string, password: string, role_id: number) => {
    try {
        const result = await pool.query(
            'INSERT INTO account (username, password, active, role_idrole) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, password, true, role_id]
        );

        return result.rows[0];
    } catch (error) {
        console.error('Failed to create account:', error);
        throw new Error('Failed to create account');
    }
};

export const getAllAccounts = async () => {
    const result = await pool.query('SELECT * FROM public.account');
    return result.rows;
};