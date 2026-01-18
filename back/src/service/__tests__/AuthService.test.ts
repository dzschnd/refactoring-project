import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import type { EmailVerificationOtp, RefreshToken, User } from "@prisma/client";

const mockPrisma = {
  $transaction: async <T>(callback: (tx: object) => Promise<T>): Promise<T> => callback({}),
};

type GetRefreshTokenQuery = (refreshToken: string, userId: number, client?: object) => Promise<RefreshToken[]>;
type GetUserByEmailQuery = (email: string, client?: object) => Promise<User[]>;
type GetUserQuery = (userId: number, client?: object) => Promise<User[]>;
type GetOtpQuery = (otp: string, userId: number, client?: object) => Promise<EmailVerificationOtp[]>;
type CreateRefreshTokenQuery = (refreshToken: string, userId: number, expiresAt: Date, client?: object) => Promise<RefreshToken[]>;
type CreateUserQuery = (email: string, hashedPassword: string, client?: object) => Promise<[User]>;
type CreateOtpQuery = (otp: string, userId: number, expiresAt: Date, client?: object) => Promise<EmailVerificationOtp[]>;
type UpdateRefreshTokenQuery = (expiresAt: Date, userId: number, client?: object) => Promise<[]>;
type UpdateUserByEmailQuery = (email: string, userId: number, client?: object) => Promise<[]>;
type UpdateUserByNameQuery = (name: string, userId: number, client?: object) => Promise<[]>;
type UpdateUserByPasswordQuery = (hashedPassword: string, userId: number, client?: object) => Promise<[]>;
type ActivateUserQuery = (userId: number, client?: object) => Promise<[]>;
type DeleteOtpQuery = (userId: number, client?: object) => Promise<number>;

const mockGetRefreshTokenQuery: jest.MockedFunction<GetRefreshTokenQuery> = jest.fn();
const mockGetUserByEmailQuery: jest.MockedFunction<GetUserByEmailQuery> = jest.fn();
const mockGetUserQuery: jest.MockedFunction<GetUserQuery> = jest.fn();
const mockGetOtpQuery: jest.MockedFunction<GetOtpQuery> = jest.fn();
const mockCreateRefreshTokenQuery: jest.MockedFunction<CreateRefreshTokenQuery> = jest.fn();
const mockCreateUserQuery: jest.MockedFunction<CreateUserQuery> = jest.fn();
const mockCreateOtpQuery: jest.MockedFunction<CreateOtpQuery> = jest.fn();
const mockUpdateRefreshTokenQuery: jest.MockedFunction<UpdateRefreshTokenQuery> = jest.fn();
const mockUpdateUserByEmailQuery: jest.MockedFunction<UpdateUserByEmailQuery> = jest.fn();
const mockUpdateUserByNameQuery: jest.MockedFunction<UpdateUserByNameQuery> = jest.fn();
const mockUpdateUserByPasswordQuery: jest.MockedFunction<UpdateUserByPasswordQuery> = jest.fn();
const mockActivateUserQuery: jest.MockedFunction<ActivateUserQuery> = jest.fn();
const mockDeleteOtpQuery: jest.MockedFunction<DeleteOtpQuery> = jest.fn();

jest.unstable_mockModule("../../config/prisma.js", () => ({
  default: mockPrisma,
}));

jest.unstable_mockModule("../../queries/AuthQueries.js", () => ({
  getRefreshTokenQuery: mockGetRefreshTokenQuery,
  getUserByEmailQuery: mockGetUserByEmailQuery,
  getUserQuery: mockGetUserQuery,
  getOtpQuery: mockGetOtpQuery,
  createRefreshTokenQuery: mockCreateRefreshTokenQuery,
  createUserQuery: mockCreateUserQuery,
  createOtpQuery: mockCreateOtpQuery,
  updateRefreshTokenQuery: mockUpdateRefreshTokenQuery,
  updateUserByEmailQuery: mockUpdateUserByEmailQuery,
  updateUserByNameQuery: mockUpdateUserByNameQuery,
  updateUserByPasswordQuery: mockUpdateUserByPasswordQuery,
  activateUserQuery: mockActivateUserQuery,
  deleteOtpQuery: mockDeleteOtpQuery,
}));

type Compare = (data: string, encrypted: string) => Promise<boolean>;
type GenSalt = (rounds: number) => Promise<string>;
type Hash = (data: string, salt: string) => Promise<string>;

const mockCompare: jest.MockedFunction<Compare> = jest.fn();
const mockGenSalt: jest.MockedFunction<GenSalt> = jest.fn();
const mockHash: jest.MockedFunction<Hash> = jest.fn();

jest.unstable_mockModule("bcrypt", () => ({
  default: {
    compare: mockCompare,
    genSalt: mockGenSalt,
    hash: mockHash,
  },
}));

type SendMail = (options: object) => Promise<void>;
const mockSendMail: jest.MockedFunction<SendMail> = jest.fn();
jest.unstable_mockModule("nodemailer", () => ({
  createTransport: () => ({
    sendMail: mockSendMail,
  }),
}));

jest.unstable_mockModule("fs", () => ({
  readFileSync: () => "<html>{{otp}}</html>",
}));

jest.unstable_mockModule("path", () => ({
  resolve: () => "/tmp",
  join: (...segments: string[]) => segments.join("/"),
}));

jest.unstable_mockModule("../../utils/TokenUtils.js", () => ({
  signAccessToken: () => "access-token",
  signRefreshToken: () => ({ refreshToken: "refresh-token", expiresAt: new Date("2030-01-01T00:00:00Z") }),
}));

jest.unstable_mockModule("../../utils/TimeUtils.js", () => ({
  getCurrentTime: () => new Date("2024-01-01T00:00:00Z"),
  getExpirationTimeMinutes: () => new Date("2024-01-01T00:05:00Z"),
  getExpirationTimeHours: () => new Date("2024-01-01T01:00:00Z"),
}));

const { register, login, refreshTokens, verifyEmail } = await import("../../service/AuthService.js");

const makeUser = (overrides: Partial<User> = {}): User => ({
  id: 1,
  email: "user@example.com",
  password: "hashed",
  name: null,
  verified: false,
  ...overrides,
});

const makeOtp = (overrides: Partial<EmailVerificationOtp> = {}): EmailVerificationOtp => ({
  id: 1,
  otp: "123456",
  expiresAt: new Date("2024-01-01T00:00:00Z"),
  userId: 1,
  ...overrides,
});

const makeRefreshToken = (overrides: Partial<RefreshToken> = {}): RefreshToken => ({
  id: 1,
  token: "refresh-token",
  expiresAt: new Date("2030-01-01T00:00:00Z"),
  userId: 1,
  ...overrides,
});

beforeEach(() => {
  jest.clearAllMocks();
  process.env.EMAIL = "test@example.com";
  process.env.EMAIL_PASS = "pass";
  process.env.EMAIL_FROM = "no-reply@example.com";
});

describe("AuthService.register", () => {
  it("creates user and sends otp for new user", async () => {
    mockGetUserByEmailQuery.mockResolvedValueOnce([]);
    mockCreateUserQuery.mockResolvedValueOnce([makeUser()]);
    mockGetUserQuery.mockResolvedValueOnce([makeUser()]);
    mockDeleteOtpQuery.mockResolvedValueOnce(1);
    mockCreateOtpQuery.mockResolvedValueOnce([makeOtp()]);
    mockGenSalt.mockResolvedValueOnce("salt");
    mockHash.mockResolvedValueOnce("hashed");

    const result = await register("user@example.com", "password");

    expect("error" in result).toBe(false);
    if (!("error" in result)) {
      expect(result.email).toBe("user@example.com");
      expect("password" in result).toBe(false);
    }
    expect(mockSendMail).toHaveBeenCalledTimes(1);
  });
});

describe("AuthService.login", () => {
  it("returns tokens and user for verified user", async () => {
    const user = makeUser({ verified: true, password: "hashed" });
    mockGetUserByEmailQuery.mockResolvedValueOnce([user]);
    mockCompare.mockResolvedValueOnce(true);
    mockUpdateRefreshTokenQuery.mockResolvedValueOnce([]);
    mockCreateRefreshTokenQuery.mockResolvedValueOnce([]);

    const result = await login("user@example.com", "password");

    expect("error" in result).toBe(false);
    if (!("error" in result)) {
      expect(result.user.email).toBe("user@example.com");
      expect(result.accessToken).toBe("access-token");
      expect(result.refreshToken).toBe("refresh-token");
    }
  });

  it("returns error for invalid credentials", async () => {
    mockGetUserByEmailQuery.mockResolvedValueOnce([]);

    const result = await login("user@example.com", "badpass");

    expect("error" in result).toBe(true);
    if ("error" in result) {
      expect(result.error).toBe("Invalid credentials");
    }
  });

  it("returns error for unverified user and sends otp", async () => {
    mockGetUserByEmailQuery.mockResolvedValueOnce([makeUser({ verified: false })]);
    mockCompare.mockResolvedValueOnce(true);
    mockDeleteOtpQuery.mockResolvedValueOnce(1);
    mockCreateOtpQuery.mockResolvedValueOnce([makeOtp()]);
    mockGetUserQuery.mockResolvedValueOnce([makeUser({ verified: false })]);

    const result = await login("user@example.com", "password");

    expect("error" in result).toBe(true);
    if ("error" in result) {
      expect(result.error).toBe("User not verified");
    }
    expect(mockSendMail).toHaveBeenCalledTimes(1);
  });
});

describe("AuthService.refreshTokens", () => {
  it("returns new tokens for valid refresh token", async () => {
    mockGetRefreshTokenQuery.mockResolvedValueOnce([makeRefreshToken()]);
    mockUpdateRefreshTokenQuery.mockResolvedValueOnce([]);
    mockCreateRefreshTokenQuery.mockResolvedValueOnce([]);

    const result = await refreshTokens("refresh-token", { id: 1, email: "user@example.com" });

    expect("error" in result).toBe(false);
    if (!("error" in result)) {
      expect(result.accessToken).toBe("access-token");
      expect(result.refreshToken).toBe("refresh-token");
    }
  });

  it("returns error for invalid refresh token", async () => {
    mockGetRefreshTokenQuery.mockResolvedValueOnce([]);

    const result = await refreshTokens("bad-token", { id: 1, email: "user@example.com" });

    expect("error" in result).toBe(true);
    if ("error" in result) {
      expect(result.error).toBe("Invalid refresh token");
    }
  });
});

describe("AuthService.verifyEmail", () => {
  it("returns user when otp is valid", async () => {
    const user = makeUser({ verified: false });
    mockGetUserByEmailQuery.mockResolvedValueOnce([user]);
    mockGetOtpQuery.mockResolvedValueOnce([makeOtp({ expiresAt: new Date("2030-01-01T00:00:00Z") })]);
    mockActivateUserQuery.mockResolvedValueOnce([]);
    mockDeleteOtpQuery.mockResolvedValueOnce(1);

    const result = await verifyEmail("user@example.com", "123456");

    expect("error" in result).toBe(false);
    if (!("error" in result)) {
      expect(result.email).toBe("user@example.com");
    }
  });

  it("returns error when otp expired", async () => {
    mockGetUserByEmailQuery.mockResolvedValueOnce([makeUser()]);
    mockGetOtpQuery.mockResolvedValueOnce([makeOtp({ expiresAt: new Date("2000-01-01T00:00:00Z") })]);

    const result = await verifyEmail("user@example.com", "123456");

    expect("error" in result).toBe(true);
    if ("error" in result) {
      expect(result.error).toBe("OTP has expired");
    }
  });
});
