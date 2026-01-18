import { z } from "zod";
import { QuestionType as QuestionTypeConst, QuestionTypeSchema } from "./schemas/common.js";
import {
  colorSchema,
  placeSchema,
  planItemSchema,
  wishSchema,
  questionSchema,
  answerSchema,
  draftUpdateSchema,
  draftPublishSchema,
  createDraftSchema,
} from "./schemas/draft.js";
import {
  registerSchema,
  requestOtpSchema,
  loginSchema,
  verifyEmailSchema,
  requestChangeEmailSchema,
  requestResetPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  changeEmailSchema,
  changeNameSchema,
} from "./schemas/auth.js";
import { guestAnswerSchema, submitGuestAnswersSchema } from "./schemas/invitation.js";
import {
  userResponseSchema,
  messageResponseSchema,
  requestPasswordResetResponseSchema,
  changeEmailResponseSchema,
  changeNameResponseSchema,
  invitationDetailsSchema,
  invitationDetailsListSchema,
  guestAnswerResponseSchema,
  guestAnswerListSchema,
} from "./schemas/responses.js";

export const QuestionType = QuestionTypeConst;
export { QuestionTypeSchema };
export type QuestionType = z.infer<typeof QuestionTypeSchema>;

export type ColorDTO = z.infer<typeof colorSchema>;
export type PlaceDTO = z.infer<typeof placeSchema>;
export type PlanItemDTO = z.infer<typeof planItemSchema>;
export type WishDTO = z.infer<typeof wishSchema>;
export type QuestionDTO = z.infer<typeof questionSchema>;
export type AnswerDTO = z.infer<typeof answerSchema>;
export type GuestAnswerDTO = z.infer<typeof guestAnswerSchema>;

export type CreateDraftRequest = z.infer<typeof createDraftSchema>;
export type DraftUpdateRequest = z.infer<typeof draftUpdateSchema>;
export type DraftPublishRequest = z.infer<typeof draftPublishSchema>;
export type SubmitGuestAnswersRequest = z.infer<typeof submitGuestAnswersSchema>;

export type RegisterRequest = z.infer<typeof registerSchema>;
export type RequestOtpRequest = z.infer<typeof requestOtpSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;
export type VerifyEmailRequest = z.infer<typeof verifyEmailSchema>;
export type RequestChangeEmailRequest = z.infer<typeof requestChangeEmailSchema>;
export type RequestResetPasswordRequest = z.infer<typeof requestResetPasswordSchema>;
export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordRequest = z.infer<typeof changePasswordSchema>;
export type ChangeEmailRequest = z.infer<typeof changeEmailSchema>;
export type ChangeNameRequest = z.infer<typeof changeNameSchema>;
export type UploadImageType = "coupleImage" | "placeImage";

export type MessageResponse = z.infer<typeof messageResponseSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type RequestPasswordResetResponse = z.infer<typeof requestPasswordResetResponseSchema>;
export type ChangeEmailResponse = z.infer<typeof changeEmailResponseSchema>;
export type ChangeNameResponse = z.infer<typeof changeNameResponseSchema>;
export type InvitationDetailsResponse = z.infer<typeof invitationDetailsSchema>;
export type InvitationDetailsListResponse = z.infer<typeof invitationDetailsListSchema>;
export type GuestAnswerResponse = z.infer<typeof guestAnswerResponseSchema>;
export type GuestAnswerListResponse = z.infer<typeof guestAnswerListSchema>;

export interface InvitationDetailsDTO {
  id: number;
  firstPartnerName: string | null;
  secondPartnerName: string | null;
  coupleImage: string | null;
  authorId: number;
  templateName: string;
  eventDate: string | null;
  isPublished: boolean;
  colors: ColorDTO[] | null;
  place: PlaceDTO | null;
  planItems: PlanItemDTO[] | null;
  wishes: WishDTO[] | null;
  questions: Array<{
    id: number;
    question: string;
    position: number;
    type: QuestionType;
  }> | null;
  answers: AnswerDTO[] | null;
}
