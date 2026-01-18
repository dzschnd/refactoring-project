import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import prisma from "../config/prisma.js";
import { createOtpQuery, createRefreshTokenQuery, createUserQuery, deleteOtpQuery, getOtpQuery, getRefreshTokenQuery, getUserByEmailQuery, getUserQuery, updateRefreshTokenQuery, updateUserByEmailQuery, updateUserByPasswordQuery, activateUserQuery, updateUserByNameQuery } from "../queries/AuthQueries.js";
import { signAccessToken, signRefreshToken } from "../utils/TokenUtils.js";
import { getCurrentTime, getExpirationTimeMinutes } from "../utils/TimeUtils.js";
import { errorResponse } from "../utils/errorUtils.js";
import * as nodemailer from "nodemailer";
import * as fs from "fs";
import * as path from "path";
import { EMAIL_NOT_AVAILABLE } from "../messages/messages.js";
dotenv.config();
export const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
export const sendVerificationEmail = async (email, otp) => {
    const __dirname = path.resolve();
    const filePath = path.join(__dirname, "/src/templates/emailTemplate.html");
    const htmlContent = fs.readFileSync(filePath, "utf-8").toString().replace("{{otp}}", otp);
    const emailUser = process.env.EMAIL;
    const emailPass = process.env.EMAIL_PASS;
    const emailFrom = process.env.EMAIL_FROM;
    if (!emailUser || !emailPass || !emailFrom) {
        throw new Error("Email credentials are not configured");
    }
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: emailUser,
            pass: emailPass,
        }
    });
    const mailOptions = {
        from: emailFrom,
        to: email,
        subject: "Ваш код верификации",
        html: htmlContent,
    };
    await transporter.sendMail(mailOptions);
};
export const createAndSendOtp = async (userId, email, client = prisma) => {
    await deleteOtpQuery(userId, client);
    const otp = generateOTP();
    const expiresAt = getExpirationTimeMinutes(5);
    await getUserQuery(userId, client);
    await createOtpQuery(otp, userId, expiresAt, client);
    await sendVerificationEmail(email, otp);
    return { message: "Otp sent successfully" };
};
export const requestOtp = async (email) => {
    try {
        return await prisma.$transaction(async (tx) => {
            const user = await getUserByEmailQuery(email, tx);
            if (user.length === 0) {
                return errorResponse("User not found");
            }
            await createAndSendOtp(user[0].id, email, tx);
            return { message: "Otp sent successfully" };
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return errorResponse("Failed to send otp: " + message);
    }
};
export const register = async (email, password) => {
    try {
        return await prisma.$transaction(async (tx) => {
            const user = await getUserByEmailQuery(email, tx);
            const isUserExists = user.length > 0;
            if (isUserExists) {
                const existingUser = user[0];
                if (existingUser.verified) {
                    return errorResponse(EMAIL_NOT_AVAILABLE);
                }
                const checkPasswordResponse = await checkPassword(existingUser, password, tx);
                if ("error" in checkPasswordResponse) {
                    return errorResponse(EMAIL_NOT_AVAILABLE);
                }
                await createAndSendOtp(existingUser.id, existingUser.email, tx);
                const { password: _, ...existingUserWithoutPassword } = existingUser;
                return { ...existingUserWithoutPassword };
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = await createUserQuery(email, hashedPassword, tx);
            const { password: _, ...newUserWithoutPassword } = newUser[0];
            await createAndSendOtp(newUser[0].id, newUser[0].email, tx);
            return { ...newUserWithoutPassword };
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return errorResponse("Failed to register user: " + message);
    }
};
export const refreshTokens = async (refreshToken, user) => {
    try {
        return await prisma.$transaction(async (tx) => {
            const existingTokens = await getRefreshTokenQuery(refreshToken, user.id, tx);
            if (existingTokens.length === 0)
                return errorResponse("Invalid refresh token");
            if (existingTokens.filter((token) => new Date(token.expiresAt) > new Date()).length === 0) {
                return errorResponse("Refresh token expired");
            }
            const currentTime = getCurrentTime();
            await updateRefreshTokenQuery(currentTime, user.id, tx);
            const accessToken = signAccessToken(user);
            const { refreshToken: newRefreshToken, expiresAt: newExpiresAt } = signRefreshToken(user);
            await createRefreshTokenQuery(newRefreshToken, user.id, newExpiresAt, tx);
            return { accessToken: accessToken, refreshToken: newRefreshToken };
        });
    }
    catch (error) {
        return errorResponse("Failed to refresh tokens");
    }
};
export const requestResetPassword = async (email) => {
    try {
        return await prisma.$transaction(async (tx) => {
            const user = await getUserByEmailQuery(email, tx);
            if (user.length === 0)
                return errorResponse("User not found");
            await createAndSendOtp(user[0].id, user[0].email, tx);
            return { message: "Otp sent successfully", user: user[0] };
        });
    }
    catch (error) {
        return errorResponse("Failed to request password reset");
    }
};
export const requestChangeEmail = async (email, newEmail) => {
    try {
        return await prisma.$transaction(async (tx) => {
            const user = await getUserByEmailQuery(email, tx);
            if (user.length === 0)
                return errorResponse("User not found");
            const userWithSameEmail = await getUserByEmailQuery(newEmail, tx);
            if (userWithSameEmail.length > 0)
                return errorResponse("Email not available");
            await createAndSendOtp(user[0].id, newEmail, tx);
            return { message: "Otp sent successfully" };
        });
    }
    catch (error) {
        return errorResponse("Failed to request email change");
    }
};
export const verifyEmail = async (email, otp) => {
    try {
        return await prisma.$transaction(async (tx) => {
            const existingUsers = await getUserByEmailQuery(email, tx);
            if (existingUsers.length === 0)
                return errorResponse("User not found");
            const existingOtp = await getOtpQuery(otp, existingUsers[0].id, tx);
            if (existingOtp.length === 0)
                return errorResponse("OTP not found");
            if (new Date() > new Date(existingOtp[0].expiresAt))
                return errorResponse("OTP has expired");
            if (!existingUsers[0].verified)
                await activateUserQuery(existingUsers[0].id, tx);
            await deleteOtpQuery(existingUsers[0].id, tx);
            return existingUsers[0];
        });
    }
    catch (error) {
        return errorResponse("Failed to verify email");
    }
};
export const activateUser = async (user) => {
    try {
        return await prisma.$transaction(async (tx) => {
            const existingUsers = await getUserQuery(user.id, tx);
            if (existingUsers.length === 0)
                return errorResponse("User not found");
            await deleteOtpQuery(user.id, tx);
            const accessToken = signAccessToken(user);
            const { refreshToken, expiresAt } = signRefreshToken(user);
            await createRefreshTokenQuery(refreshToken, user.id, expiresAt, tx);
            return { accessToken: accessToken, refreshToken: refreshToken };
        });
    }
    catch (error) {
        return errorResponse("Failed to activate user");
    }
};
export const checkPassword = async (user, password, client = prisma) => {
    try {
        let isPasswordValid;
        if (!user.password) {
            const existingUser = await getUserByEmailQuery(user.email, client);
            if (existingUser.length === 0 || !existingUser[0].password)
                return errorResponse("Invalid credentials");
            isPasswordValid = await bcrypt.compare(password, existingUser[0].password);
        }
        else {
            isPasswordValid = await bcrypt.compare(password, user.password);
        }
        if (!isPasswordValid)
            return errorResponse("Invalid credentials");
        return { message: "Password valid" };
    }
    catch (error) {
        return errorResponse("Failed to check Password");
    }
};
export const login = async (email, password) => {
    try {
        return await prisma.$transaction(async (tx) => {
            const existingUser = await getUserByEmailQuery(email, tx);
            if (existingUser.length === 0)
                return errorResponse("Invalid credentials");
            const checkPasswordResponse = await checkPassword(existingUser[0], password, tx);
            if ("error" in checkPasswordResponse)
                return errorResponse("Invalid credentials");
            const { password: _, ...userWithoutPassword } = existingUser[0];
            if (!userWithoutPassword.verified) {
                await createAndSendOtp(existingUser[0].id, existingUser[0].email, tx);
                return errorResponse("User not verified");
            }
            const currentTime = getCurrentTime();
            await updateRefreshTokenQuery(currentTime, userWithoutPassword.id, tx);
            const accessToken = signAccessToken(userWithoutPassword);
            const { refreshToken, expiresAt } = signRefreshToken(userWithoutPassword);
            await createRefreshTokenQuery(refreshToken, userWithoutPassword.id, expiresAt, tx);
            return { user: userWithoutPassword, accessToken: accessToken, refreshToken: refreshToken };
        });
    }
    catch (error) {
        return errorResponse("Failed to log in");
    }
};
export const getProfile = async (user) => {
    try {
        const existingUsers = await getUserQuery(user.id);
        if (existingUsers.length === 0) {
            return errorResponse("User not found");
        }
        const { password: _, ...userWithoutPassword } = existingUsers[0];
        return { ...userWithoutPassword };
    }
    catch (error) {
        return errorResponse("Failed to fetch profile");
    }
};
export const logout = async (user) => {
    try {
        const currentTime = getCurrentTime();
        await updateRefreshTokenQuery(currentTime, user.id);
        return { message: "Logged out successfully" };
    }
    catch (error) {
        return errorResponse("Failed to log out");
    }
};
export const updateProfile = async (newEmail, newPassword, email) => {
    try {
        return await prisma.$transaction(async (tx) => {
            const existingUsers = await getUserByEmailQuery(email, tx);
            if (existingUsers.length === 0)
                return errorResponse("User not found");
            const user = existingUsers[0];
            if (newEmail) {
                const existingUsersByEmail = await getUserByEmailQuery(newEmail, tx);
                if (existingUsersByEmail.length > 0)
                    return errorResponse("Email is not available");
                await updateUserByEmailQuery(newEmail, user.id, tx);
            }
            else if (newPassword) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);
                await updateUserByPasswordQuery(hashedPassword, user.id, tx);
            }
            if (!newEmail && !newPassword) {
                return errorResponse("Neither email nor password passed to change");
            }
            return { message: "Profile updated successfully", newEmail: newEmail };
        });
    }
    catch (error) {
        return errorResponse("Failed to update profile");
    }
};
export const changeEmail = async (oldEmail, newEmail) => {
    try {
        return await prisma.$transaction(async (tx) => {
            const existingUsers = await getUserByEmailQuery(oldEmail, tx);
            if (existingUsers.length === 0)
                return errorResponse("User not found");
            const existingUsersByEmail = await getUserByEmailQuery(newEmail, tx);
            if (existingUsersByEmail.length > 0)
                return errorResponse("Email is not available");
            await updateUserByEmailQuery(newEmail, existingUsers[0].id, tx);
            return { message: "Profile updated successfully", newEmail: newEmail };
        });
    }
    catch (error) {
        return errorResponse("Failed to update profile");
    }
};
export const changePassword = async (newPassword, email) => {
    try {
        return await prisma.$transaction(async (tx) => {
            const existingUsers = await getUserByEmailQuery(email, tx);
            if (existingUsers.length === 0)
                return errorResponse("User not found");
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            await updateUserByPasswordQuery(hashedPassword, existingUsers[0].id, tx);
            return { message: "Profile updated successfully" };
        });
    }
    catch (error) {
        return errorResponse("Failed to update profile");
    }
};
export const changeName = async (newName, email) => {
    try {
        return await prisma.$transaction(async (tx) => {
            const existingUsers = await getUserByEmailQuery(email, tx);
            if (existingUsers.length === 0)
                return errorResponse("User not found");
            await updateUserByNameQuery(newName, existingUsers[0].id, tx);
            return { message: "Profile updated successfully", newName: newName };
        });
    }
    catch (error) {
        return errorResponse("Failed to update profile");
    }
};
