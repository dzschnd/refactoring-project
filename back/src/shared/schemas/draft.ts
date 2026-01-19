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
    .regex(
      /^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/,
      "Цвет должен быть в формате HEX (#RRGGBB или #RRGGBBAA)",
    ),
  position: z.number().int("Позиция цвета должна быть целым числом"),
});

export const placeSchema = z.object({
  address: z.string().nullable(),
  placeImage: z.string().url("Ссылка на изображение места некорректна").nullable(),
  link: z
    .string()
    .nullable()
    .refine((value) => {
      if (!value) return true;
      const validYandex = value.startsWith("https://yandex.ru/maps/");
      const validGoogle = value.startsWith("https://www.google.com/maps/");
      if (!validYandex && !validGoogle) return false;
      return true;
    }, 'Ссылка на место проведения должна начинаться с "https://yandex.ru/maps/" или "https://www.google.com/maps/"'),
});

export const planItemSchema = z.object({
  eventTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Время события должно быть в формате ЧЧ:ММ"),
  description: z.string().min(1, "Описание события не указано"),
  position: z.number().int("Позиция события должна быть целым числом"),
});

export const wishSchema = z.object({
  wish: z.string().min(1, "Пожелание не указано"),
  position: z.number().int(),
});

export const questionSchema = z.object({
  question: z.string().min(1, "Вопрос не указан"),
  type: QuestionTypeSchema,
  position: z.number().int("Позиция вопроса должна быть целым числом"),
});

export const answerSchema = z.object({
  answer: z.string().min(1, "Ответ не указан"),
  questionPosition: z.number().int("Позиция вопроса должна быть целым числом"),
  position: z.number().int("Позиция ответа должна быть целым числом"),
});

const createUniquePositionsValidator = <T extends { position: number }>(
  items: T[] | null | undefined,
  ctx: z.RefinementCtx,
  path: string,
  groupByField?: keyof T,
): void => {
  if (!items) return;
  const positionsMap = new Map<string, Set<number>>();
  for (const item of items) {
    const groupKey = groupByField ? String(item[groupByField]) : "default";
    const positionSet = positionsMap.get(groupKey) ?? new Set<number>();
    if (positionSet.has(item.position)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Позиции в списке должны быть уникальными",
        path: [path],
      });
      return;
    }
    positionSet.add(item.position);
    positionsMap.set(groupKey, positionSet);
  }
};

type QuestionInput = z.infer<typeof questionSchema>;
type AnswerInput = z.infer<typeof answerSchema>;

const enforceQuestionAnswerConstraints = (
  questions: QuestionInput[] | null | undefined,
  answers: AnswerInput[] | null | undefined,
  ctx: z.RefinementCtx,
): void => {
  if (!questions) return;
  const answerMap = new Map<number, string>();
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
        message: `Вопрос №${question.position} (${question.type}) требует вариант ответа.`,
        path: ["answers"],
      });
      return;
    }
    if (question.type === "TEXT" && answer) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Вопрос №${question.position} (TEXT) не должен иметь вариантов ответа.`,
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

export const draftUpdateSchema = draftUpdateBaseSchema.superRefine(
  (data: z.infer<typeof draftUpdateBaseSchema>, ctx) => {
    createUniquePositionsValidator(data.colors, ctx, "colors");
    createUniquePositionsValidator(data.planItems, ctx, "planItems");
    createUniquePositionsValidator(data.wishes, ctx, "wishes");
    createUniquePositionsValidator(data.questions, ctx, "questions");
    createUniquePositionsValidator(data.answers, ctx, "answers", "questionPosition");
  },
);

const draftPublishBaseSchema = z.object({
  firstPartnerName: z
    .string()
    .min(1, "Имя невесты не указано")
    .max(50, "Имя невесты не должно превышать 50 символов"),
  secondPartnerName: z
    .string()
    .min(1, "Имя жениха не указано")
    .max(50, "Имя жениха не должно превышать 50 символов"),
  coupleImage: z.string().url("Couple image must be a valid URL").nullable().optional(),
  eventDate: futureDateSchema,
  templateName: z.string().min(1, "Шаблон не выбран"),
  place: placeSchema.extend({
    address: z.string().min(1, "Адрес проведения не указан"),
    link: z
      .string()
      .refine(
        (value) =>
          value.startsWith("https://yandex.ru/maps/") ||
          value.startsWith("https://www.google.com/maps/"),
        'Ссылка на место проведения должна начинаться с "https://yandex.ru/maps/" или "https://www.google.com/maps/"',
      ),
  }),
  colors: z.array(colorSchema).nullable().optional(),
  planItems: z.array(planItemSchema).min(1, "Программа не заполнена"),
  wishes: z.array(wishSchema).nullable().optional(),
  questions: z.array(questionSchema).nullable().optional(),
  answers: z.array(answerSchema).nullable().optional(),
});

export const draftPublishSchema = draftPublishBaseSchema.superRefine(
  (data: z.infer<typeof draftPublishBaseSchema>, ctx) => {
    createUniquePositionsValidator(data.planItems, ctx, "planItems");
    createUniquePositionsValidator(data.wishes, ctx, "wishes");
    createUniquePositionsValidator(data.questions, ctx, "questions");
    createUniquePositionsValidator(data.answers, ctx, "answers", "questionPosition");
    enforceQuestionAnswerConstraints(data.questions ?? null, data.answers ?? null, ctx);
  },
);

export const createDraftSchema = z.object({
  templateName: z.string().min(1, "Шаблон не выбран"),
});

export const draftSchemas = {
  update: draftUpdateSchema,
  publish: draftPublishSchema,
  create: createDraftSchema,
};
