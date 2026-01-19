import { z } from "zod";
import { QuestionTypeSchema } from "./common.js";

export const messageResponseSchema = z.object({
  message: z.string(),
});

export const userResponseSchema = z.object({
  id: z.number().int(),
  email: z.string().email(),
  name: z.string().nullable(),
  verified: z.boolean(),
});

export const requestPasswordResetResponseSchema = z.object({
  message: z.string(),
  user: userResponseSchema,
});

export const changeEmailResponseSchema = z.object({
  message: z.string(),
  newEmail: z.string().email().nullable().optional(),
});

export const changeNameResponseSchema = z.object({
  message: z.string(),
  newName: z.string().nullable().optional(),
});

export const invitationDetailsSchema = z.object({
  id: z.number().int(),
  firstPartnerName: z.string().nullable(),
  secondPartnerName: z.string().nullable(),
  coupleImage: z.string().nullable(),
  authorId: z.number().int(),
  templateName: z.string(),
  eventDate: z.string().nullable(),
  isPublished: z.boolean(),
  colors: z
    .array(
      z.object({
        colorCode: z.string(),
        position: z.number().int(),
      }),
    )
    .nullable(),
  place: z
    .object({
      address: z.string().nullable(),
      placeImage: z.string().nullable(),
      link: z.string().nullable(),
    })
    .nullable(),
  planItems: z
    .array(
      z.object({
        eventTime: z.string(),
        description: z.string(),
        position: z.number().int(),
      }),
    )
    .nullable(),
  wishes: z
    .array(
      z.object({
        wish: z.string(),
        position: z.number().int(),
      }),
    )
    .nullable(),
  questions: z
    .array(
      z.object({
        id: z.number().int(),
        question: z.string(),
        position: z.number().int(),
        type: QuestionTypeSchema,
      }),
    )
    .nullable(),
  answers: z
    .array(
      z.object({
        answer: z.string(),
        questionPosition: z.number().int(),
        position: z.number().int(),
      }),
    )
    .nullable(),
});

export const invitationDetailsListSchema = z.array(invitationDetailsSchema);

export const guestAnswerResponseSchema = z.object({
  id: z.number().int(),
  guestId: z.string(),
  guestName: z.string(),
  isComing: z.boolean(),
  answer: z.string(),
  invitationId: z.number().int(),
  questionId: z.number().int(),
});

export const guestAnswerListSchema = z.array(guestAnswerResponseSchema);

export const responseSchemas = {
  message: messageResponseSchema,
  user: userResponseSchema,
  requestPasswordReset: requestPasswordResetResponseSchema,
  changeEmail: changeEmailResponseSchema,
  changeName: changeNameResponseSchema,
  invitationDetails: invitationDetailsSchema,
  invitationDetailsList: invitationDetailsListSchema,
  guestAnswerList: guestAnswerListSchema,
};
