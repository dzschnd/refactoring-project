import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { getExpirationTimeHours } from "./TimeUtils.js";
dotenv.config();
export const signAccessToken = (user) => {
    const secret = process.env.ACCESS_TOKEN_SECRET ?? "dev-access-secret";
    return jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: "1h" });
};
export const signRefreshToken = (user) => {
    const secret = process.env.REFRESH_TOKEN_SECRET ?? "dev-refresh-secret";
    const refreshToken = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: "30d" });
    const expiresAt = getExpirationTimeHours(24 * 30);
    return { refreshToken, expiresAt: expiresAt };
};
