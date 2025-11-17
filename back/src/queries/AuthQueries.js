export const getRefreshTokenQuery = async (refreshToken, userId, client) => {
    const result = await client.query(`
            SELECT * FROM refresh_tokens WHERE token = $1 AND user_id = $2`,
        [refreshToken, userId]
    );
    return result.rows;
}
export const getUserByEmailQuery = async (email, client) => {
    const result = await client.query(`
            SELECT * FROM users WHERE email = $1`,
        [email]
    );
    return result.rows;
}
export const getUserQuery = async (userId, client) => {
    const result = await client.query(`
            SELECT * FROM users WHERE id = $1`,
            [userId]
    );
    return result.rows;
}
export const getOtpQuery = async (otp, userId, client) => {
    const result = await client.query(`
            SELECT * FROM email_verification_otps WHERE otp = $1 AND user_id = $2`,
        [otp, userId]
    );
    return result.rows;
}



export const createRefreshTokenQuery = async (refreshToken, userId, expiresAt, client) => {
    const result = await client.query(`
            INSERT INTO refresh_tokens (token, user_id, expires_at) VALUES ($1, $2, $3)`,
        [refreshToken, userId, expiresAt]
    );
    return result.rows;
}
export const createUserQuery = async (email, hashedPassword, client) => {
    const result = await client.query(`
            INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`,
        [email, hashedPassword]
    );
    return result.rows;
}
export const createOtpQuery = async (otp, userId, expiresAt, client) => {
    const result = await client.query(`
            INSERT INTO email_verification_otps (otp, user_id, expires_at) VALUES ($1, $2, $3)`,
        [otp, userId, expiresAt]
    );
    return result.rows;
}



export const updateRefreshTokenQuery = async (expiresAt, userId, client) => {
    const result = await client.query(`
        UPDATE refresh_tokens SET expires_at = $1 WHERE user_id = $2 AND expires_at > $1`,
        [expiresAt, userId]
    );
    return result.rows;
}
export const updateUserByEmailQuery = async (email, userId, client) => {
    const result = await client.query(`
            UPDATE users SET email = $1 WHERE id = $2`,
        [email, userId]
    );
    return result.rows;
}
export const updateUserByNameQuery = async (name, userId, client) => {
    const result = await client.query(`
            UPDATE users SET name = $1 WHERE id = $2`,
        [name, userId]
    );
    return result.rows;
}
export const updateUserByPasswordQuery = async (hashedPassword, userId, client) => {
    const result =  await client.query(`
            UPDATE users SET password = $1 WHERE id = $2`,
        [hashedPassword, userId]
    );
    return result.rows;
}
export const activateUserQuery = async (userId, client) => {
    const result =  await client.query(`
            UPDATE users SET verified = $1 WHERE id = $2`,
            [true, userId]
    );
    return result.rows;
}



export const deleteOtpQuery = async (userId, client) => {
    const result = await client.query(`
            DELETE FROM email_verification_otps WHERE user_id = $1`,
        [userId]
    );
    return result.rowCount;
}
