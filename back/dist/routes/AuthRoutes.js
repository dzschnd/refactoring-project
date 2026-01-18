import { Router } from 'express';
import { AuthController } from '../controller/index.js';
import { verifyAccessToken, verifyRefreshToken, verifyUser } from '../middleware/AuthMiddleware.js';
import handleValidationErrors from '../middleware/handleValidationErrors.js';
import { verifyEmailValidation, changeEmailValidation, changePasswordValidation, loginValidation, registerValidation, requestChangeEmailValidation, requestResetPasswordValidation, resetPasswordValidation, requestOtpValidation, changeNameValidation } from "../validation/AuthValidation.js";
const router = Router();
// refresh tokens: send refresh token -> get new refresh-access pair
router.post('/refresh', verifyRefreshToken, verifyUser, AuthController.refresh);
// register: send email + password -> create new user, get otp sent to email
router.post('/register', registerValidation, handleValidationErrors, AuthController.register);
// request otp: send email -> get otp sent to email
router.post('/requestOtp', requestOtpValidation, handleValidationErrors, AuthController.requestOtp);
// login: send email + password -> get new refresh-access pair
router.post('/login', loginValidation, handleValidationErrors, AuthController.login);
// profile: send access token -> get email + id
router.get('/me', verifyAccessToken, verifyUser, AuthController.getProfile);
// logout: send access token -> invalidate refresh token
router.patch('/logout', verifyAccessToken, verifyUser, AuthController.logout);
// verify email: send email, otp -> check email
router.post('/verify-email', verifyEmailValidation, handleValidationErrors, AuthController.verifyEmail);
// activate user: send email, otp -> get user activated
router.post('/activate', verifyEmailValidation, handleValidationErrors, AuthController.activateUser);
// request reset password: send email -> get otp sent to email
router.post('/password/reset', requestResetPasswordValidation, handleValidationErrors, AuthController.requestResetPassword);
// reset password: send email + otp + new password -> change password
router.patch('/password/reset', resetPasswordValidation, handleValidationErrors, AuthController.resetPassword);
// change password (logged in): send access token + old password + new password -> change password
router.patch('/me/password', verifyAccessToken, verifyUser, changePasswordValidation, handleValidationErrors, AuthController.changePassword);
// request change email: send access token + current email + new email -> get otp sent to new email
router.post('/me/email/change-request', verifyAccessToken, verifyUser, requestChangeEmailValidation, handleValidationErrors, AuthController.requestChangeEmail);
// change email: send access token + otp + new email -> change email
router.patch('/me/email', verifyAccessToken, verifyUser, changeEmailValidation, handleValidationErrors, AuthController.changeEmail);
router.patch('/me/name', verifyAccessToken, verifyUser, changeNameValidation, handleValidationErrors, AuthController.changeName);
export default router;
