import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import type { Request, Response, NextFunction } from "express";
import { getUserQuery } from "../queries/AuthQueries.js";
import logger from "../logger.js";
import {
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/index.js";
type AuthTokenPayload = { id: number; email: string; verified?: boolean };

dotenv.config();
export const verifyAccessToken = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken as string | undefined;
  const secret = process.env.ACCESS_TOKEN_SECRET;

  if (!token) {
    return next(new ForbiddenError("Forbidden"));
  }
  if (!secret) {
    return next(new InternalServerError("Missing access token secret"));
  }

  try {
    req.user = jwt.verify(token, secret) as AuthTokenPayload;
    next();
  } catch (error) {
    logger.warn({ err: error }, "Invalid access token");
    next(new UnauthorizedError("Forbidden"));
  }
};

export const verifyRefreshToken = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.cookies?.refreshToken as string | undefined;
  const secret = process.env.REFRESH_TOKEN_SECRET;

  if (!token) {
    return next(new ForbiddenError("Forbidden"));
  }
  if (!secret) {
    return next(new InternalServerError("Missing refresh token secret"));
  }

  try {
    req.user = jwt.verify(token, secret) as AuthTokenPayload;
    next();
  } catch (error) {
    logger.warn({ err: error }, "Invalid refresh token");
    next(new UnauthorizedError("Forbidden"));
  }
};

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return next(new ForbiddenError("Forbidden"));
    }

    const existingUsers = await getUserQuery(req.user.id);

    if (existingUsers.length === 0) {
      return next(new NotFoundError("User not found"));
    }
    if (req.user.verified === false) {
      return next(new ForbiddenError("User not verified"));
    }

    next();
  } catch (error) {
    logger.error({ err: error }, "Failed to verify user");
    next(new InternalServerError("Failed to verify user"));
  }
};
