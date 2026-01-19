import { z } from "zod";
export const QuestionTypeSchema = z.enum(["TEXT", "SELECT", "CHECKBOX"]);
export const QuestionType = {
    TEXT: "TEXT",
    SELECT: "SELECT",
    CHECKBOX: "CHECKBOX",
};
