

import pool from '../config/db';

export const getAccountByUsername = async (username: string) => {
    const result = await pool.query('SELECT * FROM public.account WHERE username = $1', [username]);
    return result.rows[0];
};
