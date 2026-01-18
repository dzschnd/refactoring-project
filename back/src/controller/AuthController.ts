import type { Request, Response } from "express";
import * as AuthService from "../service/AuthService.js";
import {errorResponse} from "../utils/errorUtils.js";
import {checkPassword} from "../service/AuthService.js";
import {clearAuthCookies, setAuthCookies} from "../utils/CookieUtils.js";
import {EMAIL_NOT_AVAILABLE, SERVER_ERROR} from "../messages/messages.js";
import { isServiceError } from "../types/service.js";

export const refresh = async (req: Request, res: Response): Promise<Response> => {
    const refreshToken = req.cookies.refreshToken;

    if (!req.user) {
        return res.status(403).json(errorResponse("Forbidden"));
    }

    const tokens = await AuthService.refreshTokens(refreshToken, req.user);

    if (isServiceError(tokens)) {
        const statusCode = tokens.error === 'Invalid refresh token' || tokens.error === 'Refresh token has expired'
            ? 403
            : 500;
        return res.status(statusCode).json(errorResponse(tokens.status === 500 ? SERVER_ERROR : tokens.error));
    }

    const { accessToken: accessToken, refreshToken: newRefreshToken } = tokens;

    setAuthCookies(res, newRefreshToken, accessToken);

    return res.status(201).json({
        message: 'Tokens refreshed successfully',
    });
};


export const verifyEmail = async (req: Request, res: Response): Promise<Response> => {
    const { email, otp } = req.body;

    const user = await AuthService.verifyEmail(email, otp);
    if (isServiceError(user)) {
        const statusCode = user.error === 'User not found' || user.error === 'OTP not found'
            ? 404
            : user.error === 'OTP has expired'
                ? 400
                : 500;
        return res.status(statusCode).json(errorResponse(user.status === 500 ? SERVER_ERROR : user.error));
    }

    return res.status(201).json({message: 'Email verified'});
};

export const activateUser = async (req: Request, res: Response): Promise<Response> => {
    const { email, otp } = req.body;

    const user = await AuthService.verifyEmail(email, otp);
    if (isServiceError(user)) {
        const statusCode = user.error === 'User not found(' || user.error === 'OTP not found'
            ? 404
            : user.error === 'OTP has expired'
                ? 400
                : 500;
        return res.status(statusCode).json(errorResponse(user.status === 500 ? SERVER_ERROR : user.error));
    }

    const tokens = await AuthService.activateUser(user);
    if (isServiceError(tokens)) {
        const statusCode = tokens.error === 'User not found'
            ? 404
            : tokens.error === 'User email not verified'
                ? 401
                : 500;
        return res.status(statusCode).json(errorResponse(tokens.status === 500 ? SERVER_ERROR : tokens.error));
    }

    const { accessToken: accessToken, refreshToken: newRefreshToken } = tokens;

    setAuthCookies(res, newRefreshToken, accessToken);

    return res.status(201).json({message: 'User activated successfully'});
};

export const requestChangeEmail = async (req: Request, res: Response): Promise<Response> => {
    const { currentEmail, newEmail } = req.body;

    const response = await AuthService.requestChangeEmail(currentEmail, newEmail);
    if (isServiceError(response)) {
        const statusCode = response.error === 'User not found'
            ? 404
            : response.error === 'Email not available'
                ? 400
                : 500;
        return res.status(statusCode).json(errorResponse(response.error));
    }
    return res.status(202).json(response);
};

export const requestResetPassword = async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body;

    const response = await AuthService.requestResetPassword(email);
    if (isServiceError(response)) {
        const statusCode = response.error === 'User not found'
            ? 404
            : 500;
        return res.status(statusCode).json(errorResponse(response.error));
    }
    return res.status(202).json(response);
};

export const resetPassword = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;


    const response = await AuthService.changePassword(password, email);
    if (isServiceError(response)) {
        return res.status(500).json(errorResponse(response.error));
    }
    return res.status(200).json(response);
};

export const changePassword = async (req: Request, res: Response): Promise<Response> => {
    const { oldPassword, newPassword } = req.body;

    if (!req.user) {
        return res.status(403).json(errorResponse("Forbidden"));
    }

    const checkPasswordResponse = await checkPassword({ email: req.user.email, password: null }, oldPassword);

    if (isServiceError(checkPasswordResponse)) {
        const statusCode = checkPasswordResponse.error === 'Invalid credentials'
            ? 400
            : 500;
        return res.status(statusCode).json(errorResponse(checkPasswordResponse.status === 500 ? SERVER_ERROR : checkPasswordResponse.error));
    }

    const response = await AuthService.changePassword(newPassword, req.user.email);
    if (isServiceError(response)) {
        return res.status(500).json(errorResponse(response.error));
    }
    return res.status(200).json(response);
}

export const changeName = async (req: Request, res: Response): Promise<Response> => {
    const { newName } = req.body;

    if (!req.user) {
        return res.status(403).json(errorResponse("Forbidden"));
    }

    const response = await AuthService.changeName(newName, req.user.email);
    if (isServiceError(response)) {
        return res.status(500).json(errorResponse(response.error));
    }
    return res.status(200).json(response);
};

export const changeEmail = async (req: Request, res: Response): Promise<Response> => {
    const { otp, newEmail } = req.body;

    if (!req.user) {
        return res.status(403).json(errorResponse("Forbidden"));
    }

    const user = await AuthService.verifyEmail(req.user.email, otp);
    if (isServiceError(user)) {
        const statusCode = user.error === 'User not found'
            ? 404
            : user.error === 'OTP has expired' || user.error === 'OTP not found'
                ? 400
                : 500;
        return res.status(statusCode).json(errorResponse(user.status === 500 ? SERVER_ERROR : user.error));
    }

    const response = await AuthService.changeEmail(user.email, newEmail);
    if (isServiceError(response)) {
        return res.status(500).json(errorResponse(response.error));
    }
    return res.status(200).json(response);
};

export const requestOtp = async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body;

    const response = await AuthService.requestOtp(email);
    if (isServiceError(response)) {
        const statusCode = response.error === 'User not found'
            ? 404
            : 500;
        return res.status(statusCode).json(errorResponse(response.error));
    }
    return res.status(201).json(response);
};

export const register = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    const response = await AuthService.register(email, password);
    if (isServiceError(response)) {
        const statusCode = response.error === EMAIL_NOT_AVAILABLE
            ? 400
            : 500;
        return res.status(statusCode).json(errorResponse(response.error));
    }
    return res.status(201).json(response);
};

export const login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    const userWithTokens = await AuthService.login(email, password);
    if (isServiceError(userWithTokens)) {
        const statusCode = userWithTokens.error === 'Invalid credentials'
            ? 400
            : userWithTokens.error === 'User not verified'
                ? 403
                : 500;
        return res.status(statusCode).json(errorResponse(userWithTokens.status === 500 ? SERVER_ERROR : userWithTokens.error));
    }

    const { user, accessToken, refreshToken: newRefreshToken } = userWithTokens;

    setAuthCookies(res, newRefreshToken, accessToken);

    return res.status(200).json(user);
};

export const getProfile = async (req: Request, res: Response): Promise<Response> => {
    if (!req.user) {
        return res.status(403).json(errorResponse("Forbidden"));
    }
    const currentUser = await AuthService.getProfile(req.user);
    if (isServiceError(currentUser)) {
        const statusCode = currentUser.error === 'User not found'
            ? 404
            : 500;
        return res.status(statusCode).json(errorResponse(currentUser.status === 500 ? SERVER_ERROR : currentUser.error));
    }
    return res.status(200).json(currentUser);
};

export const logout = async (req: Request, res: Response): Promise<Response> => {
    if (!req.user) {
        return res.status(403).json(errorResponse("Forbidden"));
    }
    const response = await AuthService.logout(req.user);
    if (isServiceError(response)) {
        return res.status(500).json(errorResponse(response.error));
    }

   clearAuthCookies(res);

    return res.status(200).json(response);
};
