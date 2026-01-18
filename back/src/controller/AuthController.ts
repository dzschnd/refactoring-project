import type { Request, Response } from "express";
import * as AuthService from "../service/AuthService.js";
import { checkPassword } from "../service/AuthService.js";
import { clearAuthCookies, setAuthCookies } from "../utils/CookieUtils.js";
import { EMAIL_NOT_AVAILABLE, SERVER_ERROR } from "../messages/messages.js";
import {
  AppError,
  BadRequestError,
  ConflictError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from "../errors/index.js";
import type { ServiceResponse } from "../types/service.js";
import { isServiceError } from "../types/service.js";

const throwMappedError = (error: string, mapping: Record<string, () => AppError>): never => {
  const factory = mapping[error];
  if (factory) {
    throw factory();
  }
  throw new InternalServerError(SERVER_ERROR);
};

const unwrapService = <T>(result: ServiceResponse<T>, mapping: Record<string, () => AppError>): T => {
  if (isServiceError(result)) {
    throwMappedError(result.error, mapping);
  }
  return result as T;
};

export const refresh = async (req: Request, res: Response): Promise<Response> => {
  const refreshToken = req.cookies.refreshToken as string | undefined;
  if (!req.user || !refreshToken) {
    throw new ForbiddenError("Forbidden");
  }
  const tokens = unwrapService(
    await AuthService.refreshTokens(refreshToken, req.user),
    {
      "Invalid refresh token": () => new ForbiddenError("Invalid refresh token"),
      "Refresh token expired": () => new ForbiddenError("Refresh token expired"),
      "Refresh token has expired": () => new ForbiddenError("Refresh token expired"),
    }
  );
  const { accessToken, refreshToken: newRefreshToken } = tokens;
  setAuthCookies(res, newRefreshToken, accessToken);
  return res.status(201).json({ message: "Tokens refreshed successfully" });
};

export const verifyEmail = async (req: Request, res: Response): Promise<Response> => {
  const { email, otp } = req.body as { email: string; otp: string };
  const user = unwrapService(
    await AuthService.verifyEmail(email, otp),
    {
      "User not found": () => new NotFoundError("User not found"),
      "OTP not found": () => new NotFoundError("OTP not found"),
      "OTP has expired": () => new BadRequestError("OTP has expired"),
    }
  );
  return res.status(201).json({ message: "Email verified" });
};

export const activateUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, otp } = req.body as { email: string; otp: string };
  const user = unwrapService(
    await AuthService.verifyEmail(email, otp),
    {
      "User not found": () => new NotFoundError("User not found"),
      "OTP not found": () => new NotFoundError("OTP not found"),
      "OTP has expired": () => new BadRequestError("OTP has expired"),
    }
  );

  const tokens = unwrapService(
    await AuthService.activateUser(user),
    {
      "User not found": () => new NotFoundError("User not found"),
      "User email not verified": () => new ForbiddenError("User email not verified"),
    }
  );

  const { accessToken, refreshToken: newRefreshToken } = tokens;
  setAuthCookies(res, newRefreshToken, accessToken);
  return res.status(201).json({ message: "User activated successfully" });
};

export const requestChangeEmail = async (req: Request, res: Response): Promise<Response> => {
  const { currentEmail, newEmail } = req.body as { currentEmail: string; newEmail: string };
  const response = unwrapService(
    await AuthService.requestChangeEmail(currentEmail, newEmail),
    {
      "User not found": () => new NotFoundError("User not found"),
      "Email not available": () => new ConflictError("Email not available"),
    }
  );
  return res.status(202).json(response);
};

export const requestResetPassword = async (req: Request, res: Response): Promise<Response> => {
  const { email } = req.body as { email: string };
  const response = unwrapService(
    await AuthService.requestResetPassword(email),
    {
      "User not found": () => new NotFoundError("User not found"),
    }
  );
  return res.status(202).json(response);
};

export const resetPassword = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body as { email: string; password: string };
  const response = unwrapService(
    await AuthService.changePassword(password, email),
    {
      "User not found": () => new NotFoundError("User not found"),
    }
  );
  return res.status(200).json(response);
};

export const changePassword = async (req: Request, res: Response): Promise<Response> => {
  const { oldPassword, newPassword } = req.body as { oldPassword: string; newPassword: string };
  if (!req.user) {
    throw new ForbiddenError("Forbidden");
  }
  unwrapService(
    await checkPassword({ email: req.user.email, password: null }, oldPassword),
    {
      "Invalid credentials": () => new BadRequestError("Invalid credentials"),
    }
  );
  const response = unwrapService(
    await AuthService.changePassword(newPassword, req.user.email),
    {
      "User not found": () => new NotFoundError("User not found"),
    }
  );
  return res.status(200).json(response);
};

export const changeName = async (req: Request, res: Response): Promise<Response> => {
  const { newName } = req.body as { newName: string };
  if (!req.user) {
    throw new ForbiddenError("Forbidden");
  }
  const response = unwrapService(
    await AuthService.changeName(newName, req.user.email),
    {}
  );
  return res.status(200).json(response);
};

export const changeEmail = async (req: Request, res: Response): Promise<Response> => {
  const { otp, newEmail } = req.body as { otp: string; newEmail: string };
  if (!req.user) {
    throw new ForbiddenError("Forbidden");
  }
  const user = unwrapService(
    await AuthService.verifyEmail(req.user.email, otp),
    {
      "User not found": () => new NotFoundError("User not found"),
      "OTP not found": () => new BadRequestError("OTP not found"),
      "OTP has expired": () => new BadRequestError("OTP has expired"),
    }
  );
  const response = unwrapService(
    await AuthService.changeEmail(user.email, newEmail),
    {
      "User not found": () => new NotFoundError("User not found"),
      "Email is not available": () => new ConflictError("Email is not available"),
    }
  );
  return res.status(200).json(response);
};

export const requestOtp = async (req: Request, res: Response): Promise<Response> => {
  const { email } = req.body as { email: string };
  const response = unwrapService(
    await AuthService.requestOtp(email),
    {
      "User not found": () => new NotFoundError("User not found"),
    }
  );
  return res.status(201).json(response);
};

export const register = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body as { email: string; password: string };
  const response = unwrapService(
    await AuthService.register(email, password),
    {
      [EMAIL_NOT_AVAILABLE]: () => new ConflictError(EMAIL_NOT_AVAILABLE),
    }
  );
  return res.status(201).json(response);
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body as { email: string; password: string };
  const userWithTokens = unwrapService(
    await AuthService.login(email, password),
    {
      "Invalid credentials": () => new BadRequestError("Invalid credentials"),
      "User not verified": () => new ForbiddenError("User not verified"),
    }
  );
  const { user, accessToken, refreshToken: newRefreshToken } = userWithTokens;
  setAuthCookies(res, newRefreshToken, accessToken);
  return res.status(200).json(user);
};

export const getProfile = async (req: Request, res: Response): Promise<Response> => {
  if (!req.user) {
    throw new ForbiddenError("Forbidden");
  }
  const currentUser = unwrapService(
    await AuthService.getProfile(req.user),
    {
      "User not found": () => new NotFoundError("User not found"),
    }
  );
  return res.status(200).json(currentUser);
};

export const logout = async (req: Request, res: Response): Promise<Response> => {
  if (!req.user) {
    throw new ForbiddenError("Forbidden");
  }
  const response = unwrapService(
    await AuthService.logout(req.user),
    {}
  );
  clearAuthCookies(res);
  return res.status(200).json(response);
};
