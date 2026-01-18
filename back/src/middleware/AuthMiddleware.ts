import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import type { Request, Response, NextFunction } from "express";
import {getUserQuery} from "../queries/AuthQueries.js";
import {errorResponse} from "../utils/errorUtils.js";
type AuthTokenPayload = { id: number; email: string; verified?: boolean };

dotenv.config();
export const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;
    const secret = process.env.ACCESS_TOKEN_SECRET;

    if (!token) {
        return res.status(403).json(errorResponse('Forbidden'));
    }
    if (!secret) {
        return res.status(500).json(errorResponse('Missing access token secret'));
    }

    try {
        req.user = jwt.verify(token, secret) as AuthTokenPayload;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json(errorResponse('Forbidden'));
    }
}

export const verifyRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.refreshToken;
    console.log(`Refreshing token: ${token}`);
    const secret = process.env.REFRESH_TOKEN_SECRET;

    if (!token) {
        return res.status(403).json(errorResponse('Forbidden'));
    }
    if (!secret) {
        return res.status(500).json(errorResponse('Missing refresh token secret'));
    }

    try {
        req.user = jwt.verify(token, secret) as AuthTokenPayload;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json(errorResponse('Forbidden'));
    }
}

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(403).json(errorResponse('Forbidden'));
        }

        const existingUsers = await getUserQuery(req.user.id);

        if (existingUsers.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (req.user.verified === false) {
            return res.status(403).json({ error: 'User not verified' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json(errorResponse('Failed to verify user'));
    }
};
