import { z } from "zod";

export const guestAnswerSchema = z.object({
  questionPosition: z
    .number()
    .int()
    .nonnegative("Question position must be a positive integer"),
  answer: z.string().min(1, "Answer cannot be empty"),
});

export const submitGuestAnswersSchema = z.object({
  guestName: z
    .string()
    .min(1, "Guest name cannot be empty")
    .max(50, "Guest name must be below 50 characters"),
  answers: z.array(guestAnswerSchema),
  isComing: z.boolean(),
});

export const invitationSchemas = {
  submitGuestAnswers: submitGuestAnswersSchema,
};
