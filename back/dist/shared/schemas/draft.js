import { z } from "zod";
import { QuestionTypeSchema } from "./common.js";
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const futureDateSchema = z
    .string()
    .regex(dateRegex, "Дата свадьбы не указана")
    .refine((value) => {
    const date = new Date(value);
    const today = new Date(new Date().toDateString());
    return date > today;
}, "Дата свадьбы не должна быть раньше сегодняшней");
export const colorSchema = z.object({
    colorCode: z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/, "Each color code must be a valid RGBA hex value"),
    position: z.number().int("Color position must be an integer"),
});
export const placeSchema = z.object({
    address: z.string().nullable(),
    placeImage: z.string().url("Place image must be a valid URL").nullable(),
    link: z
        .string()
        .nullable()
        .refine((value) => {
        if (!value)
            return true;
        const validYandex = value.startsWith("https://yandex.ru/maps/");
        const validGoogle = value.startsWith("https://www.google.com/maps/");
        if (!validYandex && !validGoogle)
            return false;
        return true;
    }, 'Ссылка на место проведения должна начинаться с "https://yandex.com/maps/" или "https://www.google.com/maps/"'),
});
export const planItemSchema = z.object({
    eventTime: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Plan item's event time must be in HH:MM format"),
    description: z.string(),
    position: z.number().int(),
});
export const wishSchema = z.object({
    wish: z.string(),
    position: z.number().int(),
});
export const questionSchema = z.object({
    question: z.string(),
    type: QuestionTypeSchema,
    position: z.number().int(),
});
export const answerSchema = z.object({
    answer: z.string(),
    questionPosition: z.number().int(),
    position: z.number().int(),
});
const createUniquePositionsValidator = (items, ctx, path, groupByField) => {
    if (!items)
        return;
    const positionsMap = new Map();
    for (const item of items) {
        const groupKey = groupByField ? String(item[groupByField]) : "default";
        const positionSet = positionsMap.get(groupKey) ?? new Set();
        if (positionSet.has(item.position)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Items must have unique positions",
                path: [path],
            });
            return;
        }
        positionSet.add(item.position);
        positionsMap.set(groupKey, positionSet);
    }
};
const enforceQuestionAnswerConstraints = (questions, answers, ctx) => {
    if (!questions)
        return;
    const answerMap = new Map();
    if (answers) {
        for (const answer of answers) {
            answerMap.set(answer.questionPosition, answer.answer);
        }
    }
    for (const question of questions) {
        const answer = answerMap.get(question.position);
        if ((question.type === "SELECT" || question.type === "CHECKBOX") && !answer) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Question at position ${question.position} is of type ${question.type} and must have an associated answer.`,
                path: ["answers"],
            });
            return;
        }
        if (question.type === "TEXT" && answer) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Question at position ${question.position} is of type ${question.type} and must not have an associated answer.`,
                path: ["answers"],
            });
            return;
        }
    }
};
export const draftUpdateBaseSchema = z.object({
    firstPartnerName: z
        .string()
        .max(50, "Имя невесты не должно превышать 50 символов")
        .nullable()
        .optional(),
    secondPartnerName: z
        .string()
        .max(50, "Имя жениха не должно превышать 50 символов")
        .nullable()
        .optional(),
    coupleImage: z.string().url("Couple image must be a valid URL").nullable().optional(),
    eventDate: z
        .string()
        .regex(dateRegex, "Дата свадьбы не указана")
        .refine((value) => {
        const date = new Date(value);
        const today = new Date(new Date().toDateString());
        return date > today;
    }, "Дата свадьбы не должна быть раньше сегодняшней")
        .nullable()
        .optional(),
    templateName: z.string().nullable().optional(),
    colors: z.array(colorSchema).nullable().optional(),
    place: placeSchema.nullable().optional(),
    planItems: z.array(planItemSchema).nullable().optional(),
    wishes: z.array(wishSchema).nullable().optional(),
    questions: z.array(questionSchema).nullable().optional(),
    answers: z.array(answerSchema).nullable().optional(),
});
export const draftUpdateSchema = draftUpdateBaseSchema.superRefine((data, ctx) => {
    createUniquePositionsValidator(data.colors, ctx, "colors");
    createUniquePositionsValidator(data.planItems, ctx, "planItems");
    createUniquePositionsValidator(data.wishes, ctx, "wishes");
    createUniquePositionsValidator(data.questions, ctx, "questions");
    createUniquePositionsValidator(data.answers, ctx, "answers", "questionPosition");
});
const draftPublishBaseSchema = z.object({
    firstPartnerName: z.string().max(50, "Имя невесты не должно превышать 50 символов"),
    secondPartnerName: z.string().max(50, "Имя жениха не должно превышать 50 символов"),
    coupleImage: z.string().url("Couple image must be a valid URL").nullable().optional(),
    eventDate: futureDateSchema,
    templateName: z.string(),
    place: placeSchema.extend({
        address: z.string().min(1, "Адрес проведения не указан"),
        link: z
            .string()
            .refine((value) => value.startsWith("https://yandex.ru/maps/") ||
            value.startsWith("https://www.google.com/maps/"), 'Ссылка на место проведения должна начинаться с "https://yandex.com/maps/" или "https://www.google.com/maps/"'),
    }),
    colors: z.array(colorSchema).nullable().optional(),
    planItems: z.array(planItemSchema),
    wishes: z.array(wishSchema).nullable().optional(),
    questions: z.array(questionSchema).nullable().optional(),
    answers: z.array(answerSchema).nullable().optional(),
});
export const draftPublishSchema = draftPublishBaseSchema.superRefine((data, ctx) => {
    createUniquePositionsValidator(data.planItems, ctx, "planItems");
    createUniquePositionsValidator(data.wishes, ctx, "wishes");
    createUniquePositionsValidator(data.questions, ctx, "questions");
    createUniquePositionsValidator(data.answers, ctx, "answers", "questionPosition");
    enforceQuestionAnswerConstraints(data.questions ?? null, data.answers ?? null, ctx);
});
export const createDraftSchema = z.object({
    templateName: z.string(),
});
export const draftSchemas = {
    update: draftUpdateSchema,
    publish: draftPublishSchema,
    create: createDraftSchema,
};
