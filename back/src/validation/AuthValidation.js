import { body } from 'express-validator';

//TODO: get stronger password requirements
export const registerValidation = [
    body('email')
        .isString().withMessage('Email must be a string')
        .isEmail().withMessage('Email must be of valid format'),
    body('password')
        .isString().withMessage('Password must be a string')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];

export const requestOtpValidation = [
    body('email')
        .isString().withMessage('Email must be a string')
        .isEmail().withMessage('Email must be of valid format'),
];

export const loginValidation = [
    body('email')
        .isString().withMessage('Email must be a string')
        .isEmail().withMessage('Email must be of valid format'),
    body('password')
        .isString().withMessage('Password must be a string')
];


export const verifyEmailValidation = [
    body('email')
        .isString().withMessage('Email must be a string')
        .isEmail().withMessage('Email must be of valid format'),
    body('otp')
        .isInt({ min: 100000, max: 999999 }).withMessage('OTP must be a 6-digit number')
];

export const requestChangeEmailValidation = [
    body('currentEmail')
        .isString().withMessage('Current email must be a string')
        .isEmail().withMessage('Current email must be of valid format'),
    body('newEmail')
        .isString().withMessage('New email must be a string')
        .isEmail().withMessage('New email must be of valid format')
];

export const requestResetPasswordValidation = [
    body('email')
        .isString().withMessage('Current email must be a string')
        .isEmail().withMessage('Current email must be of valid format')
];

export const resetPasswordValidation = [
    body('email')
        .isString().withMessage('Email must be a string')
        .isEmail().withMessage('Email must be of valid format'),
    body('password')
        .isString().withMessage('Password must be a string')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
];

export const changePasswordValidation = [
    body('oldPassword')
        .isString().withMessage('Current password must be a string')
        .isLength({ min: 1 }).withMessage('Old password must not be empty'),
    body('newPassword')
        .isString().withMessage('New password must be a string')
        .isLength({ min: 8 }).withMessage('New password must be at least 8 characters long')
];

export const changeEmailValidation = [
    body('otp')
        .isInt({ min: 100000, max: 999999 }).withMessage('Одноразовый код введен неверно'),
    body('newEmail')
        .isString().withMessage('Пожалуйста, введите почту в корректном формате')
        .isEmail().withMessage('Пожалуйста, введите почту в корректном формате')
];

export const changeNameValidation = [
    body('newName')
        .isString().withMessage('Пожалуйста, укажите имя')
        .isLength({ max: 50 }).withMessage('Длина имени не может превышать 50 символов'),
];




