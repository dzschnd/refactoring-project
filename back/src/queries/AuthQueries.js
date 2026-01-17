import prisma from "../config/prisma.js";

export const getRefreshTokenQuery = async (refreshToken, userId, client = prisma) => {
    return client.refreshToken.findMany({
        where: { token: refreshToken, userId: Number(userId) }
    });
}
export const getUserByEmailQuery = async (email, client = prisma) => {
    return client.user.findMany({
        where: { email: email }
    });
}
export const getUserQuery = async (userId, client = prisma) => {
    return client.user.findMany({
        where: { id: Number(userId) }
    });
}
export const getOtpQuery = async (otp, userId, client = prisma) => {
    return client.emailVerificationOtp.findMany({
        where: { otp: otp, userId: Number(userId) }
    });
}



export const createRefreshTokenQuery = async (refreshToken, userId, expiresAt, client = prisma) => {
    await client.refreshToken.create({
        data: { token: refreshToken, userId: Number(userId), expiresAt: expiresAt }
    });
    return [];
}
export const createUserQuery = async (email, hashedPassword, client = prisma) => {
    const created = await client.user.create({
        data: { email: email, password: hashedPassword }
    });
    return [created];
}
export const createOtpQuery = async (otp, userId, expiresAt, client = prisma) => {
    await client.emailVerificationOtp.create({
        data: { otp: otp, userId: Number(userId), expiresAt: expiresAt }
    });
    return [];
}



export const updateRefreshTokenQuery = async (expiresAt, userId, client = prisma) => {
    await client.refreshToken.updateMany({
        where: { userId: Number(userId), expiresAt: { gt: expiresAt } },
        data: { expiresAt: expiresAt }
    });
    return [];
}
export const updateUserByEmailQuery = async (email, userId, client = prisma) => {
    await client.user.update({
        where: { id: Number(userId) },
        data: { email: email }
    });
    return [];
}
export const updateUserByNameQuery = async (name, userId, client = prisma) => {
    await client.user.update({
        where: { id: Number(userId) },
        data: { name: name }
    });
    return [];
}
export const updateUserByPasswordQuery = async (hashedPassword, userId, client = prisma) => {
    await client.user.update({
        where: { id: Number(userId) },
        data: { password: hashedPassword }
    });
    return [];
}
export const activateUserQuery = async (userId, client = prisma) => {
    await client.user.update({
        where: { id: Number(userId) },
        data: { verified: true }
    });
    return [];
}



export const deleteOtpQuery = async (userId, client = prisma) => {
    const result = await client.emailVerificationOtp.deleteMany({
        where: { userId: Number(userId) }
    });
    return result.count;
}
