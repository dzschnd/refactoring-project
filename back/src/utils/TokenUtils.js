import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import {getExpirationTimeHours} from "./TimeUtils.js";

dotenv.config();
export const signAccessToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
};
export const signRefreshToken = (user) => {
    const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
    const expiresAt = getExpirationTimeHours(24 * 30);

    return { refreshToken, expiresAt: expiresAt };
};