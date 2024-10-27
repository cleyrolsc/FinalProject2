import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'cleysrl',
    password: process.env.DB_PASSWORD || "C05112631",
    port: Number(process.env.DB_PORT) || 5432,
});


export default pool;


export const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log("Connected to the database successfully!");
        client.release();
    } catch (err) {
        console.error("Database connection error:", err);
    }
};
