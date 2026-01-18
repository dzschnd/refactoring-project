import { z } from "zod";

export const QuestionTypeSchema = z.enum(["TEXT", "SELECT", "CHECKBOX"]);
export type QuestionType = z.infer<typeof QuestionTypeSchema>;

export const QuestionType = {
  TEXT: "TEXT",
  SELECT: "SELECT",
  CHECKBOX: "CHECKBOX",
} as const;
