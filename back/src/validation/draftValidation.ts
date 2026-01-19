import type { Request, Response, NextFunction } from "express";
import type { z } from "zod";
import { draftPublishSchema, draftUpdateSchema } from "../shared/schemas/draft.js";
import { ValidationError } from "../errors/index.js";
import { getAllFormAnswersQuery, getAllFormQuestionsQuery } from "../queries/InvitationQueries.js";

const throwValidation = (message: string, field?: string): never => {
  const details = [{ field: field ?? "body", message }];
  throw new ValidationError(details);
};

const fieldLabels: Record<string, string> = {
  firstPartnerName: "Имя невесты",
  secondPartnerName: "Имя жениха",
  eventDate: "Дата свадьбы",
  templateName: "Шаблон",
  coupleImage: "Фото пары",
  colors: "Цветовая палитра",
  place: "Место проведения",
  "place.address": "Адрес проведения",
  "place.link": "Ссылка на место",
  "place.placeImage": "Фото места",
  planItems: "Программа",
  wishes: "Пожелания",
  questions: "Вопросы",
  answers: "Ответы",
};

const formatIssue = (issue: z.ZodIssue): { field: string; message: string } => {
  const path = issue.path.filter((segment) => typeof segment === "string").join(".");
  const field = path.length ? path : "body";
  const label = fieldLabels[field] ?? fieldLabels[path.split(".")[0]] ?? "Данные";
  if (issue.code === "invalid_type") {
    if (issue.received === "null" || issue.received === "undefined") {
      return { field, message: `${label}: значение не заполнено` };
    }
    return { field, message: `${label}: неверный тип значения` };
  }
  return { field, message: `${label}: ${issue.message}` };
};

export const validateDraftUpdate = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const result = await draftUpdateSchema.safeParseAsync(req.body);
  if (!result.success) {
    const details = result.error.issues.map(formatIssue);
    return next(new ValidationError(details));
  }

  try {
    const invitationId = Number(req.params.id);
    if (Number.isNaN(invitationId)) {
      throwValidation("Некорректный идентификатор черновика", "id");
    }

    const existingQuestions = await getAllFormQuestionsQuery(invitationId);
    const questionPositionById = new Map<number, number>();
    existingQuestions.forEach((question) => {
      questionPositionById.set(question.id, question.position);
    });

    const answerMap = new Map<number, string>();
    const existingAnswers = await getAllFormAnswersQuery(invitationId);
    existingAnswers.forEach((answer) => {
      const questionPosition = questionPositionById.get(answer.questionId);
      if (questionPosition !== undefined) {
        answerMap.set(questionPosition, answer.answer);
      }
    });

    if (result.data.answers) {
      result.data.answers.forEach((answer) => {
        answerMap.set(answer.questionPosition, answer.answer);
      });
    }

    if (result.data.questions) {
      result.data.questions.forEach((question) => {
        if (question.type === "TEXT" && answerMap.has(question.position)) {
          throwValidation(
            `Вопрос №${question.position} (TEXT) не должен иметь вариантов ответа.`,
            "answers",
          );
        }
      });
    }

    req.body = result.data;
    next();
  } catch (error) {
    next(error);
  }
};

export const validateDraftPublish = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const result = await draftPublishSchema.safeParseAsync(req.body);
  if (!result.success) {
    const details = result.error.issues.map(formatIssue);
    return next(new ValidationError(details));
  }
  req.body = result.data;
  next();
};
