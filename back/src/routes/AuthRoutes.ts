import { Router } from 'express';
import { AuthController } from '../controller/index.js';
import {verifyAccessToken, verifyRefreshToken, verifyUser} from '../middleware/AuthMiddleware.js';
import asyncHandler from "../middleware/asyncHandler.js";
import { validateBody } from "../middleware/validate.js";
import { authSchemas } from "../shared/schemas/auth.js";

const router = Router();

// refresh tokens: send refresh token -> get new refresh-access pair
router.post('/refresh',
    verifyRefreshToken, verifyUser,
    asyncHandler(AuthController.refresh));

// register: send email + password -> create new user, get otp sent to email
router.post('/register',
    validateBody(authSchemas.register),
    asyncHandler(AuthController.register));

// request otp: send email -> get otp sent to email
router.post('/requestOtp',
    validateBody(authSchemas.requestOtp),
    asyncHandler(AuthController.requestOtp));

// login: send email + password -> get new refresh-access pair
router.post('/login',
    validateBody(authSchemas.login),
    asyncHandler(AuthController.login));

// profile: send access token -> get email + id
router.get('/me',
    verifyAccessToken, verifyUser,
    asyncHandler(AuthController.getProfile));

// logout: send access token -> invalidate refresh token
router.patch('/logout',
    verifyAccessToken, verifyUser,
    asyncHandler(AuthController.logout));

// verify email: send email, otp -> check email
router.post('/verify-email',
    validateBody(authSchemas.verifyEmail),
    asyncHandler(AuthController.verifyEmail));

// activate user: send email, otp -> get user activated
router.post('/activate',
    validateBody(authSchemas.verifyEmail),
    asyncHandler(AuthController.activateUser));

// request reset password: send email -> get otp sent to email
router.post('/password/reset',
    validateBody(authSchemas.requestResetPassword),
    asyncHandler(AuthController.requestResetPassword));

// reset password: send email + otp + new password -> change password
router.patch('/password/reset',
    validateBody(authSchemas.resetPassword),
    asyncHandler(AuthController.resetPassword));

// change password (logged in): send access token + old password + new password -> change password
router.patch('/me/password',
    verifyAccessToken, verifyUser,
    validateBody(authSchemas.changePassword),
    asyncHandler(AuthController.changePassword));

// request change email: send access token + current email + new email -> get otp sent to new email
router.post('/me/email/change-request',
    verifyAccessToken, verifyUser,
    validateBody(authSchemas.requestChangeEmail),
    asyncHandler(AuthController.requestChangeEmail));

// change email: send access token + otp + new email -> change email
router.patch('/me/email',
    verifyAccessToken, verifyUser,
    validateBody(authSchemas.changeEmail),
    asyncHandler(AuthController.changeEmail));

router.patch('/me/name',
    verifyAccessToken, verifyUser,
    validateBody(authSchemas.changeName),
    asyncHandler(AuthController.changeName));

export default router;
