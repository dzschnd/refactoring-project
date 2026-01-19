import type { Request, Response, NextFunction } from "express";
import type { ZodError, ZodTypeAny } from "zod";
import { ValidationError } from "../errors/index.js";

const toDetails = (error: ZodError) => {
  return error.issues.map((issue) => ({
    field: issue.path.length ? issue.path.join(".") : "body",
    message: issue.message,
  }));
};

export const validateBody = (schema: ZodTypeAny) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const result = await schema.safeParseAsync(req.body);
    if (!result.success) {
      return next(new ValidationError(toDetails(result.error)));
    }
    const parsed = result.data as unknown;
    req.body = parsed as Record<string, unknown>;
    next();
  };
};
