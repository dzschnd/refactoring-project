import pool from "../config/db.js";


export const connectClient = async () => {
    return await pool.connect();
};

export const beginTransaction = async (client) => {
    await client.query('BEGIN');
};

export const rollbackTransaction = async (client) => {
    await client.query('ROLLBACK');
};

export const commitTransaction = async (client) => {
    await client.query('COMMIT');
};

export const releaseClient = (client) => {
    client.release();
};