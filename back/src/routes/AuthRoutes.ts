import { Router } from 'express';
import { AuthController } from '../controller/index.js';
import {verifyAccessToken, verifyRefreshToken, verifyUser} from '../middleware/AuthMiddleware.js';
import handleValidationErrors from '../middleware/handleValidationErrors.js';
import asyncHandler from "../middleware/asyncHandler.js";
import {
    verifyEmailValidation,
    changeEmailValidation,
    changePasswordValidation,
    loginValidation,
    registerValidation,
    requestChangeEmailValidation,
    requestResetPasswordValidation,
    resetPasswordValidation,
    requestOtpValidation, changeNameValidation
} from "../validation/AuthValidation.js";

const router = Router();

// refresh tokens: send refresh token -> get new refresh-access pair
router.post('/refresh',
    verifyRefreshToken, verifyUser,
    asyncHandler(AuthController.refresh));

// register: send email + password -> create new user, get otp sent to email
router.post('/register',
    registerValidation, handleValidationErrors,
    asyncHandler(AuthController.register));

// request otp: send email -> get otp sent to email
router.post('/requestOtp',
    requestOtpValidation, handleValidationErrors,
    asyncHandler(AuthController.requestOtp));

// login: send email + password -> get new refresh-access pair
router.post('/login',
    loginValidation, handleValidationErrors,
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
    verifyEmailValidation, handleValidationErrors,
    asyncHandler(AuthController.verifyEmail));

// activate user: send email, otp -> get user activated
router.post('/activate',
    verifyEmailValidation, handleValidationErrors,
    asyncHandler(AuthController.activateUser));

// request reset password: send email -> get otp sent to email
router.post('/password/reset',
    requestResetPasswordValidation, handleValidationErrors,
    asyncHandler(AuthController.requestResetPassword));

// reset password: send email + otp + new password -> change password
router.patch('/password/reset',
    resetPasswordValidation, handleValidationErrors,
    asyncHandler(AuthController.resetPassword));

// change password (logged in): send access token + old password + new password -> change password
router.patch('/me/password',
    verifyAccessToken, verifyUser,
    changePasswordValidation, handleValidationErrors,
    asyncHandler(AuthController.changePassword));

// request change email: send access token + current email + new email -> get otp sent to new email
router.post('/me/email/change-request',
    verifyAccessToken, verifyUser,
    requestChangeEmailValidation, handleValidationErrors,
    asyncHandler(AuthController.requestChangeEmail));

// change email: send access token + otp + new email -> change email
router.patch('/me/email',
    verifyAccessToken, verifyUser,
    changeEmailValidation,
    handleValidationErrors,
    asyncHandler(AuthController.changeEmail));

router.patch('/me/name',
    verifyAccessToken, verifyUser,
    changeNameValidation,
    handleValidationErrors,
    asyncHandler(AuthController.changeName));

export default router;
