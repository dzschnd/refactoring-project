import { body } from "express-validator";
import { publishedQuestionConstraintsValidation, uniquePositionValidator, updatedQuestionConstraintsValidation } from "./validators.js";
export const updateValidation = [
    body('firstPartnerName')
        .optional({ nullable: true })
        .isString()
        .withMessage('Имя невесты не указано')
        .isLength({ max: 50 })
        .withMessage('Имя невесты не должно превышать 50 символов'),
    body('secondPartnerName')
        .optional({ nullable: true })
        .isString()
        .withMessage('Имя жениха не указано')
        .isLength({ max: 50 })
        .withMessage('Имя жениха не должно превышать 50 символов'),
    body('coupleImage')
        .optional({ nullable: true })
        .isURL()
        .withMessage('Couple image must be a valid URL'),
    body('eventDate')
        .optional({ nullable: true })
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage('Дата свадьбы не указана')
        .isAfter(new Date(new Date().toDateString()).toString())
        .withMessage("Дата свадьбы не должна быть раньше сегодняшней"),
    body('place')
        .optional({ nullable: true })
        .isObject()
        .withMessage('Place must be an object'),
    body('place.address')
        .optional({ nullable: true })
        .isString()
        .withMessage('Place address must be a string'),
    body('place.placeImage')
        .optional({ nullable: true })
        .isURL()
        .withMessage('Place image must be a valid URL'),
    body('place.link')
        .optional({ nullable: true })
        .custom((value) => {
        if (!value)
            return true;
        const validYandex = value.startsWith('https://yandex.ru/maps/');
        const validGoogle = value.startsWith('https://www.google.com/maps/');
        if (value && !validYandex && !validGoogle)
            throw new Error('Ссылка на место проведения должна начинаться с "https://yandex.com/maps/" или "https://www.google.com/maps/"');
        return true;
    }),
    body('templateName')
        .optional({ nullable: true })
        .isString()
        .withMessage('Template name must be a string'),
    body('colors')
        .optional({ nullable: true })
        .isArray()
        .withMessage('Color codes must be an array'),
    body('colors.*.colorCode')
        .optional({ nullable: true })
        .matches(/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/)
        .withMessage('Each color code must be a valid RGBA hex value'),
    body('colors.*.position')
        .optional({ nullable: true })
        .isInt()
        .withMessage('Color position must be an integer'),
    body('planItems')
        .optional({ nullable: true })
        .isArray()
        .withMessage('Plan items must be an array')
        .custom(uniquePositionValidator('invitationId'))
        .withMessage('Plan items must be an array with non-repeating positions'),
    body('planItems.*.eventTime')
        .optional({ nullable: true })
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage('Plan item\'s event time must be in HH:MM format'),
    body('planItems.*.description')
        .optional({ nullable: true })
        .isString()
        .withMessage('Plan item description must be a string'),
    body('planItems.*.position')
        .optional({ nullable: true })
        .isInt()
        .withMessage('Plan item position must be an integer'),
    body('wishes')
        .optional({ nullable: true })
        .isArray()
        .withMessage('Wishes must be an array')
        .custom(uniquePositionValidator('invitationId'))
        .withMessage('Wishes must be an array with non-repeating positions'),
    body('wishes.*.wish')
        .optional({ nullable: true })
        .isString()
        .withMessage('Each wish must be a string'),
    body('wishes.*.position')
        .optional({ nullable: true })
        .isInt()
        .withMessage('Each wish position must be an integer'),
    body('questions')
        .optional({ nullable: true })
        .isArray(),
    body('questions.*.question')
        .optional({ nullable: true })
        .isString()
        .withMessage('Each question must be a string'),
    body('questions.*.type')
        .optional({ nullable: true })
        .isString()
        .withMessage('Each question type must be a string')
        .isIn(['TEXT', 'SELECT', 'CHECKBOX'])
        .withMessage('Each question type must be one of the following: TEXT, SELECT, CHECKBOX'),
    body('questions.*.position')
        .optional({ nullable: true })
        .isInt()
        .withMessage('Each question position must be an integer'),
    body('questions')
        .optional({ nullable: true })
        .isArray()
        .withMessage('Questions must be an array')
        .custom(uniquePositionValidator('invitationId'))
        .withMessage('Questions must be an array with non-repeating positions')
        .custom(updatedQuestionConstraintsValidation()),
    body('answers')
        .optional({ nullable: true })
        .isArray()
        .withMessage('Answers must be an array'),
    body('answers.*.answer')
        .optional({ nullable: true })
        .isString()
        .withMessage('Each answer must be a string'),
    body('answers.*.questionPosition')
        .optional({ nullable: true })
        .isInt()
        .withMessage('Each question position must be an integer'),
    body('answers.*.position')
        .optional({ nullable: true })
        .isInt()
        .withMessage('Each answer position must be an integer'),
    body('answers')
        .optional({ nullable: true })
        .custom(uniquePositionValidator('questionPosition'))
        .withMessage('Answers must be an array with non-repeating positions')
];
export const publishValidation = [
    body('firstPartnerName')
        .isString()
        .withMessage('Имя невесты не указано')
        .isLength({ max: 50 })
        .withMessage('Имя невесты не должно превышать 50 символов'),
    body('secondPartnerName')
        .isString()
        .withMessage('Имя жениха не указано')
        .isLength({ max: 50 })
        .withMessage('Имя жениха не должно превышать 50 символов'),
    body('coupleImage')
        .optional({ nullable: true })
        .isURL()
        .withMessage('Couple image must be a valid URL'),
    body('eventDate')
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage('Дата свадьбы не указана')
        .isAfter(new Date(new Date().toDateString()).toString())
        .withMessage("Дата свадьбы не должна быть раньше сегодняшней"),
    body('templateName')
        .isString()
        .withMessage('Template name must be a string'),
    body('place')
        .isObject()
        .withMessage('Place must be an object'),
    body('place.address')
        .isString()
        .isLength({ min: 1 })
        .withMessage('Адрес проведения не указан'),
    body('place.placeImage')
        .optional({ nullable: true })
        .isURL()
        .withMessage('Place image must be a valid URL'),
    body('place.link')
        .custom((value) => {
        if (!value)
            throw new Error('Ссылка на место проведения не указана');
        const validYandex = value.startsWith('https://yandex.ru/maps/');
        const validGoogle = value.startsWith('https://www.google.com/maps/');
        if (!validYandex && !validGoogle)
            throw new Error('Ссылка на место проведения должна начинаться с "https://yandex.com/maps/" или "https://www.google.com/maps/"');
        return true;
    }),
    body('colors')
        .optional({ nullable: true })
        .isArray()
        .withMessage('Colors must be an array'),
    body('colors.*.colorCode')
        .matches(/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/)
        .withMessage('Each color code must be a valid RGBA hex value'),
    body('colors.*.position')
        .isInt()
        .withMessage('Color position must be an integer'),
    body('planItems')
        .isArray()
        .withMessage('Программа не указана')
        .custom(uniquePositionValidator('invitationId'))
        .withMessage('Plan items must be an array with non-repeating positions'),
    body('planItems.*.eventTime')
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage('Plan item\'s event time must be in HH:MM format'),
    body('planItems.*.description')
        .isString()
        .withMessage('Plan item description must be a string'),
    body('planItems.*.position')
        .isInt()
        .withMessage('Plan item position must be an integer'),
    body('wishes')
        .optional({ nullable: true })
        .isArray()
        .withMessage('Wishes must be an array')
        .custom(uniquePositionValidator('invitationId'))
        .withMessage('Wishes must be an array with non-repeating positions'),
    body('wishes.*.wish')
        .isString()
        .withMessage('Each wish must be a string'),
    body('wishes.*.position')
        .isInt()
        .withMessage('Each wish position must be an integer'),
    body('questions')
        .optional({ nullable: true })
        .isArray()
        .withMessage('Questions must be an array'),
    body('questions.*.question')
        .isString()
        .withMessage('Each question must be a string'),
    body('questions.*.type')
        .isString()
        .withMessage('Each question type must be a string')
        .isIn(['TEXT', 'SELECT', 'CHECKBOX'])
        .withMessage('Each question type must be one of the following: TEXT, SELECT, CHECKBOX'),
    body('questions.*.position')
        .isInt()
        .withMessage('Each question position must be an integer'),
    body('questions')
        .custom(uniquePositionValidator('invitationId'))
        .withMessage('Questions must be an array with non-repeating positions')
        .custom(publishedQuestionConstraintsValidation()),
    body('answers')
        .optional({ nullable: true })
        .isArray()
        .withMessage('Answers must be an array'),
    body('answers.*.answer')
        .isString()
        .withMessage('Each answer must be a string'),
    body('answers.*.questionPosition')
        .isInt()
        .withMessage('Each question position must be an integer'),
    body('answers.*.position')
        .isInt()
        .withMessage('Each answer position must be an integer'),
    body('answers')
        .optional({ nullable: true })
        .custom(uniquePositionValidator('questionPosition'))
        .withMessage('Answers must be an array with non-repeating positions')
];
