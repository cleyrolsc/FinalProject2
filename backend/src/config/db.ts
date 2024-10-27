import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a new pool for database connection
const pool = new Pool({
    user: process.env.DB_USER || 'postgres', // Default username
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'cleysrl',
    password: process.env.DB_PASSWORD || "C05112631", // Ensure this is correct
    port: Number(process.env.DB_PORT) || 5432,
});

// Export the pool to use it in other files
export default pool;

// Optional: Function to connect and test the database connection
export const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log("Connected to the database successfully!");
        client.release(); // Release the client back to the pool
    } catch (err) {
        console.error("Database connection error:", err);
    }
};
