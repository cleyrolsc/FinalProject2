// src/services/authService.ts

import pool from '../config/db'; // Adjust the import based on your database setup

export const getAccountByUsername = async (username: string) => {
    const result = await pool.query('SELECT * FROM public.account WHERE username = $1', [username]); // Query to fetch account
    return result.rows[0]; // Return the first matching account
};
