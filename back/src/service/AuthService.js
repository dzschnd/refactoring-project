import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import {
    beginTransaction,
    commitTransaction,
    connectClient,
    releaseClient,
    rollbackTransaction
} from "../queries/CommonQueries.js";
import {
    createOtpQuery,
    createRefreshTokenQuery, createUserQuery, deleteOtpQuery, getOtpQuery,
    getRefreshTokenQuery,
    getUserByEmailQuery, getUserQuery,
    updateRefreshTokenQuery, updateUserByEmailQuery, updateUserByPasswordQuery, activateUserQuery, updateUserByNameQuery
} from "../queries/AuthQueries.js";
import {signAccessToken, signRefreshToken} from "../utils/TokenUtils.js";
import {getCurrentTime, getExpirationTimeMinutes} from "../utils/TimeUtils.js";
import {errorResponse} from "../utils/errorUtils.js";
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import {EMAIL_NOT_AVAILABLE} from "../messages/messages.js";

dotenv.config();
export const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendVerificationEmail = async (email, otp) => {
    const __dirname = path.resolve();
    const filePath = path.join(__dirname, '/src/templates/emailTemplate.html');
    const htmlContent = fs.readFileSync(filePath, 'utf-8').toString().replace('{{otp}}', otp);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        }
    });
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Ваш код верификации',
        html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
};

export const createAndSendOtp = async (userId, email, client) => {
    await deleteOtpQuery(userId, client);

    const otp = generateOTP();
    const expiresAt = getExpirationTimeMinutes(5);
    await getUserQuery(userId, client);
    await createOtpQuery(otp, userId, expiresAt, client);
    await sendVerificationEmail(email, otp);

    return { message: 'Otp sent successfully' };
}

export const requestOtp = async (email) => {
    let client;
    try {
        client = await connectClient();

        await beginTransaction(client);

        const user = await getUserByEmailQuery(email, client);

        if (user.length === 0) {
            return errorResponse('User not found');
        }

        await createAndSendOtp(user[0].id, email, client);

        await commitTransaction(client);
        return { message: 'Otp sent successfully' };
    } catch (error) {
        if (client) await rollbackTransaction(client);
        return errorResponse('Failed to send otp: ' + error.message);
    } finally {
        if (client) releaseClient(client);
    }
}

export const register = async (email, password) => {
    let client;
    try {
        client = await connectClient();
        await beginTransaction(client);

        const user = await getUserByEmailQuery(email, client);
        const isUserExists = user.length > 0;

        if (isUserExists) {
            const existingUser = user[0]

            if (existingUser.verified) {
                return errorResponse(EMAIL_NOT_AVAILABLE);
            }

            const checkPasswordResponse = await checkPassword(existingUser, password);
            if (checkPasswordResponse.error) {
                return errorResponse(EMAIL_NOT_AVAILABLE);
            }
            await createAndSendOtp(existingUser.id, existingUser.email, client);
            await commitTransaction(client);
            return { ...existingUser };

        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await createUserQuery(email, hashedPassword, client);
        const { password: _, ...newUserWithoutPassword } = newUser[0];
        await createAndSendOtp(newUser[0].id, newUser[0].email, client);
        await commitTransaction(client);
        return { ...newUserWithoutPassword };
    } catch (error) {
        if (client) await rollbackTransaction(client);
        return errorResponse('Failed to register user: ' + error.message);
    } finally {
        if (client) releaseClient(client);
    }
};

export const refreshTokens = async (refreshToken, user) => {
    let client;
    try {
        client = await connectClient();
        await beginTransaction(client);

        const existingTokens = await getRefreshTokenQuery(refreshToken, user.id, client);

        if (existingTokens.length === 0)
            return errorResponse('Invalid refresh token');

        if (existingTokens.filter((token) => new Date(token.expires_at) > new Date()).length === 0) {
            return errorResponse('Refresh token expired');
        }
        const currentTime = getCurrentTime();
        await updateRefreshTokenQuery(currentTime, user.id, client);

        const accessToken = signAccessToken(user);
        const { refreshToken: newRefreshToken, expiresAt: newExpiresAt } = signRefreshToken(user);

        await createRefreshTokenQuery(newRefreshToken, user.id, newExpiresAt, client);

        await commitTransaction(client);

        return { accessToken: accessToken, refreshToken: newRefreshToken };
    } catch (error) {
        if (client) await rollbackTransaction(client);
        return errorResponse('Failed to refresh tokens');
    } finally {
        if (client) releaseClient(client);
    }
};

export const requestResetPassword = async (email) => {
    let client;
    try {
        client = await connectClient();

        const user = await getUserByEmailQuery(email, client);

        if (user.length === 0) return errorResponse('User not found');

        await createAndSendOtp(user[0].id, user[0].email, client);

        await commitTransaction(client);

        return { message: 'Otp sent successfully', user: user[0] };
    } catch (error) {
        return errorResponse('Failed to request password reset');
    } finally {
        if (client) releaseClient(client);
    }
};

export const requestChangeEmail = async (email, newEmail) => {
    let client;
    try {
        client = await connectClient();

        const user = await getUserByEmailQuery(email, client);
        if (user.length === 0) return errorResponse('User not found');

        const userWithSameEmail = await getUserByEmailQuery(newEmail, client);
        if (userWithSameEmail.length > 0) return errorResponse('Email not available');

        await createAndSendOtp(user[0].id, newEmail, client);

        return { message: 'Otp sent successfully' };
    } catch (error) {
        return errorResponse('Failed to request email change', error);
    } finally {
        if (client) releaseClient(client);
    }
};

export const verifyEmail = async (email, otp) => {
    let client;
    try {
        client = await connectClient();

        await beginTransaction(client);

        const existingUsers = await getUserByEmailQuery(email, client);

        if (existingUsers.length === 0)
            return errorResponse('User not found');

        const existingOtp = await getOtpQuery(otp, existingUsers[0].id, client);

        if (existingOtp.length === 0)
            return errorResponse('OTP not found');

        if (new Date() > new Date(existingOtp[0].expires_at))
            return errorResponse('OTP has expired');

        if (!existingUsers[0].verified)
            await activateUserQuery(existingUsers[0].id, client);

        await deleteOtpQuery(existingUsers[0].id, client);

        await commitTransaction(client);

        return existingUsers[0];
    } catch (error) {
        return errorResponse('Failed to verify email');
    } finally {
        if (client) releaseClient(client);
    }
};

export const activateUser = async (user) => {
    let client;
    try {
        client = await connectClient();

        await beginTransaction(client);

        const existingUsers = await getUserQuery(user.id, client);

        if (existingUsers.length === 0)
            return errorResponse('User not found');

        await deleteOtpQuery(user.id, client);

        const accessToken = signAccessToken(user);
        const { refreshToken, expiresAt } = signRefreshToken(user);

        await createRefreshTokenQuery(refreshToken, user.id, expiresAt, client);

        await commitTransaction(client);

        return { accessToken: accessToken, refreshToken: refreshToken };
    } catch (error) {
        if (client) await rollbackTransaction(client);
        return errorResponse('Failed to activate user');
    } finally {
        if (client) releaseClient(client);
    }
};

export const checkPassword = async (user, password) => {
    let isPasswordValid;
    let client;
    try {
        if (!user.password) {
            const client = await connectClient();
            const existingUser = await getUserByEmailQuery(user.email, client);
            if (existingUser.length === 0)
                return errorResponse('Invalid credentials');
            isPasswordValid = await bcrypt.compare(password, existingUser[0].password);
        } else {
            isPasswordValid = await bcrypt.compare(password, user.password);
        }

        if (!isPasswordValid)
            return errorResponse('Invalid credentials');

        return {message: 'Password valid'};
    } catch (error) {
        if (client) await rollbackTransaction(client);
        return errorResponse('Failed to check Password');
    } finally {
        if (client) releaseClient(client);
    }
}

export const login = async (email, password) => {
    let client;
    try {
        client = await connectClient();
        await beginTransaction(client);

        const existingUser = await getUserByEmailQuery(email, client);

        if (existingUser.length === 0)
            return errorResponse('Invalid credentials');

        const checkPasswordResponse = await checkPassword(existingUser[0], password);

        if (checkPasswordResponse.error)
            return errorResponse('Invalid credentials');

        const { password: _, ...userWithoutPassword } = existingUser[0];

        if (!userWithoutPassword.verified) {
            await createAndSendOtp(existingUser[0].id, existingUser[0].email, client);
            return errorResponse('User not verified');
        }

        const currentTime = getCurrentTime();
        await updateRefreshTokenQuery(currentTime, userWithoutPassword.id, client);

        const accessToken = signAccessToken(userWithoutPassword);
        const { refreshToken, expiresAt } = signRefreshToken(userWithoutPassword);

        await createRefreshTokenQuery(refreshToken, userWithoutPassword.id, expiresAt, client);

        await commitTransaction(client);

        return { user: userWithoutPassword, accessToken: accessToken, refreshToken: refreshToken };
    } catch (error) {
        if (client) await rollbackTransaction(client);
        return errorResponse('Failed to log in');
    } finally {
        if (client) releaseClient(client);
    }
};

export const getProfile = async (user) => {
    let client;
    try {
        client = await connectClient();

        const existingUsers = await getUserQuery(user.id, client);

        if (existingUsers.length === 0) {
            return errorResponse('User not found');
        }

        const { password: _, ...userWithoutPassword } = existingUsers[0];
        return { ...userWithoutPassword };
    } catch (error) {
        return errorResponse('Failed to fetch profile');
    } finally {
        if (client) releaseClient(client);
    }
};

export const logout = async (user) => {
    let client;
    try {
        client = await connectClient();

        const currentTime = getCurrentTime();
        await updateRefreshTokenQuery(currentTime, user.id, client);

        return { message: 'Logged out successfully' };
    } catch (error) {
        return errorResponse('Failed to log out');
    } finally {
        if (client) releaseClient(client);
    }
};

export const updateProfile = async (newEmail, newPassword, email) => {
    let client;
    try {
        client = await connectClient();

        await beginTransaction(client);

        const existingUsers = await getUserByEmailQuery(email, client);

        if (existingUsers.length === 0)
            return errorResponse('User not found');

        const user = existingUsers[0];

        if (newEmail) {
            const existingUsersByEmail = await getUserByEmailQuery(newEmail, client);

            if (existingUsersByEmail.length > 0)
                return errorResponse('Email is not available');

            await updateUserByEmailQuery(newEmail, user.id, client);
        }

        else if (newPassword) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            await updateUserByPasswordQuery(hashedPassword, user.id, client);
        }

        if (!newEmail && !newPassword) {
            return errorResponse('Neither email nor password passed to change')
        }

        await commitTransaction(client);

        return { message: 'Profile updated successfully', newEmail: newEmail };
    } catch (error) {
        if (client) await rollbackTransaction(client);
        return errorResponse('Failed to update profile');
    } finally {
        if (client) releaseClient(client);
    }
};

export const changeEmail = async (oldEmail, newEmail) => {
    let client;
    try {
        client = await connectClient();

        await beginTransaction(client);

        const existingUsers = await getUserByEmailQuery(oldEmail, client);
        if (existingUsers.length === 0)
            return errorResponse('User not found');

        const existingUsersByEmail = await getUserByEmailQuery(newEmail, client);
        if (existingUsersByEmail.length > 0)
            return errorResponse('Email is not available');

        await updateUserByEmailQuery(newEmail, existingUsers[0].id, client);

        await commitTransaction(client);

        return { message: 'Profile updated successfully', newEmail: newEmail };
    } catch (error) {
        if (client) await rollbackTransaction(client);
        return errorResponse('Failed to update profile');
    } finally {
        if (client) releaseClient(client);
    }
};

export const changePassword = async (newPassword, email) => {
    let client;
    try {
        client = await connectClient();

        await beginTransaction(client);

        const existingUsers = await getUserByEmailQuery(email, client);

        if (existingUsers.length === 0)
            return errorResponse('User not found');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        await updateUserByPasswordQuery(hashedPassword, existingUsers[0].id, client);

        await commitTransaction(client);

        return { message: 'Profile updated successfully' };
    } catch (error) {
        if (client) await rollbackTransaction(client);
        return errorResponse('Failed to update profile');
    } finally {
        if (client) releaseClient(client);
    }
};

export const changeName = async (newName, email) => {
    let client;
    try {
        client = await connectClient();

        await beginTransaction(client);

        const existingUsers = await getUserByEmailQuery(email, client);

        if (existingUsers.length === 0)
            return errorResponse('User not found');

        await updateUserByNameQuery(newName, existingUsers[0].id, client);

        await commitTransaction(client);

        return { message: 'Profile updated successfully', newName: newName };
    } catch (error) {
        if (client) await rollbackTransaction(client);
        return errorResponse('Failed to update profile');
    } finally {
        if (client) releaseClient(client);
    }
};
