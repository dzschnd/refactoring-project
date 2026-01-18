import { body } from 'express-validator';
export const formAnswerValidation = [
    body('guestName')
        .isString()
        .withMessage('Guest name must be a string')
        .isLength({ max: 50 })
        .withMessage('Guest name must be below 50 characters')
        .trim()
        .notEmpty()
        .withMessage('Guest name cannot be empty'),
    body('answers.*.questionPosition')
        .isInt({ min: 0 })
        .withMessage('Question position must be a positive integer'),
    body('isComing')
        .isBoolean()
        .withMessage('IsComing must be true or false'),
    body('answers.*.answer')
        .isString()
        .withMessage('Answer must be a string')
        .trim()
        .notEmpty()
        .withMessage('Answer cannot be empty'),
    // body('guestId')
    //     .isString()
    //     .withMessage('Guest ID must be a string')
    //     .trim()
    //     .notEmpty()
    //     .withMessage('Guest ID cannot be empty')
];
