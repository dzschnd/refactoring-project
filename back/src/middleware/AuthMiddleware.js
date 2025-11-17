import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import {getUserQuery} from "../queries/AuthQueries.js";
import {commitTransaction, connectClient, releaseClient} from "../queries/CommonQueries.js";
import {errorResponse} from "../utils/errorUtils.js";

dotenv.config();
export const verifyAccessToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(403).json(errorResponse('Forbidden'));
    }

    try {
        req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json(errorResponse('Forbidden'));
    }
}

export const verifyRefreshToken = async (req, res, next) => {
    const token = req.cookies.refreshToken;
    console.log(`Refreshing token: ${token}`);

    if (!token) {
        return res.status(403).json(errorResponse('Forbidden'));
    }

    try {
        req.user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json(errorResponse('Forbidden'));
    }
}

export const verifyUser = async (req, res, next) => {
    let client;
    try {
        client = await connectClient();

        const existingUsers = await getUserQuery(req.user.id, client);

        if (existingUsers.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (req.user.verified === false) {
            return res.status(403).json({ error: 'User not verified' });
        }

        await commitTransaction(client);

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json(errorResponse('Failed to verify user'));
    } finally {
        if (client) releaseClient(client);
    }
};