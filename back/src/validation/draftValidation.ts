import type { Request, Response, NextFunction } from "express";
import { draftPublishSchema, draftUpdateSchema } from "../shared/schemas/draft.js";
import { ValidationError } from "../errors/index.js";
import { getAllFormAnswersQuery, getAllFormQuestionsQuery } from "../queries/InvitationQueries.js";

const throwValidation = (message: string, field?: string): never => {
  const details = [{ field: field ?? "body", message }];
  throw new ValidationError(details);
};

export const validateDraftUpdate = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const result = await draftUpdateSchema.safeParseAsync(req.body);
  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      field: issue.path.length ? issue.path.join(".") : "body",
      message: issue.message,
    }));
    return next(new ValidationError(details));
  }

  try {
    const invitationId = Number(req.params.id);
    if (Number.isNaN(invitationId)) {
      throwValidation("Invalid invitation id", "id");
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
            `Question at position ${question.position} is of type TEXT and must not have an associated answer.`,
            "answers"
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

export const validateDraftPublish = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const result = await draftPublishSchema.safeParseAsync(req.body);
  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      field: issue.path.length ? issue.path.join(".") : "body",
      message: issue.message,
    }));
    return next(new ValidationError(details));
  }
  req.body = result.data;
  next();
};
