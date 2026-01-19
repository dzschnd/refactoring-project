import type {
  EmailVerificationOtp,
  Prisma,
  PrismaClient,
  RefreshToken,
  User,
} from "@prisma/client";
import prisma from "../config/prisma.js";

type TxClient = Prisma.TransactionClient;

export const getRefreshTokenQuery = async (
  refreshToken: string,
  userId: number,
  client: PrismaClient | TxClient = prisma,
): Promise<RefreshToken[]> => {
  return client.refreshToken.findMany({
    where: { token: refreshToken, userId: Number(userId) },
  });
};
export const getUserByEmailQuery = async (
  email: string,
  client: PrismaClient | TxClient = prisma,
): Promise<User[]> => {
  return client.user.findMany({
    where: { email: email },
  });
};
export const getUserQuery = async (
  userId: number,
  client: PrismaClient | TxClient = prisma,
): Promise<User[]> => {
  return client.user.findMany({
    where: { id: Number(userId) },
  });
};
export const getOtpQuery = async (
  otp: string,
  userId: number,
  client: PrismaClient | TxClient = prisma,
): Promise<EmailVerificationOtp[]> => {
  return client.emailVerificationOtp.findMany({
    where: { otp: otp, userId: Number(userId) },
  });
};

export const createRefreshTokenQuery = async (
  refreshToken: string,
  userId: number,
  expiresAt: Date,
  client: PrismaClient | TxClient = prisma,
): Promise<[] | RefreshToken[]> => {
  await client.refreshToken.create({
    data: { token: refreshToken, userId: Number(userId), expiresAt: expiresAt },
  });
  return [];
};
export const createUserQuery = async (
  email: string,
  hashedPassword: string,
  client: PrismaClient | TxClient = prisma,
): Promise<[User]> => {
  const created = await client.user.create({
    data: { email: email, password: hashedPassword },
  });
  return [created];
};
export const createOtpQuery = async (
  otp: string,
  userId: number,
  expiresAt: Date,
  client: PrismaClient | TxClient = prisma,
): Promise<[] | EmailVerificationOtp[]> => {
  await client.emailVerificationOtp.create({
    data: { otp: otp, userId: Number(userId), expiresAt: expiresAt },
  });
  return [];
};

export const updateRefreshTokenQuery = async (
  expiresAt: Date,
  userId: number,
  client: PrismaClient | TxClient = prisma,
): Promise<[]> => {
  await client.refreshToken.updateMany({
    where: { userId: Number(userId), expiresAt: { gt: expiresAt } },
    data: { expiresAt: expiresAt },
  });
  return [];
};
export const updateUserByEmailQuery = async (
  email: string,
  userId: number,
  client: PrismaClient | TxClient = prisma,
): Promise<[]> => {
  await client.user.update({
    where: { id: Number(userId) },
    data: { email: email },
  });
  return [];
};
export const updateUserByNameQuery = async (
  name: string,
  userId: number,
  client: PrismaClient | TxClient = prisma,
): Promise<[]> => {
  await client.user.update({
    where: { id: Number(userId) },
    data: { name: name },
  });
  return [];
};
export const updateUserByPasswordQuery = async (
  hashedPassword: string,
  userId: number,
  client: PrismaClient | TxClient = prisma,
): Promise<[]> => {
  await client.user.update({
    where: { id: Number(userId) },
    data: { password: hashedPassword },
  });
  return [];
};
export const activateUserQuery = async (
  userId: number,
  client: PrismaClient | TxClient = prisma,
): Promise<[]> => {
  await client.user.update({
    where: { id: Number(userId) },
    data: { verified: true },
  });
  return [];
};

export const deleteOtpQuery = async (
  userId: number,
  client: PrismaClient | TxClient = prisma,
): Promise<number> => {
  const result = await client.emailVerificationOtp.deleteMany({
    where: { userId: Number(userId) },
  });
  return result.count;
};
